'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import StarField from './StarField';
import Nebula from './Nebula';
import ShootingStars3D from './ShootingStars3D';
import gsap from 'gsap';
import * as THREE from 'three';

function CameraController({ mousePos, warpMode }: { mousePos: { x: number; y: number }, warpMode: boolean }) {
    useFrame((state) => {
        // Parallax Only - specific request to remove scroll zoom
        // Smoother, subtle parallax
        gsap.to(state.camera.position, {
            x: mousePos.x * 0.2 + (warpMode ? 5 : 0),
            y: mousePos.y * 0.2,
            z: warpMode ? 20 : 1,
            duration: 2.5,
            ease: 'power2.out',
        });

        // Warp Speed Effect (FOV Change)
        gsap.to(state.camera, {
            fov: warpMode ? 100 : 60,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => state.camera.updateProjectionMatrix()
        });

        // Slight rotation for "looking around" feel
        gsap.to(state.camera.rotation, {
            x: -mousePos.y * 0.02,
            y: -mousePos.x * 0.02,
            duration: 2.5,
            ease: 'power2.out',
        });
    });
    return null;
}

export default function GalaxyScene({ warpMode = false }: { warpMode?: boolean }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePos({ x, y });
    };

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} onMouseMove={handleMouseMove}>
            <Canvas camera={{ position: [0, 0, 1], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
                <color attach="background" args={['#020617']} />

                <Suspense fallback={null}>
                    {/* Core Stars - Customized for realism */}
                    <StarField mousePos={mousePos} />

                    {/* Simplified Meteors */}
                    <ShootingStars3D />

                    {/* Static Universe Background (Replaces heavy nebula) */}
                    <Nebula />

                    {/* Background filler stars for infinite depth */}
                    <Stars radius={100} depth={50} count={3000} factor={2} saturation={1} fade speed={2} />

                    <CameraController mousePos={mousePos} warpMode={warpMode} />
                </Suspense>
            </Canvas>
        </div>
    );
}
