'use client';

import { useDeferredValue, useEffect, useState } from 'react';
import styles from './PromptShop.module.css';
import PromptProductCard from './PromptProductCard';
import { promptProducts, categories, CATEGORY_METADATA, type PromptProduct } from '@/data/prompt-products';
import { Icon } from '@iconify/react';
import { useI18n } from '@/i18n';
import { useTypewriter } from '@/hooks/useTypewriter';

interface PromptShopProps {
    initialCategory?: string;
}

function normalizeSearchText(value: string) {
    return value
        .toLowerCase()
        .replace(/[`*_#:[\](){},.!?;"'/-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function PromptListRow({ prompt }: { prompt: PromptProduct }) {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);
    const { locale, t } = useI18n();
    const meta = CATEGORY_METADATA[prompt.category];

    const preview =
        locale === 'tr' && prompt.previewTr
            ? prompt.previewTr
            : locale === 'de' && prompt.previewDe
                ? prompt.previewDe
                : prompt.preview;

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { typed, isTyping } = useTypewriter(prompt.fullPrompt, hovered);

    return (
        <div
            className={`${styles.listRow} ${hovered ? styles.listRowHovered : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.listRowMain}>
                <Icon icon={meta.icon} className={styles.listRowIcon} style={{ color: meta.color }} />
                <div className={styles.listRowBody}>
                    <span className={styles.listRowTitle}>{prompt.title}</span>
                    <span className={styles.listRowPreview}>{preview}</span>
                </div>
                <button
                    type="button"
                    className={styles.listRowCopy}
                    onClick={handleCopy}
                    aria-label={copied ? t('common.copied') : t('common.copy')}
                >
                    <Icon icon={copied ? 'mingcute:check-line' : 'mingcute:copy-2-line'} />
                </button>
            </div>
            {hovered && (
                <pre className={styles.listRowPrompt}>
                    {typed}
                    {isTyping && <span className={styles.listRowCaret} aria-hidden="true" />}
                </pre>
            )}
        </div>
    );
}

export default function PromptShop({ initialCategory = 'all' }: PromptShopProps) {
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const sortBy: 'saves' | 'successRate' | 'tokensUsed' = 'saves';
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const { t } = useI18n();

    // Sync with parent when initialCategory changes
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    const searchTerms = normalizeSearchText(deferredSearchQuery)
        .split(' ')
        .filter(Boolean);

    const filteredProducts = promptProducts
        .filter((product) => {
            if (activeCategory !== 'all' && product.category !== activeCategory) {
                return false;
            }

            if (searchTerms.length === 0) {
                return true;
            }

            const searchableContent = normalizeSearchText([
                product.title,
                product.titleTr,
                product.titleDe,
                product.preview,
                product.previewTr,
                product.previewDe,
                product.fullPrompt,
                product.whyItWorks,
                product.tags.join(' '),
                product.category,
            ].filter(Boolean).join(' '));

            return searchTerms.every(term => searchableContent.includes(term));
        })
        .sort((a, b) => {
            if (sortBy === 'saves') return b.saves - a.saves;
            if (sortBy === 'successRate') return b.successRate - a.successRate;
            return a.tokensUsed - b.tokensUsed;
        });

    return (
        <div className={styles.shop}>
            {/* Category Filter Bar */}
            <div className={styles.filterBar}>
                <div className={styles.categories}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <Icon icon={cat.icon} className={styles.categoryIcon} style={{ color: CATEGORY_METADATA[cat.id]?.color }} />
                            <span className={styles.categoryLabel}>{t(`categories.${cat.id}`)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <div className={styles.resultsBar}>
                <div className={styles.searchGroup}>
                    <label htmlFor="prompt-search" className={styles.searchLabel}>
                        {t('promptShop.searchLabel') || 'Search prompts'}
                    </label>
                    <div className={styles.searchInputWrap}>
                        <Icon icon="mingcute:search-line" className={styles.searchIcon} />
                        <input
                            id="prompt-search"
                            name="prompt-search"
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className={styles.searchInput}
                            placeholder={t('promptShop.searchPlaceholder') || 'Search titles, definitions, tags, and full prompts'}
                            autoComplete="off"
                            spellCheck={false}
                            aria-describedby="prompt-search-results"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className={styles.clearSearchBtn}
                                onClick={() => setSearchQuery('')}
                                aria-label={t('promptShop.clearSearch') || 'Clear search'}
                            >
                                <Icon icon="mingcute:close-line" />
                            </button>
                        )}
                    </div>
                </div>
                <span id="prompt-search-results" className={styles.resultsCount}>
                    {filteredProducts.length} {t('promptShop.found')}
                    {searchTerms.length > 0 ? ` · "${searchQuery.trim()}"` : ''}
                </span>
                <div className={styles.viewToggle}>
                    <span className={styles.viewLabel}>{t('promptShop.view') || 'VIEW'}</span>
                    <button
                        type="button"
                        className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                        onClick={() => setViewMode('grid')}
                        aria-label="Grid view"
                    >
                        <Icon icon="mingcute:grid-2-line" />
                    </button>
                    <button
                        type="button"
                        className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                        onClick={() => setViewMode('list')}
                        aria-label="List view"
                    >
                        <Icon icon="mingcute:list-line" />
                    </button>
                </div>
            </div>

            {/* Product Grid / List */}
            {viewMode === 'grid' ? (
                <div className={styles.productGrid}>
                    {filteredProducts.map((prompt) => (
                        <PromptProductCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            ) : (
                <div className={styles.listView}>
                    {filteredProducts.map((prompt) => (
                        <PromptListRow key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            )}

            {filteredProducts.length === 0 && (
                <div className={styles.emptyState}>
                    <p className={styles.emptyTitle}>{t('promptShop.noResultsTitle') || 'No prompts matched that search'}</p>
                    <p className={styles.emptyText}>
                        {t('promptShop.noResultsText') || 'Try a broader word, remove one term, or switch categories.'}
                    </p>
                </div>
            )}

            {/* Load More Removed per optimization request */}
        </div>
    );
}
