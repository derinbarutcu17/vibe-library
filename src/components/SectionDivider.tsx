import styles from './SectionDivider.module.css';

interface SectionDividerProps {
    id: string;
    title: string;
    icon: 'circle' | 'triangle' | 'square' | 'diamond';
}

export default function SectionDivider({ id, title, icon }: SectionDividerProps) {
    const iconElement = {
        circle: <span className={styles.circle} />,
        triangle: <span className={styles.triangle} />,
        square: <span className={styles.square} />,
        diamond: <span className={styles.diamond} />,
    };

    return (
        <div id={id} className={styles.divider}>
            <div className={styles.line} />
            <div className={styles.badge}>
                {iconElement[icon]}
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.line} />
        </div>
    );
}
