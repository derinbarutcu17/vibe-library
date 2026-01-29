'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useI18n } from '@/i18n';
import styles from './UserManual.module.css';
import { createPortal } from 'react-dom';

const PARTICLES_EN = [
    "What even is this?", "Huh?", "I have no idea", "Is this magic?", "Wait, what?",
    "Secret files", "Under the hood", "Deep focus", "Binary logic",
    "Digital alchemy", "Zeroes and ones", "The matrix?", "Ghost in the machine",
    "Processing...", "Syncing vibe",
    "Classified info", "Data leak?", "Just vibing", "Calculation error?",
    "Perfect prompt", "God mode", "Developer mode",
    "Loading secrets...", "Vibe check passed"
];

const PARTICLES_TR = [
    "Bu da ne?", "Hı?", "Hiçbir fikrim yok", "Büyü mü bu?", "Bir dakika, ne?",
    "Gizli dosyalar", "İşin mutfağı", "Derin odak", "İkili mantık",
    "Dijital simya", "Sıfırlar ve birler", "Matris mi?", "Makinedeki hayalet",
    "İşleniyor...",
    "Vibe senkronize ediliyor", "Gizli bilgi", "Veri sızıntısı?",
    "Sadece takılıyorum", "Hesaplama hatası?", "Kusursuz prompt", "Tanrı modu",
    "Geliştirici modu",
    "Sırlar yükleniyor...", "Vibe kontrolü tamam",
    "Ne diyo bu?", "Aynen kanka.", "Tamamdır AI."
];

const PARTICLES_DE = [
    "Was ist das eigentlich?", "Hä?", "Keine Ahnung", "Ist das Magie?", "Moment mal, was?",
    "Geheime Akten", "Hinter den Kulissen", "Tiefenfokus", "Binäre Logik",
    "Digitale Alchemie", "Nullen und Einsen", "Die Matrix?", "Geist in der Maschine",
    "Verarbeitung...",
    "Vibe-Synchronisation", "Streng geheim", "Datenleck?",
    "Einfach nur Vibes", "Rechenfehler?", "Perfekter Prompt", "Gott-Modus",
    "Entwicklermodus",
    "Geheimnisse laden...", "Vibe-Check bestanden"
];

