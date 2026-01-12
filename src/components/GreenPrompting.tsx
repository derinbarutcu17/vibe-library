'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './GreenPrompting.module.css';
import { Icon } from '@iconify/react';

export default function GreenPrompting() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const badgeRef = useRef<HTMLDivElement>(null);

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
                    <p className={styles.leafHeadline}>Vibe Library is a more<br /><span>Eco-friendly</span> way to use AI!</p>
                    <button className={styles.learnMore}>Click to learn more →</button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <Icon icon="mingcute:close-line" />
                        </button>

                        <div className={styles.overlayHeader}>
                            <Icon icon="mingcute:leaf-fill" className={styles.overlayLeaf} />
                            <h2>Green Prompting</h2>
                            <p className={styles.subtitle}>Efficiency is Eco-Friendly</p>
                        </div>

                        <div className={styles.overlayBody}>
                            <p className={styles.intro}>
                                We often forget that "the cloud" runs on physical, power-hungry hardware.
                                Every prompt triggers massive computations on energy-intensive GPUs.
                            </p>

                            <div className={styles.problemSection}>
                                <h3><Icon icon="mingcute:alert-line" /> The "Lazy Prompt" Problem</h3>
                                <p>
                                    Typing a vague prompt and spending 10 turns asking the AI to "fix it" isn't just frustrating—it's <strong>wasteful</strong>.
                                    This trial-and-error loop multiplies the energy cost of a single task by 10x.
                                </p>
                            </div>

                            <div className={styles.solutionSection}>
                                <h3><Icon icon="mingcute:check-circle-line" /> The Solution</h3>
                                <p>
                                    The Vibe Library focuses on <strong>"One-Shot" success</strong>. By using optimized templates
                                    (with context and logic built-in), you get the right result on the first try,
                                    reducing "inference churn" and saving energy.
                                </p>
                            </div>

                            <div className={styles.statsSection}>
                                <h3><Icon icon="mingcute:chart-bar-line" /> The Science</h3>
                                <div className={styles.statsGrid}>
                                    <div className={styles.statCard}>
                                        <span className={styles.statNumber}>10-50x</span>
                                        <span className={styles.statLabel}>More Energy</span>
                                        <p>A single LLM query consumes 10 to 50 times more energy than a standard Google search.</p>
                                        <cite>Frontiers in Communication</cite>
                                    </div>
                                    <div className={styles.statCard}>
                                        <span className={styles.statNumber}>1 📱</span>
                                        <span className={styles.statLabel}>Smartphone Charge</span>
                                        <p>Generating one image or complex response can consume as much energy as charging a smartphone.</p>
                                        <cite>Carnegie Mellon / Hugging Face</cite>
                                    </div>
                                    <div className={styles.statCard}>
                                        <span className={styles.statNumber}>32x</span>
                                        <span className={styles.statLabel}>Carbon Footprint</span>
                                        <p>Inefficient workflows that rely on constant re-prompting can increase the carbon footprint of a task by 32x.</p>
                                        <cite>LLM-Assisted Code Study</cite>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.overlayFooter}>
                            <p>Use optimized prompts. Save energy. <span>🌱</span></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
