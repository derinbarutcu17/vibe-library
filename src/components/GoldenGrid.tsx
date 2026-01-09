import { GoldenStandard } from '@/data/types';
import GoldenCard from './GoldenCard';
import styles from './GoldenGrid.module.css';

interface GoldenGridProps {
    standards: GoldenStandard[];
}

export default function GoldenGrid({ standards }: GoldenGridProps) {
    return (
        <section id="golden-standards" className={styles.section}>
            <header className={styles.header}>
                <span className={styles.overline}>THE HALL OF FAME</span>
                <h2 className={styles.title}>Golden Standards</h2>
                <p className={styles.description}>
                    Foundational prompt patterns that every vibe coder should know.
                    Click any card to copy the pattern.
                </p>
            </header>

            <div className={styles.grid}>
                {standards.map(standard => (
                    <GoldenCard key={standard.id} standard={standard} />
                ))}
            </div>
        </section>
    );
}
