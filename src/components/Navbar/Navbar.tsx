import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Characters', href: '#characters' },
        { name: 'Chapters', href: '#chapters' },
        { name: 'Stats', href: '#stats' },
    ];

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled glass-panel-heavy' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="nav-container container">
                <div className="nav-logo">
                    <span className="logo-text">K.G.F</span>
                </div>

                <div className="nav-links desktop">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            whileHover={{ scale: 1.1, color: "var(--color-gold-300)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <MagneticButton>
                        <motion.button
                            className="nav-cta"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 215, 0, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enter Empire
                        </motion.button>
                    </MagneticButton>
                </div>

                <div
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu glass-panel-heavy"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            className="mobile-cta"
                            whileTap={{ scale: 0.95 }}
                        >
                            Enter Empire
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
