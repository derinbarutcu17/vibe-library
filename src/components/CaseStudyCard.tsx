import { CaseStudy } from '@/data/types';
import PromptCard from './PromptCard';
import ResultCard from './ResultCard';
import LogicGutter from './LogicGutter';
import styles from './CaseStudyCard.module.css';

interface CaseStudyCardProps {
    study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={`${styles.category} cat-${study.category}`}>
                    {study.category}
                </span>
                <h2 className={styles.title}>{study.title}</h2>
                <p className={styles.description}>{study.description}</p>
            </header>

            <div className={styles.content}>
                <div className={styles.promptColumn}>
                    <PromptCard
                        text={study.prompt.text}
                        magicWords={study.prompt.magicWords}
                        model={study.model}
                        tokens={study.tokens}
                    />
                </div>

                <LogicGutter transformation={study.transformation} />

                <div className={styles.resultColumn}>
                    <ResultCard
                        language={study.result.language}
                        code={study.result.code}
                        filename={study.result.filename}
                        metrics={study.metrics}
                    />
                </div>
            </div>
        </article>
    );
}
