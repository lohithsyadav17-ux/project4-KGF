import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 800); // Slight delay after 100% before unmounting
                    return 100;
                }
                return prev + Math.random() * 5; // Random increment for realism
            });
        }, 100);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="loading-content">
                <motion.h1
                    initial={{ opacity: 0, letterSpacing: '20px' }}
                    animate={{ opacity: 1, letterSpacing: '5px' }}
                    transition={{ duration: 1.5 }}
                    className="loading-title"
                >
                    K<span className="gold-text">.</span>G<span className="gold-text">.</span>F
                </motion.h1>

                <div className="loading-bar-container">
                    <motion.div
                        className="loading-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <motion.p
                    className="loading-text"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    ENTERING THE EMPIRE... {Math.min(100, Math.round(progress))}%
                </motion.p>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
