'use client';

import { useState, useRef } from 'react';
import FrequencyFooter from '@/components/FrequencyFooter';
import PromptShop from '@/components/PromptShop';
import PromptCrafter from '@/components/PromptCrafter';
import ShootingStars from '@/components/ShootingStars';
import GalaxyScene from '@/components/galaxy/GalaxyScene'; // Import the new scene
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './page.module.css';
import { Icon } from '@iconify/react';
import { CATEGORY_METADATA } from '@/data/prompt-products';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCrafterOpen, setIsCrafterOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Smooth scroll to shop section
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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate normalized mouse position (-1 to 1)
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  useGSAP(() => {
    // Parallax effect
    gsap.to('.parallax-layer', {
      x: (i, target) => mousePos.x * target.dataset.speed * 20,
      y: (i, target) => mousePos.y * target.dataset.speed * 20,
      duration: 1,
      ease: 'power2.out'
    });
  }, { scope: heroRef, dependencies: [mousePos] });

  return (
    <>
      <main className={`${styles.main} ${isCrafterOpen ? styles.crafterActive : ''}`} onMouseMove={handleMouseMove}>
        {/* Main Content - slides left when crafter opens */}
        <div className={`${styles.mainContent} ${isCrafterOpen ? styles.slideLeft : ''}`}>
          <div className={styles.heroWrapper}>
            <div className={styles.mainContainer}>
              {/* Background Decor */}
              {/* Background Decor */}
              {/* Background Decor */}
              <GalaxyScene warpMode={isCrafterOpen} />

              {/* Hero Section */}
              <section className={styles.heroSection} ref={heroRef}>
                {/* Announcement Pill */}
                <div className={styles.announcementPill}>
                  <span className={styles.announcementDot}></span>
                  <span>Prompt Crafter is now live</span>
                </div>

                <h1 className={styles.mainTitle}>Vibe Library</h1>
                <p className={styles.tagline}>
                  Unlock your potential with AI-powered
                  <button onClick={() => handleCategoryClick('coding')} className={styles.navPill}>
                    <Icon icon={CATEGORY_METADATA['coding'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['coding'].color }} />
                    Coding
                  </button>
                  patterns, elevate your
                  <button onClick={() => handleCategoryClick('ui-ux')} className={styles.navPill}>
                    <Icon icon={CATEGORY_METADATA['ui-ux'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['ui-ux'].color }} />
                    UI/UX
                  </button>
                  designs, generate stunning
                  <button onClick={() => handleCategoryClick('image')} className={styles.navPill}>
                    <Icon icon={CATEGORY_METADATA['image'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['image'].color }} />
                    Image
                  </button>
                  assets, master
                  <button onClick={() => handleCategoryClick('problem-solving')} className={styles.navPill}>
                    <Icon icon={CATEGORY_METADATA['problem-solving'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['problem-solving'].color }} />
                    Problem Solving
                  </button>
                  frameworks, and fuel your
                  <button onClick={() => handleCategoryClick('creativity')} className={styles.navPill}>
                    <Icon icon={CATEGORY_METADATA['creativity'].icon} className={styles.pillIcon} style={{ color: CATEGORY_METADATA['creativity'].color }} />
                    Creativity
                  </button>
                </p>

                {/* CTA Buttons */}
                <div className={styles.ctaButtons}>
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

        {/* Prompt Crafter - slides in from right */}
        <div className={`${styles.crafterPanel} ${isCrafterOpen ? styles.crafterVisible : ''}`}>
          <PromptCrafter onClose={handleCloseCrafter} />
        </div>
      </main>
    </>
  );
}
