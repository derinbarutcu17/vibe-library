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

                        {/* Content Grid */}
                        <div className={styles.contentGrid}>
                            {/* Left Main Section */}
                            <div className={styles.leftMain}>
                                <div className={styles.mainContent}>
                                    {/* Title */}
                                    <h1 className={styles.overlayTitle}>
                                        <span className={styles.greenText}>Green</span> Prompting
                                    </h1>
                                    <p className={styles.overlaySubtitle}>Efficiency is Eco-Friendly</p>

                                    {/* Intro */}
                                    <p className={styles.introText}>
                                        We often forget that "the cloud" runs on physical, power-hungry hardware. Every prompt triggers massive computations on energy-intensive GPUs.
                                    </p>
                                </div>

                                {/* Hero Stats */}
                                <div className={styles.statsArea}>
                                    <span className={styles.statsLabel}>Hero Stats</span>
                                    <div className={styles.statsGrid}>
                                        {/* Stat 1: Energy */}
                                        <div className={styles.statCard}>
                                            <div className={`${styles.statIcon} ${styles.energy}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <rect x="4" y="14" width="3" height="6" fill="currentColor" opacity="0.4" />
                                                    <rect x="9" y="10" width="3" height="10" fill="currentColor" opacity="0.6" />
                                                    <rect x="14" y="6" width="3" height="14" fill="currentColor" opacity="0.8" />
                                                    <rect x="19" y="2" width="3" height="18" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <div className={styles.statNumber}>10-50x</div>
                                            <div className={styles.statLabel}>MORE ENERGY</div>
                                            <p className={styles.statExplanation}>
                                                {t('greenPrompting.overlay.stat1Text')}
                                            </p>
                                        </div>

                                        {/* Stat 2: Smartphone */}
                                        <div className={styles.statCard}>
                                            <div className={`${styles.statIcon} ${styles.phone}`}>
                                                <Icon icon="mingcute:phone-line" />
                                            </div>
                                            <div className={styles.statNumber}>1</div>
                                            <div className={styles.statLabel}>SMARTPHONE CHARGE</div>
                                            <p className={styles.statExplanation}>
                                                {t('greenPrompting.overlay.stat2Text')}
                                            </p>
                                        </div>

                                        {/* Stat 3: Carbon */}
                                        <div className={styles.statCard}>
                                            <div className={`${styles.statIcon} ${styles.carbon}`}>
                                                <Icon icon="mingcute:leaf-line" />
                                            </div>
                                            <div className={styles.statNumber}>32x</div>
                                            <div className={styles.statLabel}>CARBON FOOTPRINT</div>
                                            <p className={styles.statExplanation}>
                                                {t('greenPrompting.overlay.stat3Text')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Cards Section */}
                            <div className={styles.rightCards}>
                                {/* Challenge Card */}
                                <div className={styles.challengeCard}>
                                    <div className={styles.cardBadge}>
                                        <Icon icon="mingcute:warning-fill" />
                                        THE CHALLENGE
                                    </div>
                                    <h3 className={styles.cardTitle}>The 'Lazy Prompt' Problem</h3>
                                    <p className={styles.cardText}>
                                        {t('greenPrompting.overlay.problemText')}
                                    </p>
                                </div>

                                {/* Solution Card */}
                                <div className={styles.solutionCard}>
                                    <div className={styles.cardBadge}>
                                        <Icon icon="mingcute:check-circle-fill" />
                                        THE SOLUTION
                                    </div>
                                    <h3 className={styles.cardTitle}>The Solution</h3>
                                    <p className={styles.cardText}>
                                        {t('greenPrompting.overlay.solutionText')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Full Width CTA */}
                        <button className={styles.fullWidthCta} onClick={handleCtaClick}>
                            <span>USE OPTIMIZED PROMPTS. SAVE ENERGY.</span>
                            <span className={styles.ctaEmoji}>🌱</span>
                            <Icon icon="mingcute:arrow-right-line" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
