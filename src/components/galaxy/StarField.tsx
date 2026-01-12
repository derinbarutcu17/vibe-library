'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

const StarShader = {
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 } // Will be set in component
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
      
      // Twinkle Logic
      // Sine wave based on time + random offset, scaled by random speed
      float twinkle = sin(uTime * aSpeed + aOffset);
      
      // Remap from [-1, 1] to [0.3, 1.0] so they don't fully disappear
      twinkle = 0.5 + 0.5 * twinkle; 
      
      // Use twinkle to adjust opacity or brightness
      vAlpha = twinkle;
      
      // Size Attenuation
      // Scale based on distance to camera (z-depth)
      gl_PointSize = aScale * uPixelRatio;
      gl_PointSize *= (1.0 / -mvPosition.z) * 30.0; // 30.0 is a scaling factor
    }
  `,
    fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      // Create soft circular particle
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      
      // Soft edge glow
      float glow = 1.0 - (r * 2.0);
      glow = pow(glow, 1.5); // Sharpen the glow slightly
      
      gl_FragColor = vec4(vColor, vAlpha * glow);
    }
  `
};

export default function StarField() {
    const ref = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const count = 8000; // Increased back to 8000 for liveliness

    const [positions, data] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const colorAttr = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);
        const offsets = new Float32Array(count);

        // Generate positions in sphere
        random.inSphere(pos, { radius: 60 });

        const colorChoices = [
            new THREE.Color('#9bb0ff'), // Blue giant
            new THREE.Color('#aabfff'), // Blue-white
            new THREE.Color('#cad7ff'), // White
            new THREE.Color('#f8f7ff'), // Pure white
            new THREE.Color('#fff4ea'), // Yellow-white
            new THREE.Color('#ffd2a1'), // Gold/Orange
            // new THREE.Color('#ffcc6f')  // Red excluded to keep it "fresh" and not too busy
        ];

        for (let i = 0; i < count; i++) {
            // SAFE VOID LOGIC
            const x = pos[i * 3];
            const y = pos[i * 3 + 1];
            const z = pos[i * 3 + 2];
            const d = Math.sqrt(x * x + y * y + z * z);

            // Push close stars away to avoid "giant dots"
            if (d < 15) {
                const scaleFactor = (20 + Math.random() * 10) / d;
                pos[i * 3] *= scaleFactor;
                pos[i * 3 + 1] *= scaleFactor;
                pos[i * 3 + 2] *= scaleFactor;
            }

            // ATTRIBUTES

            // Color
            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            colorAttr[i * 3] = color.r;
            colorAttr[i * 3 + 1] = color.g;
            colorAttr[i * 3 + 2] = color.b;

            // Size (Scale)
            // Varied sizes for liveliness. Base size around 1.5 - 3.0 (pixels world-scale)
            scales[i] = Math.random() < 0.1 ? 4.0 : 1.5 + Math.random() * 2.0;

            // Twinkle Speed
            speeds[i] = 1.0 + Math.random() * 3.0; // Range 1x to 4x speed

            // Twinkle Offset (Phase)
            offsets[i] = Math.random() * Math.PI * 2;
        }

        return [pos, { colorAttr, scales, speeds, offsets }];
    }, []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.uniforms.uPixelRatio.value = state.viewport.dpr;
        }
        if (ref.current) {
            // Slow cosmic rotation
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
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
