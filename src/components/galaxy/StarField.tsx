'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

export default function StarField(props: any) {
    const ref = useRef<THREE.Points>(null);

    // Generate positions and colors
    const [positions, colors] = useMemo(() => {
        const count = 6000; // Slightly reduced for performance
        const pos = new Float32Array(count * 3);
        const cols = new Float32Array(count * 3);

        random.inSphere(pos, { radius: 45 }); // Increased radius slightly

        // SAFETY: Filter out stars that are too close to center (where camera is/might be)
        // Camera is at [0,0,1], we want to avoid anything within radius ~10 of 0,0,0 just to be safe from "giant dots"
        for (let i = 0; i < count; i++) {
            const x = pos[i * 3];
            const y = pos[i * 3 + 1];
            const z = pos[i * 3 + 2];

            // Calculate distance from center
            const d = Math.sqrt(x * x + y * y + z * z);

            // If too close, push it out
            if (d < 10) {
                // Normalize and push to min distance
                const scale = (15 + Math.random() * 5) / d; // Push to 15-20 range
                pos[i * 3] *= scale;
                pos[i * 3 + 1] *= scale;
                pos[i * 3 + 2] *= scale;
            }
        }

        const colorChoices = [
            new THREE.Color('#9bb0ff'), // Blue giant
            new THREE.Color('#aabfff'), // Blue-white
            new THREE.Color('#cad7ff'), // White
            new THREE.Color('#f8f7ff'), // Pure white
            new THREE.Color('#fff4ea'), // Yellow-white
            new THREE.Color('#ffd2a1'), // Gold/Orange
            new THREE.Color('#ffcc6f')  // Red giantish
        ];

        for (let i = 0; i < count; i++) {
            // Pick a random realistic star color
            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

            // Add some random brightness variation
            const intensity = 0.5 + Math.random() * 0.5;

            cols[i * 3] = color.r * intensity;
            cols[i * 3 + 1] = color.g * intensity;
            cols[i * 3 + 2] = color.b * intensity;
        }

        return [pos, cols];
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 100; // Very slow rotation
            ref.current.rotation.y -= delta / 120;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}
