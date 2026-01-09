import { ReactNode } from 'react';
import styles from './StreamLayout.module.css';

interface StreamLayoutProps {
    children: ReactNode;
}

export default function StreamLayout({ children }: StreamLayoutProps) {
    return (
        <main className={styles.stream}>
            <div className={styles.container}>
                {children}
            </div>
        </main>
    );
}
