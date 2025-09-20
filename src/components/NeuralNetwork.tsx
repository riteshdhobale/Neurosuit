import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { BRAIN_REGIONS, type Neurotransmitter } from '../types/neurochemical';
import { NeurotransmitterFlow } from './NeurotransmitterFlow';

interface NeuralNetworkProps {
  activeChemicals: Neurotransmitter[];
}

interface NeuralPathwayProps {
  from: Vector3;
  to: Vector3;
  chemical: Neurotransmitter;
  intensity: number;
}

const NeuralPathway = ({ from, to, chemical, intensity }: NeuralPathwayProps) => {
  const groupRef = useRef<Group>(null);
  const sphereRef = useRef<Group>(null);

  // Create points for the neural pathway curve
  const points = useMemo(() => {
    const curve = new Vector3().copy(from).add(to).multiplyScalar(0.5);
    curve.y += 0.5; // Arc the pathway upward
    return [from, curve, to];
  }, [from, to]);

  useFrame((state) => {
    if (sphereRef.current) {
      // Animate signal traveling along pathway
      const t = (Math.sin(state.clock.elapsedTime * 3) + 1) * 0.5;
      const position = new Vector3().lerpVectors(from, to, t);
      position.y += Math.sin(t * Math.PI) * 0.3; // Arc motion
      sphereRef.current.position.copy(position);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pathway line */}
      <Line
        points={points}
        color={chemical.color}
        lineWidth={2 * intensity}
        transparent
        opacity={0.6 * intensity}
      />
      
      {/* Traveling signal */}
      <group ref={sphereRef}>
        <Sphere args={[0.05 * intensity, 8, 8]}>
          <meshBasicMaterial
            color={chemical.color}
          />
        </Sphere>
      </group>
    </group>
  );
};

export const NeuralNetwork = ({ activeChemicals }: NeuralNetworkProps) => {
  const pathways = useMemo(() => {
    const paths: Array<{
      from: Vector3;
      to: Vector3;
      chemical: Neurotransmitter;
      intensity: number;
    }> = [];

    // Generate pathways based on active chemicals
    activeChemicals.forEach(chemical => {
      const affectedRegions = BRAIN_REGIONS.filter(region =>
        chemical.targetRegions.includes(region.id)
      );

      // Create pathways between affected regions
      for (let i = 0; i < affectedRegions.length; i++) {
        for (let j = i + 1; j < affectedRegions.length; j++) {
          const from = new Vector3(...affectedRegions[i].position);
          const to = new Vector3(...affectedRegions[j].position);
          
          paths.push({
            from,
            to,
            chemical,
            intensity: chemical.concentration / 100,
          });
        }
      }
    });

    return paths;
  }, [activeChemicals]);

  return (
    <group>
      {/* Enhanced neurotransmitter flows */}
      {activeChemicals.map(chemical => {
        const affectedRegions = BRAIN_REGIONS.filter(region =>
          chemical.targetRegions.includes(region.id)
        );
        
        if (affectedRegions.length === 0) return null;
        
        // Use first region as source, others as targets
        const sourcePosition = new Vector3(...affectedRegions[0].position);
        const targetPositions = affectedRegions.slice(1).map(region => 
          new Vector3(...region.position)
        );
        
        return (
          <NeurotransmitterFlow
            key={chemical.id}
            chemical={chemical}
            sourcePosition={sourcePosition}
            targetPositions={targetPositions}
          />
        );
      })}
      
      {/* Traditional pathways for baseline activity */}
      {pathways.map((pathway, index) => (
        <NeuralPathway
          key={`${pathway.chemical.id}-${index}`}
          from={pathway.from}
          to={pathway.to}
          chemical={pathway.chemical}
          intensity={pathway.intensity}
        />
      ))}
    </group>
  );
};