import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from 'recharts';
import { Activity, DopaminePoint } from '@/types/dopamine';

interface DopamineChartProps {
  activities: Activity[];
}

export const DopamineChart = ({ activities }: DopamineChartProps) => {
  const generateDopamineFlow = (): DopaminePoint[] => {
    const points: DopaminePoint[] = [];
    const baselineStart = 1000;
    let currentBaseline = baselineStart;
    
    // Generate points every 15 minutes from 6 AM to 11 PM for more granular data
    const startHour = 6;
    const endHour = 23;
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if there's an activity at this time
        const activity = activities.find(a => a.time === timeStr);
        
        if (activity) {
          // Add pre-activity baseline point
          points.push({
            time: timeStr,
            level: currentBaseline,
            type: 'baseline'
          });
          
          // Add spike point (immediate)
          const spikeTime = `${hour.toString().padStart(2, '0')}:${(minute + 1).toString().padStart(2, '0')}`;
          points.push({
            time: spikeTime,
            level: currentBaseline + activity.dopamineImpact.spike,
            activity: activity.name,
            type: 'spike'
          });
          
          // Calculate gradual decline during activity
          const activityEndMinutes = minute + activity.duration;
          const activityEndHour = hour + Math.floor(activityEndMinutes / 60);
          const activityEndMinute = activityEndMinutes % 60;
          
          if (activityEndHour <= endHour) {
            // Add multiple points during activity decline
            const declineSteps = Math.min(4, Math.floor(activity.duration / 15));
            for (let step = 1; step <= declineSteps; step++) {
              const stepMinutes = minute + (activity.duration * step / declineSteps);
              const stepHour = hour + Math.floor(stepMinutes / 60);
              const stepMinute = Math.floor(stepMinutes % 60);
              
              if (stepHour <= endHour && stepMinute < 60) {
                const stepTimeStr = `${stepHour.toString().padStart(2, '0')}:${stepMinute.toString().padStart(2, '0')}`;
                const declineLevel = currentBaseline + activity.dopamineImpact.spike * (1 - step / declineSteps);
                
                points.push({
                  time: stepTimeStr,
                  level: declineLevel,
                  activity: `${activity.name} (declining)`,
                  type: 'decline'
                });
              }
            }
            
            // Calculate crash point (immediate after activity)
            const crashTimeStr = `${activityEndHour.toString().padStart(2, '0')}:${activityEndMinute.toString().padStart(2, '0')}`;
            
            // Update baseline with the impact
            currentBaseline = Math.max(100, currentBaseline + activity.dopamineImpact.baseline);
            
            points.push({
              time: crashTimeStr,
              level: currentBaseline,
              activity: `${activity.name} (new baseline)`,
              type: 'crash'
            });
          }
        } else {
          // Normal baseline point with slight natural recovery
          if (currentBaseline < 1000) {
            currentBaseline = Math.min(1000, currentBaseline + 2); // Slow natural recovery
          }
          
          points.push({
            time: timeStr,
            level: currentBaseline,
            type: 'baseline'
          });
        }
      }
    }
    
    return points.sort((a, b) => a.time.localeCompare(b.time));
  };

  const dopamineFlow = generateDopamineFlow();

  const formatTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{formatTime(label)}</p>
          <p className="text-primary">
            Dopamine: <span className="font-bold">{Math.round(data.level)}</span> currency
          </p>
          {data.activity && (
            <p className="text-muted-foreground text-sm mt-1">
              {data.activity}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getDopamineColor = (level: number) => {
    if (level >= 1200) return '#10b981'; // green-500
    if (level >= 1000) return '#3b82f6'; // blue-500  
    if (level >= 500) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="w-full h-80">
      {activities.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>Add activities to see your dopamine flow</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dopamineFlow}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatTime}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Baseline reference line */}
            <ReferenceLine y={1000} stroke="#6b7280" strokeDasharray="5 5" />
            
            {/* Danger zone */}
            <Area
              dataKey="level"
              fill="url(#dangerGradient)"
              fillOpacity={0.1}
              stroke="none"
            />
            
            <Line
              type="monotone"
              dataKey="level"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.type === 'spike') {
                  return <circle cx={cx} cy={cy} r={6} fill="#10b981" stroke="#fff" strokeWidth={2} />;
                }
                if (payload.type === 'crash') {
                  return <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
                }
                return <circle cx={cx} cy={cy} r={3} fill="hsl(var(--primary))" />;
              }}
              connectNulls
            />
            
            <defs>
              <linearGradient id="dangerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0} />
                <stop offset="50%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};