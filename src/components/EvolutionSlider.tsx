'use client';

import { useState, useRef, useCallback } from 'react';
import { EvolutionStudy } from '@/data/types';
import styles from './EvolutionSlider.module.css';

interface EvolutionSliderProps {
    study: EvolutionStudy;
}

export default function EvolutionSlider({ study }: EvolutionSliderProps) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMouseDown = useCallback(() => {
        isDragging.current = true;
    }, []);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percentage);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percentage);
    }, []);

    const isAfter = position >= 50;

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={`${styles.category} cat-${study.category}`}>
                    Evolution Study
                </span>
                <h2 className={styles.title}>{study.title}</h2>
            </header>

            <div
                ref={containerRef}
                className={styles.sliderContainer}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
            >
                {/* Before State */}
                <div
                    className={styles.beforePane}
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    <div className={styles.promptPane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.stateLabel}>DRIFT</span>
                            <span className={styles.stateSubtitle}>Vague Prompt</span>
                        </div>
                        <div className={styles.promptText}>
                            {study.before.prompt}
                        </div>
                        <div className={styles.issuesList}>
                            {study.before.issues.map((issue, i) => (
                                <span key={i} className={styles.issue}>⚠ {issue}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.codePane}>
                        <pre className={styles.code}>
                            <code>{study.before.code}</code>
                        </pre>
                    </div>
                </div>

                {/* After State */}
                <div
                    className={styles.afterPane}
                    style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                >
                    <div className={styles.promptPane}>
                        <div className={styles.paneHeader}>
                            <span className={`${styles.stateLabel} ${styles.locked}`}>LOCK</span>
                            <span className={styles.stateSubtitle}>Precise Prompt</span>
                        </div>
                        <div className={styles.promptText}>
                            {study.after.prompt}
                        </div>
                        <div className={styles.improvementsList}>
                            {study.after.improvements.map((imp, i) => (
                                <span key={i} className={styles.improvement}>✓ {imp}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.codePane}>
                        <pre className={styles.code}>
                            <code>{study.after.code}</code>
                        </pre>
                    </div>
                </div>

                {/* The Handle */}
                <div
                    className={styles.handle}
                    style={{ left: `${position}%` }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                >
                    <div className={styles.handleBar}>
                        <div className={styles.handleGrip}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
            </div>

            {/* Insight */}
            <div className={styles.insight}>
                <svg className={styles.insightIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p className={styles.insightText}>{study.insight}</p>
            </div>
        </article>
    );
}
