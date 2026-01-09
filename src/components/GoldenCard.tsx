'use client';

import { useState } from 'react';
import { GoldenStandard } from '@/data/types';
import styles from './GoldenCard.module.css';

interface GoldenCardProps {
    standard: GoldenStandard;
}

export default function GoldenCard({ standard }: GoldenCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(standard.pattern);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div
            className={`${styles.card} ${copied ? styles.flash : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCopy}
        >
            <div className={`${styles.content} ${isHovered ? styles.hidden : ''}`}>
                <header className={styles.header}>
                    <h3 className={styles.title}>{standard.title}</h3>
                </header>

                <div className={styles.pattern}>
                    <p className={styles.patternText}>{standard.pattern}</p>
                </div>

                <div className={styles.meta}>
                    <div className={styles.usage}>
                        <div className={styles.usageBar}>
                            <div
                                className={styles.usageFill}
                                style={{ width: `${standard.usagePercentage}%` }}
                            />
                        </div>
                        <span className={styles.usageLabel}>
                            {standard.usagePercentage}% usage
                        </span>
                    </div>

                    <div className={styles.tags}>
                        {standard.tags.map(tag => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${styles.copyOverlay} ${isHovered ? styles.visible : ''}`}>
                <div className={styles.copyGlyph}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                </div>
                <span className={styles.copyLabel}>COPY PATTERN</span>
            </div>

            {copied && (
                <div className={styles.toast}>
                    Pattern Acquired
                </div>
            )}
        </div>
    );
}
