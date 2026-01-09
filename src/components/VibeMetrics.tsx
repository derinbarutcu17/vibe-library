'use client';

import { useState, useEffect } from 'react';
import styles from './VibeMetrics.module.css';

interface VibeMetricsProps {
    costRatio: string;
    realityScore: number;
    unrealLibs?: string[];
}

export default function VibeMetrics({ costRatio, realityScore, unrealLibs = [] }: VibeMetricsProps) {
    const [showLibs, setShowLibs] = useState(false);
    const [randomHeights, setRandomHeights] = useState<number[]>([]);

    const isGrounded = realityScore === 100;
    const statusLabel = isGrounded ? 'GROUNDED' : 'UNVERIFIED';
    const statusClass = isGrounded ? styles.grounded : styles.unverified;

    // Generate waveform bars based on ratio
    const ratio = parseInt(costRatio.split(':')[1]) || 100;
    const normalizedRatio = Math.min(ratio / 600, 1); // Normalize to 0-1
    const waveformHeight = normalizedRatio > 0.5 ? 'high' : normalizedRatio > 0.25 ? 'medium' : 'low';

    useEffect(() => {
        // Generate heights only on the client
        setRandomHeights([...Array(12)].map(() => Math.random() * 50 + (normalizedRatio * 50)));
    }, [normalizedRatio]);

    return (
        <div className={styles.hud}>
            <div className={styles.metric}>
                <span className={styles.label}>COST OF THOUGHT</span>
                <div className={styles.waveformWrapper}>
                    <div className={`${styles.waveform} ${styles[waveformHeight]}`}>
                        {(randomHeights.length > 0 ? randomHeights : [...Array(12)].fill(30)).map((height, i) => (
                            <div
                                key={i}
                                className={styles.bar}
                                style={{
                                    height: `${height}%`,
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                    <span className={styles.value}>{costRatio}</span>
                </div>
            </div>

            <div className={styles.divider} />

            <div
                className={styles.metric}
                onMouseEnter={() => setShowLibs(true)}
                onMouseLeave={() => setShowLibs(false)}
            >
                <span className={styles.label}>REALITY ANCHOR</span>
                <div className={styles.shieldWrapper}>
                    <div className={`${styles.shield} ${statusClass}`}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            {!isGrounded && (
                                <path d="M12 8v4M12 16h.01" stroke="var(--void-black)" strokeWidth="2" strokeLinecap="round" />
                            )}
                        </svg>
                    </div>
                    <span className={`${styles.value} ${statusClass}`}>{statusLabel}</span>
                </div>

                {showLibs && unrealLibs && unrealLibs.length > 0 && (
                    <div className={styles.tooltip}>
                        <span className={styles.tooltipTitle}>Unverified imports:</span>
                        {unrealLibs.map((lib, i) => (
                            <code key={i} className={styles.tooltipLib}>{lib}</code>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
