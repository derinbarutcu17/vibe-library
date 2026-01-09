import styles from './ResultCard.module.css';
import VibeMetrics from './VibeMetrics';

interface ResultCardProps {
    language: string;
    code: string;
    filename?: string;
    metrics: {
        costRatio: string;
        realityScore: number;
        unrealLibs?: string[];
    };
}

// Simple syntax highlighting component to avoid HTML nesting issues
function HighlightedCode({ code }: { code: string }) {
    const lines = code.split('\n');

    return lines.map((line, i) => {
        // We use a more robust way to highlight without nesting tags
        // This is a simplified version of a tokenizer
        const tokens: { type: string; value: string }[] = [];

        // Match patterns in order of priority
        const patterns = [
            { type: 'comment', regex: /\/\/.*$/ },
            { type: 'string', regex: /(['"`])(?:\\.|(?!\1)[^\\])*?\1/ },
            { type: 'keyword', regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|default|async|await|try|catch|throw|new|class|extends|interface|type|implements)\b/ },
            { type: 'number', regex: /\b(\d+(?:\.\d+)?)\b/ },
            { type: 'function', regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/ },
            { type: 'class', regex: /\b([A-Z][a-zA-Z0-9]*)\b(?!\s*\()/ },
        ];

        let remaining = line;
        while (remaining) {
            let match = null;
            let bestPattern = null;

            for (const p of patterns) {
                const m = remaining.match(p.regex);
                if (m && (match === null || m.index! < match.index!)) {
                    match = m;
                    bestPattern = p;
                }
            }

            if (match && bestPattern) {
                // Text before the match
                if (match.index! > 0) {
                    tokens.push({ type: 'text', value: remaining.slice(0, match.index!) });
                }
                // The match itself
                tokens.push({ type: bestPattern.type, value: match[0] });
                // Remaining text
                remaining = remaining.slice(match.index! + match[0].length);
            } else {
                tokens.push({ type: 'text', value: remaining });
                remaining = '';
            }
        }

        return (
            <div key={i} className={styles.line}>
                <span className={styles.lineNumber}>{i + 1}</span>
                <span className={styles.lineContent}>
                    {tokens.map((token, j) => (
                        token.type === 'text'
                            ? <span key={j}>{token.value}</span>
                            : <span key={j} className={`token-${token.type}`}>{token.value}</span>
                    ))}
                </span>
            </div>
        );
    });
}

export default function ResultCard({ language, code, filename, metrics }: ResultCardProps) {
    return (
        <div className={`obsidian-card ${styles.card}`}>
            <VibeMetrics
                costRatio={metrics.costRatio}
                realityScore={metrics.realityScore}
                unrealLibs={metrics.unrealLibs}
            />

            <div className={styles.windowBar}>
                <div className={styles.dots}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                </div>
                {filename && (
                    <span className={styles.filename}>{filename}</span>
                )}
                <span className={styles.language}>{language}</span>
            </div>

            <div className={styles.codeContainer}>
                <pre className={styles.code}>
                    <code>
                        <HighlightedCode code={code} />
                    </code>
                </pre>
            </div>

            <div className={styles.footer}>
                <span className={styles.label}>THE RESULT</span>
            </div>
        </div>
    );
}
