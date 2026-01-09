'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    PerspectiveCamera,
    MeshTransmissionMaterial,
    Float
} from '@react-three/drei';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Color palette for each stat node
const NODE_COLORS: Record<string, { primary: string; emissive: string }> = {
    'code-efficiency': { primary: '#00D4FF', emissive: '#0088AA' },
    'prompt-patterns': { primary: '#A855F7', emissive: '#7C3AED' },
    'blueprint-accuracy': { primary: '#22C55E', emissive: '#16A34A' },
    'code-transformation': { primary: '#F97316', emissive: '#EA580C' },
    'logic-modules': { primary: '#EAB308', emissive: '#CA8A04' },
    'ai-interactions': { primary: '#EC4899', emissive: '#DB2777' },
    'default': { primary: '#60A5FA', emissive: '#3B82F6' },
};

// Cube vertices (8 corners)
const cubeVertices: [number, number, number][] = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
];

// Cube edges (12 connections)
const cubeEdges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
];

interface CrystalCubeProps {
    activeNode: string | null;
}

function CrystalCube({ activeNode }: CrystalCubeProps) {
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<any>(null);

    const targetColor = useRef(new THREE.Color(NODE_COLORS.default.primary));
    const currentColor = useRef(new THREE.Color(NODE_COLORS.default.primary));

    // Create merged geometry for better performance
    const mergedGeometry = useMemo(() => {
        const geometries: THREE.BufferGeometry[] = [];

        // Add tubes
        cubeEdges.forEach(([startIdx, endIdx]) => {
            const start = new THREE.Vector3(...cubeVertices[startIdx]);
            const end = new THREE.Vector3(...cubeVertices[endIdx]);
            const path = new THREE.LineCurve3(start, end);
            const tube = new THREE.TubeGeometry(path, 8, 0.05, 8, false);
            geometries.push(tube);
        });

        // Add corner spheres
        cubeVertices.forEach((v) => {
            const sphere = new THREE.SphereGeometry(0.1, 12, 12);
            sphere.translate(v[0], v[1], v[2]);
            geometries.push(sphere);
        });

        // Merge all into one geometry
        return mergeGeometries(geometries);
    }, []);

    // Update target color when activeNode changes
    useEffect(() => {
        const colors = NODE_COLORS[activeNode || 'default'] || NODE_COLORS.default;
        targetColor.current.set(colors.primary);
    }, [activeNode]);

    // Mouse tracking
    const { mouse } = useThree();

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Slow rotation
        groupRef.current.rotation.x += delta * 0.12;
        groupRef.current.rotation.y += delta * 0.18;

        // Mouse-follow tilt
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            -mouse.x * 0.15,
            0.05
        );

        // Color lerp
        currentColor.current.lerp(targetColor.current, 0.03);

        if (materialRef.current) {
            materialRef.current.color = currentColor.current;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
            <group ref={groupRef} scale={1.1}>
                <mesh geometry={mergedGeometry}>
                    <MeshTransmissionMaterial
                        ref={materialRef}
                        backside={false}
                        samples={4}
                        resolution={128}
                        transmission={0.95}
                        roughness={0.1}
                        thickness={0.3}
                        ior={1.5}
                        chromaticAberration={0.5}
                        clearcoat={0.8}
                        color={currentColor.current}
                    />
                </mesh>
            </group>
        </Float>
    );
}

interface VibeOrb3DProps {
    activeNode?: string | null;
}

export default function VibeOrb3D({ activeNode = null }: VibeOrb3DProps) {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
            >
                {/* No background color - transparent canvas */}
                <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />

                {/* Simplified lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-3, 2, -3]} intensity={0.8} color="#A855F7" />

                {/* The Crystal Cube */}
                <CrystalCube activeNode={activeNode} />
            </Canvas>
        </div>
    );
}
