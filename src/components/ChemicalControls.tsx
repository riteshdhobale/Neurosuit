import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info, Zap, ZapOff } from 'lucide-react';
import { type Neurotransmitter } from '../types/neurochemical';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChemicalControlsProps {
  chemicals: Neurotransmitter[];
  activeChemicals: Neurotransmitter[];
  onChemicalToggle: (chemicalId: string, concentration: number) => void;
}

export const ChemicalControls = ({ 
  chemicals, 
  activeChemicals, 
  onChemicalToggle 
}: ChemicalControlsProps) => {
  const [concentrations, setConcentrations] = useState<Record<string, number>>({});

  const isActive = (chemicalId: string) => 
    activeChemicals.some(c => c.id === chemicalId);

  const getConcentration = (chemicalId: string) =>
    activeChemicals.find(c => c.id === chemicalId)?.concentration || 0;

  const handleConcentrationChange = (chemicalId: string, value: number[]) => {
    const concentration = value[0];
    setConcentrations(prev => ({ ...prev, [chemicalId]: concentration }));
    onChemicalToggle(chemicalId, concentration);
  };

  const toggleChemical = (chemicalId: string) => {
    const currentConcentration = getConcentration(chemicalId);
    const newConcentration = currentConcentration > 0 ? 0 : 50;
    onChemicalToggle(chemicalId, newConcentration);
  };

  const resetAll = () => {
    chemicals.forEach(chemical => {
      onChemicalToggle(chemical.id, 0);
    });
    setConcentrations({});
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-foreground">Neurotransmitters</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Reset All
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Select and adjust chemical concentrations to observe brain activity
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {chemicals.map((chemical) => {
            const active = isActive(chemical.id);
            const concentration = getConcentration(chemical.id);

            return (
              <Card 
                key={chemical.id} 
                className={`transition-all duration-300 ${
                  active ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: chemical.color }}
                      />
                      {chemical.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <p className="font-medium">{chemical.primaryFunction}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {chemical.description}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <Button
                        variant={active ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleChemical(chemical.id)}
                        className="min-w-0 p-2"
                      >
                        {active ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {chemical.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Concentration Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Concentration</label>
                      <Badge variant={active ? "default" : "secondary"}>
                        {concentration}%
                      </Badge>
                    </div>
                    <Slider
                      value={[concentration]}
                      onValueChange={(value) => handleConcentrationChange(chemical.id, value)}
                      max={100}
                      step={5}
                      className="w-full"
                      disabled={!active}
                    />
                  </div>

                  <Separator />

                  {/* Target Regions */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Target Regions</h4>
                    <div className="flex flex-wrap gap-1">
                      {chemical.targetRegions.map((region) => (
                        <Badge 
                          key={region} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {region.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Active Chemicals Summary */}
      {activeChemicals.length > 0 && (
        <div className="p-4 border-t border-border bg-card/50">
          <h3 className="text-sm font-medium mb-2">Active Chemicals</h3>
          <div className="flex flex-wrap gap-2">
            {activeChemicals.map((chemical) => (
              <Badge 
                key={chemical.id}
                variant="default"
                className="text-xs"
                style={{ 
                  backgroundColor: chemical.color,
                  color: '#000'
                }}
              >
                {chemical.name} ({chemical.concentration}%)
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};