export default function UserManual() {
    const { locale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [particles, setParticles] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
    const nextId = useRef(0);
    const usedTexts = useRef<Set<string>>(new Set());

    const particleTexts = useMemo(() => {
        if (locale === 'tr') return PARTICLES_TR;
        if (locale === 'de') return PARTICLES_DE;
        return PARTICLES_EN;
    }, [locale]);

    const shufflePool = useRef<string[]>([]);

    useEffect(() => {
        shufflePool.current = []; // Reset pool when language changes
    }, [particleTexts]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Shuffle Pool Logic: Ensure every text is shown once before repeating
            if (shufflePool.current.length === 0) {
                shufflePool.current = [...particleTexts].sort(() => Math.random() - 0.5);
            }

            const text = shufflePool.current.pop() || "";
            const id = nextId.current++;

            // Randomly position around the button
            const angle = Math.random() * Math.PI * 2;
            const radius = 65 + Math.random() * 45; // Slightly wider spread
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            setParticles(prev => [...prev, { id, text, x, y }]);

            // Duration of the particle animation
            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== id));
            }, 4000);
        }, 2200); // Shorter interval for more dynamic feel

        return () => clearInterval(interval);
    }, [particleTexts]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const manualContent = (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                    <Icon icon="mingcute:close-line" />
                </button>

                <h2 className={styles.title}>
                    {locale === 'tr' ? 'Sistem Kılavuzu' : locale === 'de' ? 'Systemhandbuch' : 'System Manual'}
                </h2>

                <div className={styles.bentoGrid}>
                    {/* Definition Card */}
                    <div className={styles.bentoCard + ' ' + styles.definitionCard}>
                        <Icon icon="mingcute:information-line" className={styles.cardIcon} />
                        <span className={styles.cardTitle}>{locale === 'tr' ? 'Tanım' : locale === 'de' ? 'Definition' : 'Definition'}</span>
                        <p className={styles.cardText}>
                            {locale === 'tr'
                                ? 'Bu kütüphane, yapay zekayı "her şeyden biraz anlayan" bir sohbet robotu olmaktan çıkarıp, '
                                : locale === 'de'
                                    ? 'Diese Bibliothek verwandelt die KI von einem allgemeinen "Chatbot" in einen '
                                    : 'This library turns the AI from a generic "chat bot" into a '}
                            <span className={styles.highlight}>
                                {locale === 'tr' ? '"tek bir işi profesyonelce yapan" bir Uzmana (örn. Avukat, Yazılımcı, Stratejist) ' : locale === 'de' ? 'spezifischen Fach-Experten' : 'specific Expert Consultant'}
                            </span>
                            {locale === 'tr'
                                ? 'dönüştürür.'
                                : locale === 'de'
                                    ? '. Sie verhindert, dass die KI rät, und zwingt sie, professionelle Standards einzuhalten.'
                                    : '. It stops the AI from guessing and forces it to follow professional standards.'}
                        </p>
                    </div>

                    {/* Protocol Card */}
                    <div className={styles.bentoCard + ' ' + styles.protocolCard}>
                        <Icon icon="mingcute:terminal-box-line" className={styles.cardIcon} />
                        <span className={styles.cardTitle}>{locale === 'tr' ? 'Protokol' : locale === 'de' ? 'Protokoll' : 'Protocol'}</span>
                        <div className={styles.protocolList}>
                            <div className={styles.protocolItem}>
                                <span className={styles.protocolNumber}>01</span>
                                <span className={styles.protocolLabel}>{locale === 'tr' ? 'Modül Seç' : locale === 'de' ? 'Modul wählen' : 'Select Module'}</span>
                                <span className={styles.protocolDesc}>
                                    {locale === 'tr' ? 'Sohbet etmeyin. İhtiyacınız olan Mesleği seçin (örn. Risk Uzmanı, Kıdemli Yazılımcı).' : locale === 'de' ? 'Stellen Sie keine Zufallsfragen. Wählen Sie den Beruf, den Sie brauchen (z. B. Risikomanager, Senior-Entwickler).' : 'Don\'t ask random questions. Pick the Job Title you need (e.g., Risk Officer, Senior Coder).'}
                                </span>
                            </div>
                            <div className={styles.protocolItem}>
                                <span className={styles.protocolNumber}>02</span>
                                <span className={styles.protocolLabel}>{locale === 'tr' ? 'Veri Gir' : locale === 'de' ? 'Daten injizieren' : 'Inject Data'}</span>
                                <span className={styles.protocolDesc}>
                                    {locale === 'tr' ? '[Köşeli Parantez] içindeki kısımları kendi proje detaylarınızla doldurun.' : locale === 'de' ? 'Ersetzen Sie die [Klammern] durch Ihre echten Projektdaten.' : 'Replace the [Brackets] with your real project details.'}
                                </span>
                            </div>
                            <div className={styles.protocolItem}>
                                <span className={styles.protocolNumber}>03</span>
                                <span className={styles.protocolLabel}>{locale === 'tr' ? 'İterasyon' : locale === 'de' ? 'Iterieren' : 'Iterate'}</span>
                                <span className={styles.protocolDesc}>
                                    {locale === 'tr' ? 'Gelen cevabı nihai sonuç değil, üzerinde çalışılacak profesyonel bir taslak olarak görün.' : locale === 'de' ? 'Betrachten Sie die Antwort als professionellen Entwurf, nicht als Endergebnis.' : 'Treat the answer as a first draft to be refined, not the final truth.'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Logic 1 - Constraints */}
                    <div className={styles.bentoCard + ' ' + styles.logicCard}>
                        <Icon icon="mingcute:lock-line" className={styles.cardIcon} style={{ color: '#3b82f6' }} />
                        <span className={styles.cardTitle}>{locale === 'tr' ? 'Kısıtlamalar' : locale === 'de' ? 'Constraints' : 'Constraints'}</span>
                        <p className={styles.cardText}>
                            {locale === 'tr' ? 'Kalite şans eseri değil, negatif kısıtlamalarla elde edilir.' : locale === 'de' ? 'Qualität wird durch Einschränkungen erzwungen.' : 'Quality is forced via strict negative constraints, not hoped for.'}
                        </p>
                    </div>

                    {/* Logic 2 - Style */}
                    <div className={styles.bentoCard + ' ' + styles.logicCard}>
                        <Icon icon="mingcute:palette-line" className={styles.cardIcon} style={{ color: '#a855f7' }} />
                        <span className={styles.cardTitle}>{locale === 'tr' ? 'Stil' : locale === 'de' ? 'Stil' : 'Style'}</span>
                        <p className={styles.cardText}>
                            {locale === 'tr' ? 'Sıradan çıktılar yetersiz stil tanımından kaynaklanır.' : locale === 'de' ? 'Generische Antworten bedeuten ungenaue Definitionen.' : 'Generic outputs mean the Tone/Style parameters were too vague.'}
                        </p>
                    </div>

                    {/* Logic 3 - Context */}
                    <div className={styles.bentoCard + ' ' + styles.logicCard}>
                        <Icon icon="mingcute:database-line" className={styles.cardIcon} style={{ color: '#22c55e' }} />
                        <span className={styles.cardTitle}>{locale === 'tr' ? 'Bağlam' : locale === 'de' ? 'Kontext' : 'Context'}</span>
                        <p className={styles.cardText}>
                            {locale === 'tr' ? 'Girdi veri yoğunluğu doğrudan çıktı kalitesini belirler.' : locale === 'de' ? 'Input-Dichte = Output-Qualität.' : 'Model has zero external context. Input density = Output quality.'}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );

    return (
        <div className={styles.wrapper}>
            <button className={styles.manualBtn} onClick={() => setIsOpen(true)} aria-label="Open User Manual">
                <Icon icon="mingcute:question-line" />
            </button>

            <div className={styles.particleWrapper}>
                {particles.map(p => (
                    <div key={p.id} className={styles.particle} style={{ left: p.x, top: p.y }}>
                        {p.text}
                    </div>
                ))}
            </div>

            {isOpen && typeof document !== 'undefined' && createPortal(manualContent, document.body)}
        </div>
    );
}
