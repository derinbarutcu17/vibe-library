'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './ShootingStars.module.css';

interface Star {
    id: number;
    x: number; // percentage
    y: number; // percentage
    angle: number; // degrees
    speed: number; // seconds
    delay: number; // seconds
    scale: number;
    width: number; // px
    colorClass: 'blue' | 'white';
}

export default function ShootingStars() {
    const [stars, setStars] = useState<Star[]>([]);
    const nextId = useRef(0);

    useEffect(() => {
        const spawnStar = () => {
            const id = nextId.current++;

            // 1. Randomize starting position (mostly top/left areas for diagonal motion)
            // Weight towards top and left to ensure they cross the screen
            const startX = Math.random() * 100; // 0-100% width
            const startY = Math.random() * 60;  // 0-60% height (mostly upper half)

            // 2. Randomize Trajectory (Angle) - mostly diagonal down-right
            const angle = 20 + Math.random() * 35; // 20 to 55 degrees

            // 3. Randomize Speed
            const speed = 1.5 + Math.random() * 2.5; // 1.5s to 4s

            // 5. Randomize Size (Scale)
            const scale = 0.5 + Math.random() * 0.8; // 0.5x to 1.3x

            // 6. Randomize Tail Length
            const width = 100 + Math.random() * 200; // 100px to 300px tail

            // 8. Color Variations
            const colorClass = Math.random() > 0.7 ? 'blue' : 'white';

            const newStar: Star = {
                id,
                x: startX,
                y: startY,
                angle,
                speed,
                delay: 0,
                scale,
                width,
                colorClass
            };

            setStars(prev => [...prev, newStar]);

            // Clean up star after animation
            setTimeout(() => {
                setStars(prev => prev.filter(s => s.id !== id));
            }, speed * 1000 + 100);

            // 3. & 4. Randomize Intervals (Next spawn)
            // Spawn next star in random time between 2s and 8s
            const nextSpawnTime = 2000 + Math.random() * 6000;
            timeoutRef.current = setTimeout(spawnStar, nextSpawnTime);
        };

        // Initial spawn
        let timeoutRef = { current: setTimeout(spawnStar, 1000) };

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={styles.starContainer}>
            {stars.map(star => (
                <div
                    key={star.id}
                    className={`${styles.star} ${styles[star.colorClass]}`}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        transform: `rotate(${star.angle}deg) scale(${star.scale})`,
                        animationDuration: `${star.speed}s`,
                    }}
                />
            ))}
        </div>
    );
}
