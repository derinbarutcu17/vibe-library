'use client';

import { useState } from 'react';
import { PatternCard as PatternCardType } from '@/data/content-data';
import styles from './PatternCard.module.css';

interface PatternCardProps {
    card: PatternCardType;
}

export default function PatternCard({ card }: PatternCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(card.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`obsidian-card ${styles.card} ${card.variant === 'warning' ? styles.warning : ''}`}>
            {card.variant === 'warning' && (
                <div className={styles.flagBadge}>
                    <span className={styles.flagIcon}>🚩</span>
                    RED FLAG
                </div>
            )}

            <h3 className={styles.title}>{card.title}</h3>

            {card.context && (
                <p className={styles.context}>{card.context}</p>
            )}

            <p className={styles.content}>{card.content}</p>

            <button
                className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                onClick={handleCopy}
            >
                {copied ? (
                    <>✓ Pattern Acquired</>
                ) : (
                    <>⎘ Copy Pattern</>
                )}
                {copied && <span className={styles.scanLine} />}
            </button>
        </div>
    );
}
