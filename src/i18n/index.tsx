'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Import translations
import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';

export type Locale = 'en' | 'tr' | 'de';

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

const translations: Record<Locale, Translations> = { en, tr, de };

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'vibe-library-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved locale on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (savedLocale && translations[savedLocale]) {
            setLocaleState(savedLocale);
        }
        setIsHydrated(true);
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
    }, []);

    // Translation function - supports nested keys like "hero.title"
    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let value: TranslationValue = translations[locale];

        for (const k of keys) {
            if (typeof value === 'object' && value !== null && k in value) {
                value = value[k];
            } else {
                // Fallback to English if key not found
                let fallback: TranslationValue = translations['en'];
                for (const fk of keys) {
                    if (typeof fallback === 'object' && fallback !== null && fk in fallback) {
                        fallback = fallback[fk];
                    } else {
                        return key; // Return key if not found in fallback either
                    }
                }
                return typeof fallback === 'string' ? fallback : key;
            }
        }

        return typeof value === 'string' ? value : key;
    }, [locale]);

    // Prevent hydration mismatch by showing English until hydrated
    if (!isHydrated) {
        return (
            <I18nContext.Provider value={{ locale: 'en', setLocale, t }}>
                {children}
            </I18nContext.Provider>
        );
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

export function useTranslation() {
    const { t } = useI18n();
    return { t };
}
