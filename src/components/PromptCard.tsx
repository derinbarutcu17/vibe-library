'use client';

import styles from './PromptCard.module.css';

interface PromptCardProps {
    text: string;
    magicWords: string[];
    model: string;
    tokens: number;
}

export default function PromptCard({ text, magicWords, model, tokens }: PromptCardProps) {
    const highlightMagicWords = (inputText: string, words: string[]) => {
        let result = inputText;
        words.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            result = result.replace(regex, `<mark class="${styles.highlight}">$1</mark>`);
        });
        return result;
    };

    return (
        <div className={styles.promptCard}>
            <div className={styles.header}>
                <span className={styles.label}>PROMPT</span>
                <span className={styles.model}>{model}</span>
            </div>
            <p
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: highlightMagicWords(text, magicWords) }}
            />

        </div>
    );
}
