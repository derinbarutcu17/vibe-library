'use client';

import { useState } from 'react';
import styles from './PromptProductCard.module.css';
import type { PromptProduct } from '@/data/prompt-products';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';
import { useI18n } from '@/i18n';

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
    const { locale, t } = useI18n();

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const meta = CATEGORY_METADATA[prompt.category];

    // Get localized content
    const displayTitle = locale === 'tr' && prompt.titleTr ? prompt.titleTr : (locale === 'de' && prompt.titleDe ? prompt.titleDe : prompt.title);
    const combinedText = locale === 'tr' && prompt.previewTr ? prompt.previewTr : (locale === 'de' && prompt.previewDe ? prompt.previewDe : prompt.preview);

    return (
        <div
            className={styles.cardContainer}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                {/* Front of card */}
                <div className={styles.cardFront}>
                    {/* Header with Category and Specialized Tag */}
                    <div className={styles.cardHeader}>
                        <div className={styles.categoryPill}>
                            <Icon icon={meta.icon} className={styles.categoryIcon} style={{ color: meta.color }} />
                            <span className={styles.category} style={{ color: meta.color }}>
                                {t(`categories.${prompt.category}`)}
                            </span>
                        </div>

                        {prompt.category === 'creativity' && (
                            <>
                                {prompt.tags.includes('writing') && (
                                    <div className={styles.writingTag}>
                                        <Icon icon="mingcute:pen-line" />
                                        <span>{t('tags.writing')}</span>
                                    </div>
                                )}
                                {prompt.tags.includes('design') && (
                                    <div className={styles.designTag}>
                                        <Icon icon="mingcute:palette-line" />
                                        <span>{t('tags.design')}</span>
                                    </div>
                                )}
                                {prompt.tags.includes('visuals') && (
                                    <div className={styles.visualsTag}>
                                        <Icon icon="mingcute:video-line" />
                                        <span>{t('tags.visuals')}</span>
                                    </div>
                                )}
                                {prompt.tags.includes('critique') && (
                                    <div className={styles.critiqueTag}>
                                        <Icon icon="mingcute:alert-line" />
                                        <span>{t('tags.critique')}</span>
                                    </div>
                                )}
                                {prompt.tags.includes('logistics') && (
                                    <div className={styles.logisticsTag}>
                                        <Icon icon="mingcute:box-line" />
                                        <span>{t('tags.logistics')}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Content */}
                    <div className={styles.cardContent}>
                        <h3 className={styles.title}>{displayTitle}</h3>
                        <p className={styles.description}>{combinedText}</p>
                    </div>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                        <button className={styles.copyBtnFront} onClick={handleCopy}>
                            <Icon icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"} />
                            {copied ? t('common.copied') : t('common.copy')}
                        </button>
                        <span className={styles.flipHint}>
                            <Icon icon="mingcute:arrow-right-circle-line" />
                            {t('common.viewFullPrompt')}
                        </span>
                    </div>
                </div>

                {/* Back of card - Just the full prompt */}
                <div className={styles.cardBack}>
                    <div className={styles.backHeader}>
                        <span className={styles.backTitle}>{t('promptShop.fullPrompt')}</span>
                        <span className={styles.flipBackHint}>{t('promptShop.flipBack')}</span>
                    </div>

                    <div className={styles.fullPromptSection}>
                        <p className={styles.fullPrompt}>{prompt.fullPrompt}</p>
                    </div>

                    <button className={styles.copyBtn} onClick={handleCopy}>
                        <Icon icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"} />
                        {copied ? t('common.copied') : t('common.copyPromptShort')}
                    </button>
                </div>
            </div>
        </div>
    );
}
