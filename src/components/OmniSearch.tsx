'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './OmniSearch.module.css';

interface FilterChip {
    id: string;
    label: string;
    type: 'language' | 'vibe' | 'model';
    color: string;
}

const filterChips: FilterChip[] = [
    { id: 'typescript', label: 'TypeScript', type: 'language', color: '#3178C6' },
    { id: 'javascript', label: 'JavaScript', type: 'language', color: '#F7DF1E' },
    { id: 'css', label: 'CSS', type: 'language', color: '#264de4' },
    { id: 'python', label: 'Python', type: 'language', color: '#3776AB' },
    { id: 'brutalist', label: 'Brutalist', type: 'vibe', color: '#FF5555' },
    { id: 'minimal', label: 'Minimal', type: 'vibe', color: '#EDEDED' },
    { id: 'glass', label: 'Glassmorphism', type: 'vibe', color: '#88C0D0' },
    { id: 'claude', label: 'Claude 3.5', type: 'model', color: '#D97757' },
    { id: 'gpt4', label: 'GPT-4o', type: 'model', color: '#10A37F' },
];

interface OmniSearchProps {
    isOpen: boolean;
    onClose: () => void;
    onFilterSelect: (filters: string[]) => void;
}

export default function OmniSearch({ isOpen, onClose, onFilterSelect }: OmniSearchProps) {
    const [query, setQuery] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredChips = filterChips.filter(chip =>
        chip.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        setFocusedIndex(0);
    }, [query]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(i => Math.min(i + 1, filteredChips.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(i => Math.max(i - 1, 0));
                break;
            case 'Enter':
                if (filteredChips[focusedIndex]) {
                    toggleFilter(filteredChips[focusedIndex].id);
                }
                break;
        }
    }, [focusedIndex, filteredChips, onClose]);

    const toggleFilter = (id: string) => {
        setSelectedFilters(prev => {
            const newFilters = prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id];
            onFilterSelect(newFilters);
            return newFilters;
        });
    };

    const handleApply = () => {
        onFilterSelect(selectedFilters);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.lens} onClick={e => e.stopPropagation()}>
                <div className={styles.crosshairs}>
                    <span className={styles.crosshairH} />
                    <span className={styles.crosshairV} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search patterns..."
                    autoComplete="off"
                />

                <div className={styles.chips}>
                    {filteredChips.map((chip, index) => (
                        <button
                            key={chip.id}
                            className={`${styles.chip} ${focusedIndex === index ? styles.focused : ''
                                } ${selectedFilters.includes(chip.id) ? styles.selected : ''}`}
                            onClick={() => toggleFilter(chip.id)}
                            style={{ '--chip-color': chip.color } as React.CSSProperties}
                        >
                            <span className={styles.chipDot} />
                            <span className={styles.chipLabel}>{chip.label}</span>
                            <span className={styles.chipType}>{chip.type}</span>
                        </button>
                    ))}
                </div>

                {selectedFilters.length > 0 && (
                    <div className={styles.actions}>
                        <button className={styles.clearButton} onClick={() => setSelectedFilters([])}>
                            Clear All
                        </button>
                        <button className={styles.applyButton} onClick={handleApply}>
                            Apply Filters ({selectedFilters.length})
                        </button>
                    </div>
                )}

                <div className={styles.hint}>
                    <kbd>↑↓</kbd> Navigate <kbd>Enter</kbd> Select <kbd>Esc</kbd> Close
                </div>
            </div>
        </div>
    );
}
