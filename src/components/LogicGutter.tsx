import styles from './LogicGutter.module.css';

interface LogicGutterProps {
    transformation: 'new' | 'refactor' | 'bugfix' | 'optimize';
}

const icons: Record<string, React.ReactNode> = {
    new: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
        </svg>
    ),
    refactor: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
    ),
    bugfix: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 9a3 3 0 1 1 6 0" />
            <path d="M12 12v3M8 12h8M8 15h8M6 9V7a6 6 0 0 1 12 0v2M6 15v2a6 6 0 0 0 12 0v-2" />
        </svg>
    ),
    optimize: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
};

const labels: Record<string, string> = {
    new: 'New Feature',
    refactor: 'Refactor',
    bugfix: 'Bug Fix',
    optimize: 'Optimize',
};

export default function LogicGutter({ transformation }: LogicGutterProps) {
    return (
        <div className={styles.gutter}>
            <div className={styles.line} />
            <div className={styles.icon} title={labels[transformation]}>
                {icons[transformation]}
            </div>
            <div className={styles.line} />
        </div>
    );
}
