'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './GreenPrompting.module.css';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/i18n';

interface GreenPromptingProps {
    onOpenCrafter?: () => void;
}

// Source links for citations
const SOURCES = {
    frontiers: {
        name: 'Frontiers in Communication',
        url: 'https://www.frontiersin.org/journals/communication/articles/10.3389/fcomm.2025.1478657/full'
    },
    huggingface: {
        name: 'Hugging Face & CMU',
        url: 'https://huggingface.co/blog/power-hungry-processing'
    },
    arxiv: {
        name: 'arXiv (2025)',
        url: 'https://arxiv.org/abs/2501.10468'
    },
    google: {
        name: 'Google Cloud Blog',
        url: 'https://cloud.google.com/blog/topics/sustainability/measuring-the-environmental-impact-of-ai-inference'
    }
};

export default function GreenPrompting({ onOpenCrafter }: GreenPromptingProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const badgeRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    // Hide badge on scroll (but keep overlay open if it's open)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCtaClick = () => {
        setIsOpen(false);
        onOpenCrafter?.();
    };

    return (
        <>
            {/* Floating Leaf Badge */}
            <div
                ref={badgeRef}
                className={`${styles.leafBadge} ${!isVisible ? styles.hidden : ''}`}
                onClick={() => setIsOpen(true)}
            >
                <div className={styles.leafIcon}>
                    <Icon icon="mingcute:leaf-line" />
                </div>

                {/* Hand-drawn arrow */}
                <svg className={styles.arrow} viewBox="0 0 100 50" fill="none">
                    <path
                        d="M8 40 C 25 10, 55 5, 85 20"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="6 4"
                    />
                    <path
                        d="M78 12 L88 20 L80 26"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>

                <div className={styles.leafText}>
                    <p className={styles.leafHeadline}>
                        {t('greenPrompting.badge.headline')}<br />
                        <span>{t('greenPrompting.badge.highlight')}</span> {t('greenPrompting.badge.suffix')}
                    </p>
                    <button className={styles.learnMore}>{t('common.learnMore')}</button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <Icon icon="mingcute:close-line" />
                        </button>

                        {/* Two Column Layout */}
                        <div className={styles.twoColumn}>
                            {/* Left Column */}
                            <div className={styles.leftColumn}>
                                <div className={styles.leftTop}>
                                    {/* Title */}
                                    <h1 className={styles.overlayTitle}>
                                        {t('greenPrompting.overlay.title').split(' ')[0]}<br />
                                        <span>{t('greenPrompting.overlay.title').split(' ')[1] || 'Prompting'}</span>
                                    </h1>
                                    <p className={styles.overlaySubtitle}>{t('greenPrompting.overlay.subtitle')}</p>

                                    {/* Intro */}
                                    <p className={styles.introText}>
                                        {t('greenPrompting.overlay.intro')}
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className={styles.statsArea}>
                                    <span className={styles.statsLabel}>HERO STATS</span>

                                    <div className={styles.mainStat}>
                                        <div className={styles.statLeft}>
                                            <span className={styles.statBigNumber}>{t('greenPrompting.overlay.stat1Number')}</span>
                                            <span className={styles.statSmallLabel}>{t('greenPrompting.overlay.stat1Label')}</span>
                                        </div>
                                        <span className={styles.statNote}>{t('greenPrompting.overlay.stat1Text').substring(0, 40)}...</span>
                                    </div>

                                    <div className={styles.smallStats}>
                                        <div className={styles.smallStat}>
                                            <span className={styles.statMedNumber}>{t('greenPrompting.overlay.stat2Number')}</span>
                                            <span className={styles.statSmallLabel}>{t('greenPrompting.overlay.stat2Label')}</span>
                                        </div>
                                        <div className={styles.smallStat}>
                                            <span className={styles.statMedNumber}>{t('greenPrompting.overlay.stat3Number')}</span>
                                            <span className={styles.statSmallLabel}>{t('greenPrompting.overlay.stat3Label')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Sources */}
                                <div className={styles.sourcesArea}>
                                    <span className={styles.sourcesLabel}>Sources:</span>
                                    <div className={styles.sourceLinks}>
                                        <span>{SOURCES.frontiers.name}</span>
                                        <span className={styles.sourceDot}>•</span>
                                        <span>{SOURCES.huggingface.name}</span>
                                        <span className={styles.sourceDot}>•</span>
                                        <span>{SOURCES.arxiv.name}</span>
                                        <span className={styles.sourceDot}>•</span>
                                        <span>{SOURCES.google.name}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className={styles.rightColumn}>
                                {/* Problem Card */}
                                <div className={styles.challengeCard}>
                                    <div className={styles.cardIconBg}>
                                        <Icon icon="mingcute:warning-fill" />
                                    </div>
                                    <span className={styles.cardLabel}>THE CHALLENGE</span>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardIconSmall}>
                                            <Icon icon="mingcute:forbid-circle-line" />
                                        </div>
                                        <div>
                                            <h3>{t('greenPrompting.overlay.problemTitle')}</h3>
                                            <p>{t('greenPrompting.overlay.problemText')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Solution Card */}
                                <div className={styles.solutionCard}>
                                    <div className={styles.cardIconBg}>
                                        <Icon icon="mingcute:check-circle-fill" />
                                    </div>
                                    <span className={styles.cardLabel}>THE SOLUTION</span>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardIconSmall}>
                                            <Icon icon="mingcute:brain-line" />
                                        </div>
                                        <div>
                                            <h3>{t('greenPrompting.overlay.solutionTitle')}</h3>
                                            <p>{t('greenPrompting.overlay.solutionText')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className={styles.ctaButton} onClick={handleCtaClick}>
                                    <span>{t('greenPrompting.overlay.footer')}</span>
                                    <span className={styles.ctaEmoji}>🌱</span>
                                    <Icon icon="mingcute:arrow-right-line" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
