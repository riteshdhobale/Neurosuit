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

    // Pre-process to add anticipatory dopamine response - a scientifically accurate feature
    // where dopamine is released in anticipation of a reward
    const anticipatoryActivities = [...activities];
    activities.forEach(activity => {
      // Only add anticipatory response for activities with positive impact or high habitFormingIndex
      if ((activity.type === 'good' || (activity.habitFormingIndex && activity.habitFormingIndex > 7))) {
        const [activityHour, activityMinute] = activity.time.split(':').map(Number);

        // Create anticipation 15-30 minutes before the activity
        const anticipationMinutes = Math.max(15, Math.min(30, activity.duration / 2));
        let anticipationMinute = activityMinute - anticipationMinutes;
        let anticipationHour = activityHour;

        if (anticipationMinute < 0) {
          anticipationMinute += 60;
          anticipationHour -= 1;
        }

        // Only add if the anticipation time is within our chart range
        if (anticipationHour >= startHour) {
          const anticipationTime = `${anticipationHour.toString().padStart(2, '0')}:${Math.floor(anticipationMinute).toString().padStart(2, '0')}`;

          // Calculate anticipatory effect (typically 20-30% of the main spike)
          const anticipatoryEffect = activity.type === 'good' ?
            Math.max(20, activity.dopamineImpact.spike * 0.2) :
            Math.max(30, activity.dopamineImpact.spike * 0.3);

          // Add anticipation as a pseudo-activity
          anticipatoryActivities.push({
            id: `anticipation-${activity.id}`,
            name: `Anticipating ${activity.name}`,
            time: anticipationTime,
            duration: Math.floor(anticipationMinutes),
            type: activity.type,
            dopamineImpact: {
              spike: anticipatoryEffect,
              baseline: 0, // Anticipation doesn't change baseline
              duration: Math.floor(anticipationMinutes),
              peakLatency: 5, // Quick anticipatory response
              recoveryRate: 8 // Quick return to baseline
            },
            brainRegions: activity.brainRegions,
          });
        }
      }
    });

    // Sort all activities including anticipatory ones
    anticipatoryActivities.sort((a, b) => a.time.localeCompare(b.time));

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        // Check if there's an activity at this time
        const activity = anticipatoryActivities.find(a => a.time === timeStr);

        if (activity) {
          // Add pre-activity baseline point
          points.push({
            time: timeStr,
            level: currentBaseline,
            type: 'baseline'
          });

          // Determine if this is an anticipatory response
          const isAnticipation = activity.id.startsWith('anticipation-');

          // Calculate when peak occurs based on peakLatency (scientific accuracy improvement)
          const peakLatency = activity.dopamineImpact.peakLatency ||
            (activity.type === 'good' ? 15 : 5); // Default values if not specified

          const peakMinutes = minute + peakLatency;
          const peakHour = hour + Math.floor(peakMinutes / 60);
          const peakMinute = peakMinutes % 60;
          const peakTime = `${peakHour.toString().padStart(2, '0')}:${peakMinute.toString().padStart(2, '0')}`;

          // Add initial response point (slightly elevated)
          const initialTime = `${hour.toString().padStart(2, '0')}:${(minute + 2).toString().padStart(2, '0')}`;
          const initialElevation = activity.dopamineImpact.spike * 0.3; // 30% of peak at start
          points.push({
            time: initialTime,
            level: currentBaseline + initialElevation,
            activity: activity.name,
            type: isAnticipation ? 'anticipation' : 'spike',
            brainRegions: activity.brainRegions
          });

          // Add peak point
          if (peakHour <= endHour) {
            points.push({
              time: peakTime,
              level: currentBaseline + activity.dopamineImpact.spike,
              activity: activity.name,
              type: isAnticipation ? 'anticipation' : 'spike',
              brainRegions: activity.brainRegions,
              // Add receptor saturation information
              receptorSaturation: Math.min(100, 50 + (activity.dopamineImpact.spike / 10))
            });
          }

          // Calculate gradual decline during activity
          const activityEndMinutes = minute + activity.duration;
          const activityEndHour = hour + Math.floor(activityEndMinutes / 60);
          const activityEndMinute = activityEndMinutes % 60;

          if (activityEndHour <= endHour) {
            // Add multiple points during activity decline based on recoveryRate (scientific accuracy)
            const recoveryRate = activity.dopamineImpact.recoveryRate || 5; // Default if not specified
            const declineSteps = Math.max(2, Math.min(6, Math.floor(activity.duration / Math.max(1, (10 - recoveryRate)))));

            for (let step = 1; step <= declineSteps; step++) {
              const stepMinutes = minute + peakLatency + ((activity.duration - peakLatency) * step / declineSteps);
              const stepHour = hour + Math.floor(stepMinutes / 60);
              const stepMinute = Math.floor(stepMinutes % 60);

              if (stepHour <= endHour && stepMinute < 60) {
                const stepTimeStr = `${stepHour.toString().padStart(2, '0')}:${stepMinute.toString().padStart(2, '0')}`;

                // More realistic decline curve based on pharmacokinetics
                const declineFactor = Math.pow(step / declineSteps, 1 + (recoveryRate / 10));
                const declineLevel = currentBaseline + activity.dopamineImpact.spike * (1 - declineFactor);

                points.push({
                  time: stepTimeStr,
                  level: declineLevel,
                  activity: `${activity.name} (declining)`,
                  type: 'decline',
                  brainRegions: activity.brainRegions,
                  receptorSaturation: Math.min(100, 50 + (activity.dopamineImpact.spike / 10) * (1 - declineFactor))
                });
              }
            }

            // Calculate crash point (immediate after activity)
            const crashTimeStr = `${activityEndHour.toString().padStart(2, '0')}:${activityEndMinute.toString().padStart(2, '0')}`;

            // Update baseline with the impact, but only if this isn't an anticipatory response
            if (!isAnticipation) {
              currentBaseline = Math.max(100, currentBaseline + activity.dopamineImpact.baseline);
            }

            // For highly tolerant activities, reduce the baseline impact progressively
            if (activity.tolerance && activity.type === 'bad') {
              // Find how many times this activity has occurred today
              const activityCount = activities.filter(a => a.name === activity.name).length;
              if (activityCount > 1) {
                // Reduce baseline impact by 10% for each previous occurrence due to tolerance
                const toleranceFactor = Math.max(0.5, 1 - (activityCount * 0.1));
                currentBaseline = Math.max(100, currentBaseline * toleranceFactor);
              }
            }

            points.push({
              time: crashTimeStr,
              level: currentBaseline,
              activity: `${activity.name} (new baseline)`,
              type: 'crash',
              brainRegions: activity.brainRegions
            });
          }
        } else {
          // Normal baseline point with slight natural recovery - homeostatic process
          if (currentBaseline < baselineStart) {
            // Recovery rate varies based on how far below baseline we are
            const deficit = baselineStart - currentBaseline;
            const recoveryFactor = deficit / 200; // Greater recovery when further from baseline
            currentBaseline = Math.min(baselineStart, currentBaseline + (2 * recoveryFactor)); // Homeostatic recovery
          } else if (currentBaseline > baselineStart) {
            // If above baseline, slowly return to normal
            const excess = currentBaseline - baselineStart;
            const decayFactor = excess / 500; // Slower decay when closer to baseline
            currentBaseline = Math.max(baselineStart, currentBaseline - (1 * decayFactor));
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
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-sm">
          <p className="font-semibold">{formatTime(label)}</p>
          <p className="text-primary">
            Dopamine: <span className="font-bold">{Math.round(data.level)}</span> currency
          </p>

          {data.activity && (
            <p className="text-muted-foreground text-sm mt-1">
              {data.activity}
            </p>
          )}

          {data.type && (
            <p className="text-xs text-muted-foreground mt-1">
              State: <span className={`font-medium ${getStateColor(data.type)}`}>
                {formatState(data.type)}
              </span>
            </p>
          )}

          {data.brainRegions && data.brainRegions.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium">Active Brain Regions:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.brainRegions.map((region: string) => (
                  <span key={region} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {formatBrainRegion(region)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.receptorSaturation && (
            <div className="mt-2">
              <p className="text-xs">
                Receptor Saturation: <span className={getReceptorColor(data.receptorSaturation)}>
                  {Math.round(data.receptorSaturation)}%
                </span>
              </p>
              <div className="w-full h-1.5 bg-muted mt-1 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getReceptorColor(data.receptorSaturation)}`}
                  style={{ width: `${data.receptorSaturation}%` }}
                ></div>
              </div>
            </div>
          )}

          {data.type === 'anticipation' && (
            <p className="text-xs text-amber-500 mt-1 italic">
              Anticipatory dopamine response activated
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const formatState = (type: string): string => {
    switch (type) {
      case 'spike': return 'Peak Release';
      case 'crash': return 'Post-activity Regulation';
      case 'baseline': return 'Homeostatic Level';
      case 'decline': return 'Receptor Downregulation';
      case 'anticipation': return 'Anticipatory Response';
      default: return type;
    }
  };

  const getStateColor = (type: string): string => {
    switch (type) {
      case 'spike': return 'text-green-500';
      case 'crash': return 'text-red-500';
      case 'baseline': return 'text-blue-500';
      case 'decline': return 'text-amber-500';
      case 'anticipation': return 'text-purple-500';
      default: return '';
    }
  };

  const formatBrainRegion = (region: string): string => {
    return region.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getReceptorColor = (saturation: number): string => {
    if (saturation >= 80) return 'bg-red-500 text-red-500';
    if (saturation >= 50) return 'bg-amber-500 text-amber-500';
    return 'bg-green-500 text-green-500';
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