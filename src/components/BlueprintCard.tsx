'use client';

import { useState } from 'react';
import { BlueprintTemplate } from '@/data/types';
import styles from './BlueprintCard.module.css';

interface BlueprintCardProps {
    template: BlueprintTemplate;
}

export default function BlueprintCard({ template }: BlueprintCardProps) {
    const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(template.template);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Parse template to highlight slots
    const renderTemplate = () => {
        const parts = template.template.split(/(\[.*?\])/g);

        return parts.map((part, i) => {
            const slotMatch = part.match(/\[(.*?)\]/);
            if (slotMatch) {
                const slotName = slotMatch[1];
                const slot = template.slots.find(s => s.name === slotName);
                const isHovered = hoveredSlot === slotName;

                return (
                    <span
                        key={i}
                        className={`hollow-pill ${styles.slot} ${isHovered ? styles.slotHovered : ''}`}
                        onMouseEnter={() => setHoveredSlot(slotName)}
                        onMouseLeave={() => setHoveredSlot(null)}
                    >
                        {part}
                        {isHovered && slot && (
                            <span className={styles.ghostText}>{slot.example}</span>
                        )}
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className={`obsidian-card ${styles.card}`}>
            <header className={styles.header}>
                <span className={`${styles.category} cat-${template.category}`}>
                    Blueprint
                </span>
                <h3 className={styles.name}>{template.name}</h3>
                <p className={styles.description}>{template.description}</p>
            </header>

            <div className={styles.templateContainer}>
                <p className={styles.template}>
                    {renderTemplate()}
                </p>
            </div>

            <div className={styles.slots}>
                <span className={styles.slotsLabel}>VARIABLES</span>
                <div className={styles.slotsList}>
                    {template.slots.map((slot) => (
                        <div
                            key={slot.name}
                            className={`${styles.slotInfo} ${hoveredSlot === slot.name ? styles.slotInfoActive : ''}`}
                        >
                            <code className={styles.slotName}>{slot.name}</code>
                            <span className={styles.slotHint}>{slot.hint}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                onClick={handleCopy}
            >
                {copied ? (
                    <>
                        <span className={styles.copyIcon}>✓</span>
                        Pattern Acquired
                    </>
                ) : (
                    <>
                        <span className={styles.copyIcon}>⎘</span>
                        Copy Pattern
                    </>
                )}
                {copied && <span className={styles.scanLine} />}
            </button>
        </div>
    );
}
