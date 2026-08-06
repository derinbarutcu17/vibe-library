'use client';

import { useTranslation } from '@/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './TopNav.module.css';

export interface TopNavProps {
    isCrafterOpen: boolean;
    onCraft: () => void;
}

function TopNav({
    isCrafterOpen,
    onCraft,
}: TopNavProps) {
    const { t } = useTranslation();

    if (isCrafterOpen) return null;

    return (
        <nav className={styles.nav} aria-label="Primary navigation">
            <div className={styles.mainRowInner}>
                <div className={styles.actions}>
                    <LanguageSwitcher />
                    <button className={styles.craftButton} type="button" onClick={onCraft}>
                        <span className={styles.craftLabel}>{t('hero.ctaPrimary')}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default TopNav;
