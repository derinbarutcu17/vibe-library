'use client';

import { useState, useMemo, useEffect } from 'react';
import styles from './PromptCrafter.module.css';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA, promptProducts, PromptProduct } from '@/data/prompt-products';
import { useI18n } from '@/i18n';

interface PromptCrafterProps {
    onClose: () => void;
}

export default function PromptCrafter({ onClose }: PromptCrafterProps) {
    const [category, setCategory] = useState('coding');
    const [vision, setVision] = useState('');
    const [context, setContext] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [inspirationOpen, setInspirationOpen] = useState(false);
    const { locale, t } = useI18n();

    // Prevent body scroll when crafter is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const crafterCategories = Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
        id,
        ...meta
    }));

    // Filter templates based on selected category
    const categoryTemplates = useMemo(() => {
        return promptProducts.filter(p => p.category === category);
    }, [category]);

    const handleGenerate = () => {
        const contextLabel = locale === 'tr' ? 'Bağlam' : 'Context';
        const prompt = `${vision}${context ? `\n\n${contextLabel}: ${context}` : ''}`.trim();

        setGeneratedPrompt(prompt);
    };

    const handleTemplateSelect = (template: PromptProduct) => {
        setVision(template.fullPrompt);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt || vision);
    };

    return (
        <div className={styles.crafter}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={onClose}>
                    <Icon icon="mingcute:arrow-left-line" className={styles.backIcon} />
                    <span>{t('common.backToLibrary')}</span>
                </button>

                <div className={styles.logoContainer}>
                    <span className={styles.logoText}>Prompt </span>
                    <span className={styles.logoAccent}>Crafter</span>
                    <span style={{ marginLeft: '0.5rem', opacity: 0.4, fontSize: '0.6rem' }}>v1.3</span>
                </div>

                <div className={styles.headerRight}>
                    <button
                        className={styles.inspirationBtn}
                        onClick={() => setInspirationOpen(!inspirationOpen)}
                    >
                        <Icon icon="mingcute:bulb-line" className={styles.inspirationIcon} />
                        <span>{t('promptCrafter.inspiration')}</span>
                    </button>
                </div>
            </header>

            {/* Category Pills */}
            <nav className={`${styles.categoryNav} ${inspirationOpen ? styles.categoryNavShifted : ''}`}>
                {crafterCategories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`${styles.categoryPill} ${category === cat.id ? styles.activePill : ''}`}
                        onClick={() => {
                            setCategory(cat.id);
                            setInspirationOpen(true); // Auto-open inspiration when category is clicked
                        }}
                    >
                        <Icon icon={cat.icon} className={styles.pillIcon} style={{ color: cat.color }} />
                        {t(`categories.${cat.id}`)}
                    </button>
                ))}
            </nav>

            {/* Main Content Area */}
            <div className={styles.mainWrapper}>
                <main className={`${styles.mainCanvas} ${inspirationOpen ? styles.mainCanvasShifted : ''}`}>
                    {/* Vision Textarea */}
                    <textarea
                        className={styles.visionInput}
                        placeholder={t('promptCrafter.visionPlaceholder')}
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        spellCheck={false}
                    />

                    {/* Context Input */}
                    <div className={styles.contextSection}>
                        <label className={styles.contextLabel}>{t('promptCrafter.contextLabel')}</label>
                        <input
                            type="text"
                            className={styles.contextInput}
                            placeholder={t('promptCrafter.contextPlaceholder')}
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        />
                    </div>

                    {/* Generated Prompt Result */}
                    {generatedPrompt && (
                        <div className={styles.resultSection}>
                            <div className={styles.resultHeader}>
                                <span className={styles.resultLabel}>{t('promptCrafter.resultLabel')}</span>
                                <button className={styles.copyBtn} onClick={handleCopy}>
                                    <Icon icon="mingcute:copy-line" />
                                    {t('promptCrafter.copy')}
                                </button>
                            </div>
                            <textarea
                                className={styles.resultTextarea}
                                value={generatedPrompt}
                                onChange={(e) => setGeneratedPrompt(e.target.value)}
                                rows={8}
                            />
                        </div>
                    )}
                </main>

                {/* Inspiration Sidebar */}
                <aside className={`${styles.sidebar} ${inspirationOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3 className={styles.sidebarTitle}>{t('promptCrafter.inspiration')}</h3>
                        <button className={styles.sidebarClose} onClick={() => setInspirationOpen(false)}>
                            <Icon icon="mingcute:close-line" />
                        </button>
                    </div>

                    <div className={styles.sidebarContent}>
                        {categoryTemplates.length > 0 ? (
                            categoryTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    className={styles.templateCard}
                                    onClick={() => handleTemplateSelect(template)}
                                >
                                    <span
                                        className={styles.templateTag}
                                        style={{ color: CATEGORY_METADATA[category]?.color || '#2563eb' }}
                                    >
                                        {t(`tags.${template.tags[0]}`)?.toUpperCase() || 'TEMPLATE'}
                                    </span>
                                    <h4 className={styles.templateTitle}>
                                        {(locale === 'tr' && template.titleTr) ? template.titleTr : (locale === 'de' && template.titleDe ? template.titleDe : template.title)}
                                    </h4>
                                    <p className={styles.templateDesc}>
                                        {((locale === 'tr' && template.previewTr) ? template.previewTr : (locale === 'de' && template.previewDe ? template.previewDe : template.preview)).slice(0, 80)}...
                                    </p>
                                </button>
                            ))
                        ) : (
                            <p className={styles.noTemplates}>{t('promptCrafter.noTemplates')}</p>
                        )}
                    </div>

                    <div className={styles.sidebarFooter}>
                        <p>{t('promptCrafter.chooseTemplate')}</p>
                    </div>
                </aside>
            </div>

            {/* Floating Generate Button */}
            <div className={`${styles.generateWrapper} ${inspirationOpen ? styles.generateWrapperShifted : ''}`}>
                <button className={styles.generateBtn} onClick={handleGenerate}>
                    <span>{t('common.generatePrompt')}</span>
                    <Icon icon="mingcute:sparkles-2-line" className={styles.generateIcon} />
                </button>
            </div>

            {/* Footer Credit */}
            <div className={styles.crafterFooter}>
                <span>{t('footer.designedBy')} </span>
                <a
                    href="https://www.instagram.com/derinbarutcu17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                >
                    Derin
                </a>
                <span> {locale === 'tr' ? 'ile ❤️' : (locale === 'de' ? 'mit ❤️' : 'with ❤️')}</span>
            </div>
        </div>
    );
}
