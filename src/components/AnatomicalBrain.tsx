import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useBrainGeometry, useCerebellumGeometry } from './BrainGeometry';

interface AnatomicalBrainProps {
  opacity?: number;
  color?: string;
}

export const AnatomicalBrain = ({ opacity = 0.1, color = "#1a1a2e" }: AnatomicalBrainProps) => {
  const brainRef = useRef<Mesh>(null);
  const cerebellumRef = useRef<Mesh>(null);
  const brainStemRef = useRef<Mesh>(null);
  
  const brainGeometry = useBrainGeometry();
  const cerebellumGeometry = useCerebellumGeometry();

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.01;
    }
  });

  return (
    <group>
      {/* Main brain cortex */}
      <mesh ref={brainRef} geometry={brainGeometry} position={[0, 0.5, 0]}>
        <meshPhongMaterial
          color={color}
          opacity={opacity}
          transparent
          side={2} // DoubleSide
        />
      </mesh>

      {/* Cerebellum */}
      <mesh ref={cerebellumRef} geometry={cerebellumGeometry} position={[0, -1.3, -1.2]}>
        <meshPhongMaterial
          color="#2a2a3e"
          opacity={opacity * 1.2}
          transparent
          side={2}
        />
      </mesh>

      {/* Brain stem approximation */}
      <mesh ref={brainStemRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 1.2, 8]} />
        <meshPhongMaterial
          color="#3a3a4e"
          opacity={opacity * 1.5}
          transparent
        />
      </mesh>

      {/* Corpus callosum */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.2, 1.8]} />
        <meshPhongMaterial
          color="#4a4a5e"
          opacity={opacity * 2}
          transparent
        />
      </mesh>

      {/* Left and right hemispheres division */}
      <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[0.02, 3]} />
        <meshBasicMaterial
          color="#5a5a6e"
          opacity={opacity * 0.5}
          transparent
        />
      </mesh>
    </group>
  );
};