'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingNavbar.module.css';

export default function FloatingNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: 'Manifesto', href: '#manifesto' },
        { label: 'Golden Standards', href: '#golden-standards' },
        { label: 'The Shop', href: '#shop' },
        { label: 'Frequency', href: '#footer' },
    ];

    return (
        <>
            <nav className={styles.navWrapper}>
                <div className={styles.navbar}>
                    <div className={styles.left}>
                        <button
                            className={`${styles.menuButton} ${isOpen ? styles.menuButtonActive : ''}`}
                            onClick={toggleMenu}
                            aria-label={isOpen ? "Close Menu" : "Open Menu"}
                        >
                            <span className={styles.menuIcon}></span>
                            {isOpen ? 'Close' : 'Menu'}
                        </button>
                    </div>

                    <div className={styles.center}>
                        <span className={styles.brand}>VIBE LIBRARY</span>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.placeholder}></div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <div className={`${styles.mobileDrawer} ${isOpen ? styles.mobileDrawerOpen : ''}`}>
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={styles.mobileLink}
                        onClick={() => setIsOpen(false)}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </>
    );
}
