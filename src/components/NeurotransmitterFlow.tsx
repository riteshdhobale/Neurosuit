import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Tube } from '@react-three/drei';
import { Vector3, CatmullRomCurve3, BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three';
import { type Neurotransmitter } from '../types/neurochemical';

interface NeurotransmitterFlowProps {
  chemical: Neurotransmitter;
  sourcePosition: Vector3;
  targetPositions: Vector3[];
}

// Particle system for neurotransmitter visualization
const NeurotransmitterParticles = ({ 
  chemical, 
  path, 
  intensity 
}: { 
  chemical: Neurotransmitter; 
  path: Vector3[]; 
  intensity: number; 
}) => {
  const pointsRef = useRef<Points>(null);
  const particleCount = Math.floor(50 * intensity);
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Parse color from hex to RGB
    const hex = chemical.color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const pathIndex = Math.floor(t * (path.length - 1));
      const localT = (t * (path.length - 1)) - pathIndex;
      
      if (pathIndex < path.length - 1) {
        const start = path[pathIndex];
        const end = path[pathIndex + 1];
        const position = new Vector3().lerpVectors(start, end, localT);
        
        // Add some randomness for organic feel
        position.x += (Math.random() - 0.5) * 0.1;
        position.y += (Math.random() - 0.5) * 0.1;
        position.z += (Math.random() - 0.5) * 0.1;
        
        positions[i * 3] = position.x;
        positions[i * 3 + 1] = position.y;
        positions[i * 3 + 2] = position.z;
      }
      
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    
    return { positions, colors };
  }, [chemical.color, particleCount, path]);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        // Animate particles along the path
        const t = (state.clock.elapsedTime * 0.5 + i * 0.1) % 1;
        const pathIndex = Math.floor(t * (path.length - 1));
        const localT = (t * (path.length - 1)) - pathIndex;
        
        if (pathIndex < path.length - 1) {
          const start = path[pathIndex];
          const end = path[pathIndex + 1];
          const position = new Vector3().lerpVectors(start, end, localT);
          
          positions[i * 3] = position.x;
          positions[i * 3 + 1] = position.y;
          positions[i * 3 + 2] = position.z;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02 + intensity * 0.03}
        transparent
        opacity={0.8}
        vertexColors
        blending={2} // AdditiveBlending
      />
    </points>
  );
};

// Main flow component
export const NeurotransmitterFlow = ({ 
  chemical, 
  sourcePosition, 
  targetPositions 
}: NeurotransmitterFlowProps) => {
  const intensity = chemical.concentration / 100;
  
  if (intensity === 0) return null;

  return (
    <group>
      {targetPositions.map((targetPos, index) => {
        // Create curved path from source to target
        const midPoint1 = new Vector3()
          .addVectors(sourcePosition, targetPos)
          .multiplyScalar(0.33)
          .add(new Vector3(0, 0.5, 0));
        
        const midPoint2 = new Vector3()
          .addVectors(sourcePosition, targetPos)
          .multiplyScalar(0.67)
          .add(new Vector3(0, 0.3, 0));

        const path = [sourcePosition, midPoint1, midPoint2, targetPos];

        return (
          <group key={`${chemical.id}-${index}`}>
            {/* Flow tube */}
            <Line
              points={path}
              color={chemical.color}
              lineWidth={2 + intensity * 3}
              transparent
              opacity={0.4 + intensity * 0.4}
            />
            
            {/* Animated particles */}
            <NeurotransmitterParticles
              chemical={chemical}
              path={path}
              intensity={intensity}
            />
            
            {/* Glow effect */}
            <Line
              points={path}
              color={chemical.color}
              lineWidth={4 + intensity * 6}
              transparent
              opacity={0.1 + intensity * 0.2}
            />
          </group>
        );
      })}
    </group>
  );
};