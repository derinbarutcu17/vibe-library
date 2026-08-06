'use client';

import { useEffect, useRef, useState } from 'react';

const CHUNK = 8;
const TICK_MS = 12;

/**
 * Fast typing reveal. `active` starts the effect; flips back reset it.
 * Respects prefers-reduced-motion (instantly shows full text).
 */
export function useTypewriter(text: string, active: boolean): {
    typed: string;
    isTyping: boolean;
} {
    const [typed, setTyped] = useState('');
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!active) {
            setTyped('');
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setTyped(text);
            return;
        }
        let i = 0;
        timerRef.current = setInterval(() => {
            i += CHUNK;
            setTyped(text.slice(0, i));
            if (i >= text.length && timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }, TICK_MS);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [active, text]);

    return { typed, isTyping: active && typed.length < text.length };
}
