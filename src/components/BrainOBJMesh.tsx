
import { useRef, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial, Mesh, AmbientLight, DirectionalLight } from 'three';

export function BrainOBJMesh() {
    const obj = useLoader(OBJLoader, '/models/brain.obj');
    const ref = useRef();
    const { scene } = useThree();

    // Add strong lighting for dark mode
    useEffect(() => {
        // Remove existing lights
        scene.children = scene.children.filter(child => child.type !== 'AmbientLight' && child.type !== 'DirectionalLight');
        // Add bright ambient and directional lights
        scene.add(new AmbientLight(0xffffff, 1.2));
        scene.add(new DirectionalLight(0xffffff, 1.5));
    }, [scene]);

    // Center and scale the model for visibility
    useEffect(() => {
        if (obj) {
            obj.position.set(0, 0, 0);
            obj.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
            // Add fallback material if missing
            obj.traverse((child) => {
                if (child instanceof Mesh && !child.material) {
                    child.material = new MeshStandardMaterial({ color: '#ffe066', metalness: 0.1, roughness: 0.5 }); // bright yellow
                }
            });
        }
    }, [obj]);

    return <primitive ref={ref} object={obj} />;
}
