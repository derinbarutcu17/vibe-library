'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import FrequencyFooter from '@/components/FrequencyFooter';
import PromptShop from '@/components/PromptShop';
import PromptCrafter from '@/components/PromptCrafter';
import { ThinkingOrb } from 'thinking-orbs';
import styles from './page.module.css';
import { useTranslation } from '@/i18n';

export default function Home() {
  const router = useRouter();

  const { t } = useTranslation();

  const [isCrafterOpen, setIsCrafterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleCraftPrompt = () => {
    // On mobile, navigate to dedicated crafter page
    if (isMobile) {
      router.push('/crafter');
    } else {
      // On desktop, open sliding panel
      setIsCrafterOpen(true);
    }
  };

  const handleCloseCrafter = () => {
    setIsCrafterOpen(false);
  };

  return (
    <>
      <TopNav
        isCrafterOpen={isCrafterOpen}
        onCraft={handleCraftPrompt}
      />

      <main className={`${styles.main} ${isCrafterOpen ? styles.crafterActive : ''}`}>
        <div className={styles.mainContent}>
          <section className={styles.landing}>
            <div className={styles.landingTitleRow}>
              <span className={styles.orbWrap}>
                <ThinkingOrb state="connecting" size={64} />
              </span>
              <h1 className={styles.landingTitle}>{t('hero.title')}</h1>
            </div>
            <p className={styles.landingText}>
              {t('hero.landing')}
            </p>
          </section>

          <section className={styles.shopSection} id="shop">
            <PromptShop initialCategory="all" />
          </section>

          <FrequencyFooter />
        </div>

        <div className={`${styles.crafterPanel} ${isCrafterOpen ? styles.crafterVisible : ''}`}>
          <PromptCrafter onClose={handleCloseCrafter} />
        </div>
      </main>
    </>
  );
}
