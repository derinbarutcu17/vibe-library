'use client';

import { useState, useEffect } from 'react';
import styles from './PromptShop.module.css';
import PromptProductCard from './PromptProductCard';
import { promptProducts, categories } from '@/data/prompt-products';
import { Icon } from '@iconify/react';

interface PromptShopProps {
    initialCategory?: string;
}

export default function PromptShop({ initialCategory = 'all' }: PromptShopProps) {
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState<'saves' | 'successRate' | 'tokensUsed'>('saves');
    const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

    // Sync with parent when initialCategory changes
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    const filteredProducts = promptProducts
        .filter(p => activeCategory === 'all' || p.category === activeCategory)
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
                            <Icon icon={cat.icon} className={styles.categoryIcon} />
                            <span className={styles.categoryLabel}>{cat.label}</span>
                        </button>
                    ))}
                </div>


            </div>

            {/* Results count */}
            <div className={styles.resultsBar}>
                <span className={styles.resultsCount}>
                    {filteredProducts.length} prompt{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
                <div className={styles.viewToggle}>
                    <span className={styles.viewLabel}>VIEW</span>
                    {[2, 3, 4].map((cols) => (
                        <button
                            key={cols}
                            className={`${styles.viewBtn} ${gridCols === cols ? styles.viewBtnActive : ''}`}
                            onClick={() => setGridCols(cols as 2 | 3 | 4)}
                        >
                            {cols}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div
                className={styles.productGrid}
                style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
                {filteredProducts.map((prompt) => (
                    <PromptProductCard key={prompt.id} prompt={prompt} />
                ))}
            </div>

            {/* Load More */}
            {filteredProducts.length > 0 && (
                <div className={styles.loadMore}>
                    <button className={styles.loadMoreBtn}>
                        Load More Prompts
                    </button>
                </div>
            )}
        </div>
    );
}
