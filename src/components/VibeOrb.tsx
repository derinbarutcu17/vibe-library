'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './VibeOrb.module.css';

export default function VibeOrb() {
    const orbRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Floating/Breathing animation
        gsap.to(orbRef.current, {
            y: -15,
            scale: 1.05,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        // Pulse animation for the internal glow
        gsap.to(glowRef.current, {
            opacity: 0.6,
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }, []);

    return (
        <div className={styles.orbContainer}>
            <div ref={orbRef} className={styles.orb} id="vibe-orb">
                <div ref={glowRef} className={styles.orbGlow}></div>
                <div className={styles.orbCore}></div>
            </div>
        </div>
    );
}
