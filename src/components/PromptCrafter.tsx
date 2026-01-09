'use client';

import { useState } from 'react';
import styles from './PromptCrafter.module.css';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';

interface PromptCrafterProps {
    onClose: () => void;
}

export default function PromptCrafter({ onClose }: PromptCrafterProps) {
    const [category, setCategory] = useState('coding');
    const [goal, setGoal] = useState('');
    const [context, setContext] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const crafterCategories = Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
        id,
        ...meta
    }));

    const handleGenerate = () => {
        // Simple prompt generation logic
        const prompt = `Act as an expert in ${category}. ${goal ? `My goal is: ${goal}.` : ''} ${context ? `Context: ${context}` : ''} Provide a detailed, actionable response.`;
        setGeneratedPrompt(prompt);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt);
    };

    return (
        <div className={styles.crafter}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={onClose}>
                    <Icon icon="mingcute:arrow-left-line" className={styles.backIcon} />
                    <span>Back to Home</span>
                </button>
                <div className={styles.logoBadge}>
                    <span className={styles.logoText}>Prompt Crafter</span>
                </div>
            </div>

            <div className={styles.content}>
                {/* Category Selection */}
                <div className={styles.section}>
                    <label className={styles.label}>Category</label>
                    <div className={styles.categoryGrid}>
                        {crafterCategories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryBtn} ${category === cat.id ? styles.active : ''}`}
                                onClick={() => setCategory(cat.id)}
                            >
                                <Icon icon={cat.icon} className={styles.categoryIcon} />
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Goal Input */}
                <div className={styles.section}>
                    <label className={styles.label} htmlFor="prompt-goal">What do you want to achieve?</label>
                    <textarea
                        id="prompt-goal"
                        name="goal"
                        className={styles.textarea}
                        placeholder="e.g., Refactor my React component to use hooks..."
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        rows={3}
                    />
                </div>

                {/* Context Input */}
                <div className={styles.section}>
                    <label className={styles.label} htmlFor="prompt-context">Additional Context (optional)</label>
                    <textarea
                        id="prompt-context"
                        name="context"
                        className={styles.textarea}
                        placeholder="Any specific requirements, constraints, or preferences..."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={2}
                    />
                </div>

                {/* Generate Button */}
                <button className={styles.generateBtn} onClick={handleGenerate}>
                    Generate Prompt
                </button>

                {/* Generated Prompt */}
                {generatedPrompt && (
                    <div className={styles.resultSection}>
                        <div className={styles.resultHeader}>
                            <span className={styles.resultLabel}>Your Crafted Prompt</span>
                            <button className={styles.copyBtn} onClick={handleCopy}>
                                Copy
                            </button>
                        </div>
                        <div className={styles.result}>
                            {generatedPrompt}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
