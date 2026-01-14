'use client';

import { useState } from 'react';
import styles from './PromptProductCard.module.css';
import type { PromptProduct } from '@/data/prompt-products';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';

interface PromptProductCardProps {
    prompt: PromptProduct;
}

// Truncate text to word limit
function truncateWords(text: string, maxWords: number): string {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
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

    // Use the curated preview text which now contains the merged summary
    const combinedText = prompt.preview;

    return (
        <div
            className={styles.cardContainer}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                {/* Front of card */}
                <div className={styles.cardFront}>
                    {/* Category Pill Badge */}
                    <div className={styles.categoryPill}>
                        <Icon icon={meta.icon} className={styles.categoryIcon} style={{ color: meta.color }} />
                        <span className={styles.category} style={{ color: meta.color }}>
                            {meta.label}
                        </span>
                    </div>

                    {/* Content */}
                    <div className={styles.cardContent}>
                        <h3 className={styles.title}>{prompt.title}</h3>
                        <p className={styles.description}>{combinedText}</p>
                    </div>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                        <button className={styles.copyBtnFront} onClick={handleCopy}>
                            <Icon icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"} />
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <span className={styles.flipHint}>
                            <Icon icon="mingcute:arrow-right-circle-line" />
                            View full prompt
                        </span>
                    </div>
                </div>

                {/* Back of card - Just the full prompt */}
                <div className={styles.cardBack}>
                    <div className={styles.backHeader}>
                        <span className={styles.backTitle}>Full Prompt</span>
                        <span className={styles.flipBackHint}>← tap to flip</span>
                    </div>

                    <div className={styles.fullPromptSection}>
                        <p className={styles.fullPrompt}>{prompt.fullPrompt}</p>
                    </div>

                    <button className={styles.copyBtn} onClick={handleCopy}>
                        <Icon icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"} />
                        {copied ? 'Copied!' : 'Copy Prompt'}
                    </button>
                </div>
            </div>
        </div>
    );
}
