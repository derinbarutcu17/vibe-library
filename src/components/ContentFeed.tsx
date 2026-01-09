import { ContentSection } from '@/data/content-data';
import PatternCard from './PatternCard';
import styles from './ContentFeed.module.css';

interface ContentFeedProps {
    sections: ContentSection[];
    isBeta?: boolean;
}

export default function ContentFeed({ sections, isBeta }: ContentFeedProps) {
    return (
        <div className={styles.feed}>
            {isBeta && (
                <div className={styles.betaBanner}>
                    <span className={styles.betaIcon}>🧪</span>
                    <span className={styles.betaText}>Exploring new territory</span>
                </div>
            )}

            {sections.map((section) => (
                <section key={section.id} className={styles.section}>
                    <header className={styles.sectionHeader}>
                        <h2 className={styles.headline}>{section.headline}</h2>
                        {section.concept && (
                            <p className={styles.concept}>{section.concept}</p>
                        )}
                    </header>

                    <div className={styles.grid}>
                        {section.cards.map((card) => (
                            <PatternCard key={card.id} card={card} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
