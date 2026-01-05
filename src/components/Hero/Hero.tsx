import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Hero.css';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section id="home" className="hero" ref={containerRef}>
            <motion.div
                style={{ y, scale, opacity }}
                className="hero-background"
                onMouseMove={(e) => {
                    const { left, top } = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - top}px`);
                }}
            >
                {/* Base Dark Layer */}
                <div className="hero-image-layer base-layer" style={{ backgroundImage: `url(/assets/hero-rocky.png)` }}></div>

                {/* Reveal Layer (Gold/Lit) */}
                <div className="hero-image-layer reveal-layer" style={{ backgroundImage: `url(/assets/hero-rocky.png)` }}></div>

                <div className="hero-noise"></div>
            </motion.div>

            <div className="hero-overlay"></div>

            <div className="hero-content container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="hero-tagline"
                >
                    <span className="line-accent"></span>
                    "Violence, Violence, Violence..."
                    <span className="line-accent"></span>
                </motion.div>

                <motion.div className="title-wrapper">
                    <motion.h1
                        className="hero-title"
                        initial={{ scale: 0.8, opacity: 0, letterSpacing: '2em', filter: 'blur(20px)' }}
                        animate={{ scale: 1, opacity: 1, letterSpacing: '0.1em', filter: 'blur(0px)' }}
                        transition={{
                            duration: 1.8,
                            ease: [0.16, 1, 0.3, 1], // Cinematic ease-out
                            delay: 0.2
                        }}
                    >
                        <span className="gold-text-reveal">K.G.F</span>
                    </motion.h1>

                    <motion.div
                        className="hero-chapter"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        CHAPTER <span className="text-gold">2</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="title-subtitle"
                    initial={{ opacity: 0, letterSpacing: '1em' }}
                    animate={{ opacity: 1, letterSpacing: '0.5em' }}
                    transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                >
                    THE EL DORADO
                </motion.div>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.2 }}
                >
                    Witness the rise of a king in the Kolar Gold Fields. <br />
                    The legend of <span className="text-gold">Rocky Bhai</span> continues.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                >
                    <MagneticButton>
                        <motion.button
                            whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(255,215,0)" }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary gold-glow"
                            onClick={() => document.getElementById('character-section')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Enter Empire
                        </motion.button>
                    </MagneticButton>
                    <MagneticButton>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-secondary"
                            onClick={() => window.open('https://youtu.be/Qah9sSIXJqk', '_blank')}
                        >
                            <span>Watch Trailer</span>
                        </motion.button>
                    </MagneticButton>
                </motion.div>
            </div>

            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>Scroll to Explore</span>
            </motion.div>
        </section>
    );
};

export default Hero;
