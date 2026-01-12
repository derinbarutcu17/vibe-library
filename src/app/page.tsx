'use client';

import { useState, useRef, useCallback } from 'react';
import FrequencyFooter from '@/components/FrequencyFooter';
import PromptShop from '@/components/PromptShop';
import PromptCrafter from '@/components/PromptCrafter';
import ShootingStars from '@/components/ShootingStars';
import GreenPrompting from '@/components/GreenPrompting';
import GalaxyScene from '@/components/galaxy/GalaxyScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './page.module.css';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stickyNavRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCrafterOpen, setIsCrafterOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewGallery = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCraftPrompt = () => {
    setIsCrafterOpen(true);
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
      // Split title into characters
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

      // Animate tagline - use set + to pattern for reliability
      if (taglineRef.current) {
        gsap.set(taglineRef.current, { opacity: 1 }); // Ensure visible
        gsap.fromTo(taglineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.9 }
        );
      }

      // ============ 5. SCROLL-TRIGGERED STICKY NAV ============
      if (heroRef.current && stickyNavRef.current) {
        // Create sticky nav on scroll
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

  // Category pills with magnetic effect
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
      {/* ============ GREEN PROMPTING BADGE ============ */}
      <GreenPrompting />

      {/* ============ STICKY NAV (appears on scroll) ============ */}
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
                <Icon icon={CATEGORY_METADATA[cat.id].icon} style={{ color: CATEGORY_METADATA[cat.id].color }} />
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

              {/* Hero Section */}
              <section className={styles.heroSection} ref={heroRef}>
                {/* Announcement Pill */}
                <div className={styles.announcementPill}>
                  <span className={styles.announcementDot}></span>
                  <span>Prompt Crafter is now live</span>
                </div>

                <h1 className={styles.mainTitle} ref={titleRef}>Vibe Library</h1>
                <p className={styles.tagline} ref={taglineRef}>
                  Master
                  <button
                    onClick={() => handleCategoryClick('general')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['general'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['general'].color }} />
                    Prompt Engineering
                  </button>
                  unlock AI-powered
                  <button
                    onClick={() => handleCategoryClick('coding')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['coding'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['coding'].color }} />
                    Coding
                  </button>
                  patterns, elevate your
                  <button
                    onClick={() => handleCategoryClick('ui-ux')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['ui-ux'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['ui-ux'].color }} />
                    UI/UX
                  </button>
                  designs, generate stunning
                  <button
                    onClick={() => handleCategoryClick('image')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['image'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['image'].color }} />
                    Image
                  </button>
                  assets, master
                  <button
                    onClick={() => handleCategoryClick('problem-solving')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['problem-solving'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['problem-solving'].color }} />
                    Problem Solving
                  </button>
                  and fuel your
                  <button
                    onClick={() => handleCategoryClick('creativity')}
                    className={styles.navPill}
                    onMouseMove={handlePillMouseMove}
                    onMouseLeave={handlePillMouseLeave}
                  >
                    <Icon icon={CATEGORY_METADATA['creativity'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['creativity'].color }} />
                    Creativity
                  </button>
                </p>

                {/* CTA Buttons */}
                <div className={styles.ctaButtons} ref={ctaRef}>
                  <button className={styles.primaryCta} onClick={handleCraftPrompt}>
                    Craft a Prompt
                    <span className={styles.ctaArrow}>→</span>
                  </button>
                  <button className={styles.secondaryCta} onClick={handleViewGallery}>
                    View Gallery
                  </button>
                </div>

              </section>
            </div>
          </div>

          {/* Prompt Shop Section */}
          <section className={styles.shopSection} id="shop">
            <PromptShop initialCategory={selectedCategory} />
          </section>

          <FrequencyFooter />
        </div>

        {/* Prompt Crafter Panel */}
        <div className={`${styles.crafterPanel} ${isCrafterOpen ? styles.crafterVisible : ''}`}>
          <PromptCrafter onClose={handleCloseCrafter} />
        </div>
      </main>
    </>
  );
}
