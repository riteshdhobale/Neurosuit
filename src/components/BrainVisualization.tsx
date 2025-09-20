import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { AnatomicalBrainModel } from './AnatomicalBrainModel';
import { NeuralNetwork } from './NeuralNetwork';
import { ChemicalControls } from './ChemicalControls';
import { BrainInfo } from './BrainInfo';
import { NEUROTRANSMITTERS, type Neurotransmitter } from '../types/neurochemical';
import { useToast } from '@/hooks/use-toast';

export const BrainVisualization = () => {
  const [activeChemicals, setActiveChemicals] = useState<Neurotransmitter[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChemicalToggle = (chemicalId: string, concentration: number) => {
    const chemical = NEUROTRANSMITTERS.find(c => c.id === chemicalId);
    if (!chemical) return;

    setActiveChemicals(prev => {
      const exists = prev.find(c => c.id === chemicalId);
      if (exists) {
        if (concentration === 0) {
          toast({
            title: `${chemical.name} Deactivated`,
            description: `Stopped ${chemical.primaryFunction.toLowerCase()}`,
          });
          return prev.filter(c => c.id !== chemicalId);
        } else {
          return prev.map(c => 
            c.id === chemicalId 
              ? { ...c, concentration, active: true }
              : c
          );
        }
      } else if (concentration > 0) {
        toast({
          title: `${chemical.name} Activated`,
          description: chemical.primaryFunction,
        });
        return [...prev, { ...chemical, concentration, active: true }];
      }
      return prev;
    });
  };

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId === selectedRegion ? null : regionId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Neurochemical Brain Simulation
          </h1>
          <p className="text-muted-foreground mt-2">
            Interactive 3D visualization of neurotransmitter effects on brain regions
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)]">
        {/* Chemical Controls Sidebar */}
        <div className="w-full lg:w-80 border-r border-border bg-card/30 backdrop-blur-sm">
          <ChemicalControls
            chemicals={NEUROTRANSMITTERS}
            activeChemicals={activeChemicals}
            onChemicalToggle={handleChemicalToggle}
          />
        </div>

        {/* 3D Brain Visualization */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            className="bg-gradient-to-br from-background via-background to-primary/5"
          >
            <Suspense fallback={
              <Html center>
                <div className="text-primary animate-pulse">Loading Brain Model...</div>
              </Html>
            }>
              <Environment preset="night" />
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.4} color="#3B82F6" />
              
              <AnatomicalBrainModel 
                activeChemicals={activeChemicals}
                onRegionClick={handleRegionClick}
                selectedRegion={selectedRegion}
              />
              <NeuralNetwork 
                activeChemicals={activeChemicals}
              />
              
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={false}
                maxDistance={15}
                minDistance={3}
              />
            </Suspense>
          </Canvas>

          {/* Brain Information Panel */}
          {selectedRegion && (
            <div className="absolute top-4 right-4 w-80">
              <BrainInfo 
                regionId={selectedRegion}
                activeChemicals={activeChemicals}
                onClose={() => setSelectedRegion(null)}
              />
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-4 max-w-sm">
            <h3 className="font-semibold text-primary mb-2">How to Use</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Select chemicals from the left panel</li>
              <li>• Adjust concentration with sliders</li>
              <li>• Click brain regions for details</li>
              <li>• Drag to rotate, scroll to zoom</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};