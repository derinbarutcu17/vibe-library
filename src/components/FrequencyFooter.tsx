'use client';

import { useEffect, useRef } from 'react';
import styles from './FrequencyFooter.module.css';

export default function FrequencyFooter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let phase = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);
        };

        const draw = () => {
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;

            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let x = 0; x < width; x++) {
                const y = height / 2 +
                    Math.sin((x * 0.02) + phase) * 8 +
                    Math.sin((x * 0.01) + phase * 0.5) * 4;

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
            phase += 0.02;
            animationId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <footer className={styles.footer}>
            <canvas ref={canvasRef} className={styles.wave} />

            <div className={styles.content}>
                <p className={styles.status}>
                    System Operational. Archive Updated {currentDate}.
                </p>
                <p className={styles.credit}>
                    <span className={styles.comment}>// Designed by </span>
                    <a href="#" className={styles.link}>Derin</a>
                </p>
            </div>
        </footer>
    );
}
