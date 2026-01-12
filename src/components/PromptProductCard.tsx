'use client';

import { useState } from 'react';
import styles from './PromptProductCard.module.css';
import type { PromptProduct } from '@/data/prompt-products';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';

interface PromptProductCardProps {
    prompt: PromptProduct;
}

export default function PromptProductCard({ prompt }: PromptProductCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const meta = CATEGORY_METADATA[prompt.category];

    return (
        <div
            className={styles.cardContainer}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                {/* Front of card */}
                <div className={styles.cardFront}>
                    <div className={styles.cardHeader}>
                        <div className={styles.categoryInfo}>
                            <Icon icon={meta.icon} className={styles.categoryIcon} style={{ color: meta.color }} />
                            <span
                                className={styles.category}
                                style={{ color: meta.color }}
                            >
                                {prompt.category.replace('-', '/')}
                            </span>
                        </div>
                    </div>

                    <div className={styles.cardContent}>
                        <h3 className={styles.title}>{prompt.title}</h3>
                        <p className={styles.preview}>{prompt.preview}</p>
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.tags}>
                            {prompt.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.flipHint}>
                        <span>Click to see why it works →</span>
                    </div>
                </div>

                {/* Back of card */}
                <div className={styles.cardBack}>
                    <div className={styles.backHeader}>
                        <span className={styles.backTitle}>Why It Works</span>
                        <span className={styles.flipBackHint}>← flip back</span>
                    </div>

                    <p className={styles.explanation}>{prompt.whyItWorks}</p>

                    <div className={styles.fullPromptSection}>
                        <span className={styles.fullPromptLabel}>Full Prompt:</span>
                        <p className={styles.fullPrompt}>{prompt.fullPrompt}</p>
                    </div>

                    <button
                        className={styles.copyBtn}
                        onClick={handleCopy}
                    >
                        {copied ? '✓ Copied!' : 'Copy Prompt'}
                    </button>
                </div>
            </div>
        </div>
    );
}
