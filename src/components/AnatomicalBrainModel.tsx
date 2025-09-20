import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import { Mesh } from 'three';
import { BRAIN_REGIONS, type Neurotransmitter } from '../types/neurochemical';
import { AnatomicalBrain } from './AnatomicalBrain';
import { BrainOBJMesh } from './BrainOBJMesh';
import { NeurotransmitterFlow } from './NeurotransmitterFlow';

interface AnatomicalBrainModelProps {
  activeChemicals: Neurotransmitter[];
  onRegionClick: (regionId: string) => void;
  selectedRegion: string | null;
}

// Enhanced brain region with anatomical accuracy
const AnatomicalBrainRegion = ({
  region,
  activeChemicals,
  isSelected,
  onClick
}: {
  region: typeof BRAIN_REGIONS[0];
  activeChemicals: Neurotransmitter[];
  isSelected: boolean;
  onClick: () => void;
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Check which chemicals affect this region
  const affectingChemicals = activeChemicals.filter(chemical =>
    chemical.targetRegions.includes(region.id)
  );

  // Calculate combined effect intensity
  const totalIntensity = affectingChemicals.reduce((sum, chemical) =>
    sum + chemical.concentration, 0
  );

  // Get dominant chemical color
  const dominantChemical = affectingChemicals.reduce((prev, current) =>
    current.concentration > (prev?.concentration || 0) ? current : prev,
    null as Neurotransmitter | null
  );

  const intensity = Math.min(totalIntensity / 100, 1);

  useFrame((state) => {
    if (meshRef.current && affectingChemicals.length > 0) {
      // Neural activity pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.12 * intensity;
      meshRef.current.scale.setScalar(scale);

      // Subtle position oscillation for active regions
      const offset = Math.sin(state.clock.elapsedTime * 4) * 0.02 * intensity;
      meshRef.current.position.y = region.position[1] + offset;
    }
  });

  return (
    <group position={region.position}>
      {/* Main region sphere */}
      <Sphere
        ref={meshRef}
        args={[region.size * 0.5, 20, 20]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhongMaterial
          color={dominantChemical?.color || region.color}
          opacity={0.7 + intensity * 0.3}
          transparent
          emissive={dominantChemical?.color || '#000000'}
          emissiveIntensity={intensity * 0.6}
        />
      </Sphere>

      {/* Neural activity visualization layers */}
      {affectingChemicals.length > 0 && (
        <>
          {/* Inner activation core */}
          <Sphere args={[region.size * 0.3, 12, 12]}>
            <meshBasicMaterial
              color={dominantChemical?.color || region.color}
              opacity={intensity * 0.8}
              transparent
            />
          </Sphere>

          {/* Mid-level energy field */}
          <Sphere args={[region.size * 0.7, 16, 16]}>
            <meshBasicMaterial
              color={dominantChemical?.color || region.color}
              opacity={intensity * 0.3}
              transparent
            />
          </Sphere>

          {/* Outer activation aura */}
          <Sphere args={[region.size * 1.1, 12, 12]}>
            <meshBasicMaterial
              color={dominantChemical?.color || region.color}
              opacity={intensity * 0.1}
              transparent
            />
          </Sphere>
        </>
      )}

      {/* Enhanced region information panel */}
      {(hovered || isSelected) && (
        <Html distanceFactor={6} position={[0, region.size + 0.8, 0]}>
          <div className="bg-card/95 backdrop-blur-md rounded-xl px-4 py-3 border border-border shadow-2xl max-w-xs">
            <div className="text-base font-bold text-foreground mb-1">
              {region.name}
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {region.description}
            </div>
            {affectingChemicals.length > 0 && (
              <>
                <div className="text-sm font-medium text-primary mb-1">
                  Active Chemicals:
                </div>
                <div className="space-y-1">
                  {affectingChemicals.map(chemical => (
                    <div key={chemical.id} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: chemical.color }}
                      />
                      <span className="text-xs text-foreground">
                        {chemical.name} ({chemical.concentration}%)
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-primary/70 mt-2 font-medium">
                  Neural Activity: {Math.round(intensity * 100)}%
                </div>
              </>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

export const AnatomicalBrainModel = ({
  activeChemicals,
  onRegionClick,
  selectedRegion
}: AnatomicalBrainModelProps) => {
  return (
    <group>
      {/* Anatomically accurate OBJ brain mesh */}
      <BrainOBJMesh />

      {/* Wireframe overlay for structure definition */}
      <AnatomicalBrain opacity={0.03} color="#4a4a5e" />

      {/* Brain regions with enhanced visualization */}
      {BRAIN_REGIONS.map((region) => (
        <AnatomicalBrainRegion
          key={region.id}
          region={region}
          activeChemicals={activeChemicals}
          isSelected={selectedRegion === region.id}
          onClick={() => onRegionClick(region.id)}
        />
      ))}
    </group>
  );
};