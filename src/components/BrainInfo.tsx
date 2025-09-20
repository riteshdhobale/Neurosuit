import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Brain, Zap } from 'lucide-react';
import { BRAIN_REGIONS, type Neurotransmitter } from '../types/neurochemical';

interface BrainInfoProps {
  regionId: string;
  activeChemicals: Neurotransmitter[];
  onClose: () => void;
}

export const BrainInfo = ({ regionId, activeChemicals, onClose }: BrainInfoProps) => {
  const region = BRAIN_REGIONS.find(r => r.id === regionId);
  
  if (!region) return null;

  // Find chemicals affecting this region
  const affectingChemicals = activeChemicals.filter(chemical =>
    chemical.targetRegions.includes(region.id)
  );

  const totalActivity = affectingChemicals.reduce((sum, chemical) => 
    sum + chemical.concentration, 0
  );

  const activityLevel = totalActivity === 0 ? 'Inactive' : 
    totalActivity < 50 ? 'Low' :
    totalActivity < 150 ? 'Moderate' :
    totalActivity < 250 ? 'High' : 'Very High';

  const activityColor = totalActivity === 0 ? 'text-muted-foreground' : 
    totalActivity < 50 ? 'text-yellow-500' :
    totalActivity < 150 ? 'text-blue-500' :
    totalActivity < 250 ? 'text-orange-500' : 'text-red-500';

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border shadow-lg animate-brain-activate">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{region.name}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Region Description */}
        <div>
          <h4 className="text-sm font-medium mb-1">Function</h4>
          <p className="text-sm text-muted-foreground">{region.description}</p>
        </div>

        <Separator />

        {/* Activity Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Activity Level</span>
          </div>
          <Badge variant="outline" className={activityColor}>
            {activityLevel}
          </Badge>
        </div>

        {/* Active Chemicals */}
        {affectingChemicals.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Active Neurotransmitters</h4>
            <div className="space-y-2">
              {affectingChemicals.map((chemical) => (
                <div 
                  key={chemical.id}
                  className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: chemical.color }}
                    />
                    <span className="text-sm font-medium">{chemical.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {chemical.concentration}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No active neurotransmitters affecting this region
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Select chemicals from the control panel to see their effects
            </p>
          </div>
        )}

        {/* Combined Effects */}
        {affectingChemicals.length > 1 && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Combined Effects</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                {affectingChemicals.some(c => c.id === 'dopamine') && 
                 affectingChemicals.some(c => c.id === 'serotonin') && (
                  <p>• Enhanced mood and motivation</p>
                )}
                {affectingChemicals.some(c => c.id === 'gaba') && 
                 affectingChemicals.some(c => c.id === 'glutamate') && (
                  <p>• Balanced excitatory/inhibitory activity</p>
                )}
                {affectingChemicals.some(c => c.id === 'acetylcholine') && 
                 affectingChemicals.some(c => c.id === 'dopamine') && (
                  <p>• Improved learning and reward processing</p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};