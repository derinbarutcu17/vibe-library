'use client';

import styles from './FrequencyFooter.module.css';

export default function FrequencyFooter() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.status}>
                    System Operational. Archive Updated {currentDate}.
                </p>
                <p className={styles.credit}>
                    <span className={styles.comment}>// Designed by </span>
                    <a href="#" className={styles.link}>Derin</a>
                </p>
            </div>
        </footer>
    );
}
