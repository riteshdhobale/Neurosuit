import { useMemo } from 'react';
import { Shape, ExtrudeGeometry, CatmullRomCurve3, Vector3 } from 'three';

// Create anatomically inspired brain geometry
export const useBrainGeometry = () => {
  const brainGeometry = useMemo(() => {
    // Create brain shape using curves to approximate real brain contours
    const brainShape = new Shape();
    
    // Brain outline - sagittal view approximation
    brainShape.moveTo(-2.5, -1.5);
    brainShape.quadraticCurveTo(-2.8, 0, -2.5, 1.5);
    brainShape.quadraticCurveTo(-1.5, 2.2, 0, 2.0);
    brainShape.quadraticCurveTo(1.5, 2.2, 2.5, 1.5);
    brainShape.quadraticCurveTo(2.8, 0, 2.5, -1.5);
    brainShape.quadraticCurveTo(1.5, -2.0, 0, -1.8);
    brainShape.quadraticCurveTo(-1.5, -2.0, -2.5, -1.5);

    const extrudeSettings = {
      depth: 2.5,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    return new ExtrudeGeometry(brainShape, extrudeSettings);
  }, []);

  return brainGeometry;
};

// Create cerebellum geometry
export const useCerebellumGeometry = () => {
  const cerebellumGeometry = useMemo(() => {
    const shape = new Shape();
    
    // Cerebellum outline - more compact and ridged
    shape.moveTo(-1.2, -0.8);
    shape.quadraticCurveTo(-1.4, -0.2, -1.2, 0.2);
    shape.quadraticCurveTo(-0.6, 0.4, 0, 0.3);
    shape.quadraticCurveTo(0.6, 0.4, 1.2, 0.2);
    shape.quadraticCurveTo(1.4, -0.2, 1.2, -0.8);
    shape.quadraticCurveTo(0.6, -1.0, 0, -0.9);
    shape.quadraticCurveTo(-0.6, -1.0, -1.2, -0.8);

    const extrudeSettings = {
      depth: 1.5,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    return new ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return cerebellumGeometry;
};

// Create brain stem geometry
export const useBrainStemGeometry = () => {
  const brainStemGeometry = useMemo(() => {
    // Create a tapered cylinder for brain stem
    const curve = new CatmullRomCurve3([
      new Vector3(0, 0, 0),
      new Vector3(0, -0.5, 0),
      new Vector3(0, -1.0, 0),
      new Vector3(0, -1.5, -0.2),
    ]);

    return curve;
  }, []);

  return brainStemGeometry;
};