'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Nebula() {
    // Generate a soft glow texture programmatically
    const texture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (!context) return null;

        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, []);

    // Create a few large particles for the nebula look
    const count = 20;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        // Spread them out widely
        random.inSphere(pos, { radius: 30 });
        return pos;
    }, []);

    // Assign colors (mix of blue and purple)
    const colors = useMemo(() => {
        const cols = new Float32Array(count * 3);
        const blue = new THREE.Color('#3B82F6');
        const purple = new THREE.Color('#7C3AED');

        for (let i = 0; i < count; i++) {
            const color = Math.random() > 0.5 ? blue : purple;
            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;
        }
        return cols;
    }, []);

    const ref = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            // Very slow drift
            ref.current.rotation.y += delta * 0.02;

            // Subtle "breathing" effect
            // Sine wave between 0.05 and 0.08 opacity
            const time = state.clock.getElapsedTime();
            // Cast to any to bypass strict material type checking for bespoke logic
            (ref.current.material as any).opacity = 0.06 + Math.sin(time * 0.5) * 0.015;
        }
    });

    if (!texture) return null;

    return (
        <group>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    map={texture}
                    transparent
                    vertexColors
                    opacity={0.06} // Very subtle
                    size={15} // Huge particles to overlapping soft glows
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}
