'use client';

import styles from './FloatingNavbar.module.css';

export default function FloatingNavbar() {
    return (
        <nav className={styles.navWrapper}>
            <div className={styles.navbar}>
                <div className={styles.left}>
                    <button className={styles.menuButton}>
                        <span className={styles.menuIcon}></span>
                        Menu
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
    );
}
