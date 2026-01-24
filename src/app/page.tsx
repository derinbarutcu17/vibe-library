'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FrequencyFooter from '@/components/FrequencyFooter';
import PromptShop from '@/components/PromptShop';
import PromptCrafter from '@/components/PromptCrafter';
import ShootingStars from '@/components/ShootingStars';
import GreenPrompting from '@/components/GreenPrompting';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import GalaxyScene from '@/components/galaxy/GalaxyScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './page.module.css';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';
import { useTranslation } from '@/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stickyNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCrafterOpen, setIsCrafterOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewGallery = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  // ============ MAGNETIC HOVER EFFECT ============
  const handlePillMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const pill = e.currentTarget;
    const rect = pill.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(pill, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handlePillMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const pill = e.currentTarget;
    gsap.to(pill, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  // ============ GSAP ANIMATIONS ============
  useGSAP(() => {
    // Skip animations if crafter is open
    if (isCrafterOpen) return;

    const ctx = gsap.context(() => {
      // ============ 1. TEXT REVEAL ANIMATION ============
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = titleText
          .split('')
          .map(char => char === ' ' ? ' ' : `<span class="${styles.titleChar}">${char}</span>`)
          .join('');

        gsap.from(`.${styles.titleChar}`, {
          y: 100,
          opacity: 0,
          rotationX: -90,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power4.out',
          delay: 0.2,
        });
      }

      if (taglineRef.current) {
        gsap.set(taglineRef.current, { opacity: 1 });
        gsap.fromTo(taglineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.9 }
        );
      }

      // ============ 5. SCROLL-TRIGGERED STICKY NAV ============
      if (heroRef.current && stickyNavRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'bottom top+=100',
          end: 'bottom top',
          onEnter: () => {
            gsap.to(stickyNavRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(stickyNavRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
            });
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isCrafterOpen]);

  const categoryPills = [
    { id: 'general', text: 'Prompt Engineering' },
    { id: 'coding', text: 'Coding' },
    { id: 'ui-ux', text: 'UI/UX' },
    { id: 'image', text: 'Image' },
    { id: 'problem-solving', text: 'Problem Solving' },
    { id: 'creativity', text: 'Creativity' },
  ];

  return (
    <>
      <nav ref={stickyNavRef} className={styles.stickyNav}>
        <div className={styles.stickyNavContent}>
          <span className={styles.stickyLogo}>Vibe Library</span>
          <div className={styles.stickyPills}>
            {categoryPills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={styles.stickyPill}
              >
                <Icon icon={CATEGORY_METADATA[cat.id]?.icon} style={{ color: CATEGORY_METADATA[cat.id]?.color }} />
                {cat.text}
              </button>
            ))}
          </div>
          <button className={styles.stickyCta} onClick={handleCraftPrompt}>
            Craft Prompt
          </button>
        </div>
      </nav>

      <main className={`${styles.main} ${isCrafterOpen ? styles.crafterActive : ''}`} onMouseMove={handleMouseMove}>
        <div className={`${styles.mainContent} ${isCrafterOpen ? styles.slideLeft : ''}`}>
          <div className={styles.heroWrapper}>
            <div className={styles.mainContainer}>
              <GalaxyScene warpMode={isCrafterOpen} />

              <section className={styles.heroSection} ref={heroRef}>
                {/* Header elements move with hero */}
                <GreenPrompting onOpenCrafter={handleCraftPrompt} />

                <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100 }}>
                  <LanguageSwitcher />
                </div>

                <div className={styles.announcementPill}>
                  <span className={styles.announcementDot}></span>
                  <span>{t('hero.announcement')}</span>
                  <span style={{ marginLeft: '0.5rem', opacity: 0.5, fontSize: '0.7rem' }}>v1.2</span>
                </div>

                <h1 className={styles.mainTitle} ref={titleRef}>{t('hero.title')}</h1>
                <p className={styles.tagline} ref={taglineRef}>
                  {t('hero.tagline.master')}
                  <button
                    onClick={() => handleCategoryClick('general')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['general']?.icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['general']?.color }} />
                    {t('categories.general')}
                  </button>
                  {t('hero.tagline.comma1')}
                  <button
                    onClick={() => handleCategoryClick('coding')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['coding']?.icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['coding']?.color }} />
                    {t('categories.coding')}
                  </button>
                  {t('hero.tagline.comma2')}
                  <button
                    onClick={() => handleCategoryClick('finance')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['finance']?.icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['finance']?.color }} />
                    {t('categories.finance')}
                  </button>
                  {t('hero.tagline.comma3')}
                  <button
                    onClick={() => handleCategoryClick('ui-ux')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['ui-ux']?.icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['ui-ux']?.color }} />
                    {t('categories.ui-ux')}
                  </button>
                  {t('hero.tagline.comma4')}
                  <button
                    onClick={() => handleCategoryClick('image')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['image']?.icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['image']?.color }} />
                    {t('categories.image')}
                  </button>
                  {t('hero.tagline.assets')}
                  <button
                    onClick={() => handleCategoryClick('creativity')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['creativity']?.icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['creativity']?.color }} />
                    {t('categories.creativity')}
                  </button>
                </p>

                <div className={styles.ctaButtons} ref={ctaRef}>
                  <button className={styles.primaryCta} onClick={handleCraftPrompt}>
                    {t('hero.ctaPrimary')}
                    <span className={styles.ctaArrow}>→</span>
                  </button>
                  <button className={styles.secondaryCta} onClick={handleViewGallery}>
                    {t('hero.ctaSecondary')}
                  </button>
                </div>
              </section>
            </div>
          </div>

          <section className={styles.shopSection} id="shop">
            <PromptShop initialCategory={selectedCategory} />
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
