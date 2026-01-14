'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

interface StarLayerProps {
    count: number;
    radius: number;
    depth: number;
    rotationSpeed: number;
    parallaxFactor: number;
    flickerIntensity: number;
    sizeRange: [number, number];
    mousePos: { x: number; y: number };
}

const StarShader = {
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 }
    },
    vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    
    attribute float aScale;
    attribute vec3 aColor;
    attribute float aSpeed;
    attribute float aOffset;
    
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vColor = aColor;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      float twinkle = sin(uTime * aSpeed + aOffset);
      twinkle = 0.5 + 0.5 * twinkle; 
      
      vAlpha = twinkle;
      
      gl_PointSize = aScale * uPixelRatio;
      gl_PointSize *= (1.0 / -mvPosition.z) * 30.0;
    }
  `,
    fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      
      float glow = 1.0 - (r * 2.0);
      glow = pow(glow, 1.5);
      
      gl_FragColor = vec4(vColor, vAlpha * glow);
    }
  `
};

function StarLayer({
    count,
    radius,
    depth,
    rotationSpeed,
    parallaxFactor,
    flickerIntensity,
    sizeRange,
    mousePos
}: StarLayerProps) {
    const ref = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const [positions, data] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const colorAttr = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);
        const offsets = new Float32Array(count);

        random.inSphere(pos, { radius });

        const colorChoices = [
            new THREE.Color('#9bb0ff'),
            new THREE.Color('#aabfff'),
            new THREE.Color('#cad7ff'),
            new THREE.Color('#f8f7ff'),
            new THREE.Color('#fff4ea'),
            new THREE.Color('#ffd2a1')
        ];

        for (let i = 0; i < count; i++) {
            const x = pos[i * 3];
            const y = pos[i * 3 + 1];
            const z = pos[i * 3 + 2];
            const d = Math.sqrt(x * x + y * y + z * z);

            if (d < depth) {
                const scaleFactor = (depth + Math.random() * 10) / d;
                pos[i * 3] *= scaleFactor;
                pos[i * 3 + 1] *= scaleFactor;
                pos[i * 3 + 2] *= scaleFactor;
            }

            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            colorAttr[i * 3] = color.r;
            colorAttr[i * 3 + 1] = color.g;
            colorAttr[i * 3 + 2] = color.b;

            scales[i] = Math.random() < 0.1
                ? sizeRange[1]
                : sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

            speeds[i] = flickerIntensity * (1.0 + Math.random() * 3.0);
            offsets[i] = Math.random() * Math.PI * 2;
        }

        return [pos, { colorAttr, scales, speeds, offsets }];
    }, [count, radius, depth, flickerIntensity, sizeRange]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.uniforms.uPixelRatio.value = state.viewport.dpr;
        }
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed;
            ref.current.position.x = mousePos.x * parallaxFactor;
            ref.current.position.y = mousePos.y * parallaxFactor;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aColor"
                    count={count}
                    args={[data.colorAttr, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    args={[data.scales, 1]}
                />
                <bufferAttribute
                    attach="attributes-aSpeed"
                    count={count}
                    args={[data.speeds, 1]}
                />
                <bufferAttribute
                    attach="attributes-aOffset"
                    count={count}
                    args={[data.offsets, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                args={[StarShader]}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function StarField({ mousePos = { x: 0, y: 0 } }: { mousePos?: { x: number; y: number } }) {
    return (
        <>
            <StarLayer
                count={3000}
                radius={80}
                depth={20}
                rotationSpeed={0}
                parallaxFactor={0.05}
                flickerIntensity={0.3}
                sizeRange={[1.0, 2.5]}
                mousePos={mousePos}
            />
            <StarLayer
                count={2500}
                radius={60}
                depth={15}
                rotationSpeed={0.01}
                parallaxFactor={0.15}
                flickerIntensity={0.5}
                sizeRange={[1.5, 3.5]}
                mousePos={mousePos}
            />
            <StarLayer
                count={2000}
                radius={40}
                depth={10}
                rotationSpeed={0.02}
                parallaxFactor={0.3}
                flickerIntensity={0.7}
                sizeRange={[2.0, 4.5]}
                mousePos={mousePos}
            />
        </>
    );
}
