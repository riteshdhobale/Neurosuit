import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Activity, ACTIVITY_PRESETS } from '@/types/dopamine';
import { DopamineChart } from './DopamineChart';
import { useToast } from '@/hooks/use-toast';

export const DopamineTracker = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customTime, setCustomTime] = useState<string>('09:00');
  const { toast } = useToast();

  const addActivity = () => {
    if (!selectedPreset) return;

    const preset = ACTIVITY_PRESETS[selectedPreset];
    if (!preset) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      time: customTime,
      ...preset
    };

    setActivities(prev => [...prev, newActivity].sort((a, b) => a.time.localeCompare(b.time)));
    
    toast({
      title: `${preset.name} Added`,
      description: `${preset.type === 'good' ? '📈' : '📉'} ${preset.type === 'good' ? 'Dopamine boost planned!' : 'Dopamine cost calculated'}`,
    });

    setSelectedPreset('');
  };

  const removeActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const getTotalDopamineImpact = () => {
    return activities.reduce((total, activity) => {
      return total + activity.dopamineImpact.baseline;
    }, 0);
  };

  const getDopamineScore = () => {
    const impact = getTotalDopamineImpact();
    if (impact > 200) return { label: 'Excellent', color: 'text-green-400', icon: '🚀' };
    if (impact > 0) return { label: 'Good', color: 'text-green-300', icon: '📈' };
    if (impact > -200) return { label: 'Poor', color: 'text-yellow-400', icon: '⚠️' };
    return { label: 'Terrible', color: 'text-red-400', icon: '💀' };
  };

  const score = getDopamineScore();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              size="sm"
              className="border-primary/20"
            >
              ← Back
            </Button>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dopamine Currency Tracker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Plan your day and see your dopamine "currency" flow in real-time. Based on neuroscience research 
            about reward prediction error and baseline dopamine levels.
          </p>
        </div>

        {/* Daily Score */}
        <Card className="border-primary/20 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-6xl">{score.icon}</div>
              <div className={`text-2xl font-bold ${score.color}`}>
                {score.label} Day Planned
              </div>
              <div className="text-sm text-muted-foreground">
                Net Dopamine Impact: <span className={getTotalDopamineImpact() >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {getTotalDopamineImpact() >= 0 ? '+' : ''}{getTotalDopamineImpact()} currency
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Activity Planner */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Plan Your Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-32"
                />
                <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Choose an activity..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ACTIVITY_PRESETS).map(([key, preset]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {preset.type === 'good' ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                          {preset.name} ({preset.duration}min)
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addActivity} disabled={!selectedPreset}>
                  Add
                </Button>
              </div>

              {/* Planned Activities */}
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {activities.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No activities planned yet. Add some to see your dopamine flow!
                  </p>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">
                          {activity.time}
                        </span>
                        <span className="font-medium">{activity.name}</span>
                        <Badge variant={activity.type === 'good' ? 'default' : 'destructive'}>
                          {activity.type === 'good' ? '+' : ''}{activity.dopamineImpact.baseline}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeActivity(activity.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dopamine Chart */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Your Dopamine Currency Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <DopamineChart activities={activities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};