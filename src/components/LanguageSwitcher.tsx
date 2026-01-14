'use client';

import { useI18n, Locale } from '@/i18n';
import styles from './LanguageSwitcher.module.css';
import { Icon } from '@iconify/react';

const localeFlags: Record<Locale, string> = {
    en: '🇬🇧',
    tr: '🇹🇷',
    de: '🇩🇪',
};

const localeNames: Record<Locale, string> = {
    en: 'EN',
    tr: 'TR',
    de: 'DE',
};

export default function LanguageSwitcher() {
    const { locale, setLocale, t } = useI18n();

    const locales: Locale[] = ['en', 'tr', 'de'];

    return (
        <div className={styles.switcher}>
            <Icon icon="mingcute:translate-2-line" className={styles.icon} />
            <div className={styles.options}>
                {locales.map((loc) => (
                    <button
                        key={loc}
                        className={`${styles.option} ${locale === loc ? styles.active : ''}`}
                        onClick={() => setLocale(loc)}
                        title={t(`languageSwitcher.${loc}`)}
                    >
                        <span className={styles.flag}>{localeFlags[loc]}</span>
                        <span className={styles.code}>{localeNames[loc]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
