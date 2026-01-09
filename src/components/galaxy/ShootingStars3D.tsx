'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// --- Custom Shader Material for the Tail ---
// Handles the ionization gradient (White -> Cyan -> Blue -> Transparent)
// and linear fade out.
const MeteorMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#FFFFFF') }, // Head white
        uColor2: { value: new THREE.Color('#22D3EE') }, // Cyan body
        uColor3: { value: new THREE.Color('#3B82F6') }  // Blue tail
    },
    vertexShader: `
    attribute float aSpeed;
    attribute float aLength;
    varying vec2 vUv;
    varying float vSpeed;
    
    void main() {
      vUv = uv;
      vSpeed = aSpeed;
      
      // Tapering effect: Squish the tail end (uv.x near 0)
      vec3 pos = position;
      // if (uv.x < 0.2) pos.y *= uv.x * 5.0; // Optional physical taper
      
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    void main() {
      // Linear gradient along U (length of tail)
      // 1.0 = Head, 0.0 = Tail end
      float opacity = smoothstep(0.0, 0.2, vUv.x); // Fade out tail tip
      
      // Heat map color ramp
      vec3 color = mix(uColor3, uColor2, smoothstep(0.0, 0.5, vUv.x));
      color = mix(color, uColor1, smoothstep(0.7, 1.0, vUv.x)); 
      
      // Intensity boost at the head
      if (vUv.x > 0.95) color += 0.5;

      gl_FragColor = vec4(color, opacity);
    }
  `
};

export default function ShootingStars3D() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const headRef = useRef<THREE.Points>(null);
    const count = 5; // Low count for realism

    // --- State Management ---
    // data[i] = { x, y, z, speed, length, type (0=normal, 1=bolide) }
    const data = useMemo(() => {
        return new Float32Array(count * 6).map(() => 0);
    }, [count]);

    // Initialize with bounds
    useMemo(() => {
        for (let i = 0; i < count; i++) {
            const i6 = i * 6;
            data[i6] = (Math.random() - 0.5) * 100;    // X
            data[i6 + 1] = (Math.random() - 0.5) * 60; // Y
            data[i6 + 2] = -50 - Math.random() * 50;   // Z (Start far back)
            data[i6 + 3] = 0; // Speed (0 = inactive)
        }
    }, [data, count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state, delta) => {
        if (!meshRef.current || !headRef.current) return;

        const positions = headRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i6 = i * 6;

            // Should we spawn?
            if (data[i6 + 3] === 0) {
                // Random spawn chance (very low to prevent spam)
                if (Math.random() < 0.005) {
                    const isBolide = Math.random() < 0.05; // 5% chance

                    data[i6 + 3] = isBolide ? 30 : 60 + Math.random() * 40; // Speed
                    data[i6 + 4] = isBolide ? 25 : 10 + Math.random() * 15; // Length
                    data[i6 + 5] = isBolide ? 1 : 0; // Type

                    // Start Position: Random cone, but generally far
                    data[i6] = (Math.random() - 0.5) * 80;
                    data[i6 + 1] = (Math.random() - 0.5) * 50;
                    data[i6 + 2] = -80; // Start deep z
                }
            } else {
                // MOVE
                data[i6 + 2] += delta * data[i6 + 3];

                // If passed camera, reset
                if (data[i6 + 2] > 20) {
                    data[i6 + 3] = 0; // Deactivate
                }
            }

            // Sync Visuals
            const x = data[i6];
            const y = data[i6 + 1];
            const z = data[i6 + 2];
            const len = data[i6 + 4];
            const isBolide = data[i6 + 5] === 1;

            if (data[i6 + 3] > 0) {
                // --- HEAD ---
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z + len / 2; // Head is at the front

                // --- TAIL ---
                dummy.position.set(x, y, z);
                // Scale X is thickness (Bolide is thicker)
                const thickness = isBolide ? 0.3 : 0.08;
                dummy.scale.set(len, thickness, 1);

                // Rotate to face velocity (simple Z forward)
                dummy.rotation.y = -Math.PI / 2;

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            } else {
                // Hide inactive
                dummy.scale.set(0, 0, 0);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
                positions[i * 3] = 9999; // Hide head
            }
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        headRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            {/* TAILS: Instanced Planes with Shader */}
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    ref={materialRef}
                    args={[MeteorMaterial]}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </instancedMesh>

            {/* HEADS: Points for glowing font */}
            <points ref={headRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(count * 3), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#fff"
                    size={0.8}
                    transparent
                    opacity={1}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}
