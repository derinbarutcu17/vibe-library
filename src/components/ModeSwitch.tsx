'use client';

import styles from './ModeSwitch.module.css';

export type Mode = 'build' | 'daily';

interface ModeSwitchProps {
    mode: Mode;
    onModeChange: (mode: Mode) => void;
}

export default function ModeSwitch({ mode, onModeChange }: ModeSwitchProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            className={styles.container}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.switch}>
                <div
                    className={`${styles.pill} ${mode === 'daily' ? styles.right : ''}`}
                />
                <button
                    className={`${styles.option} ${mode === 'build' ? styles.active : ''}`}
                    onClick={() => onModeChange('build')}
                >
                    Build Mode
                </button>
                <button
                    className={`${styles.option} ${mode === 'daily' ? styles.active : ''}`}
                    onClick={() => onModeChange('daily')}
                >
                    Daily Mode
                </button>
            </div>
            <div className={styles.mouseGlow} />
        </div>
    );
}
