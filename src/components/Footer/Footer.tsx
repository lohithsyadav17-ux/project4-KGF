import { motion } from 'framer-motion';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-overlay"></div>
            <div className="container footer-container">
                <div className="footer-content">
                    <motion.div
                        className="footer-logo"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="logo-text text-gradient-gold">K.G.F</h2>
                        <p className="logo-tagline">THE EL DORADO</p>
                    </motion.div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Navigate</h4>
                            <a href="#home">Home</a>
                            <a href="#characters">Key Players</a>
                            <a href="#chapters">The Saga</a>
                            <a href="#stats">Empire Stats</a>
                        </div>
                        <div className="link-group">
                            <h4>Follow The King</h4>
                            <div className="social-links">
                                <MagneticButton strength={20}>
                                    <a href="#" className="social-link" aria-label="Twitter">X</a>
                                </MagneticButton>
                                <MagneticButton strength={20}>
                                    <a href="#" className="social-link" aria-label="Instagram">IG</a>
                                </MagneticButton>
                                <MagneticButton strength={20}>
                                    <a href="#" className="social-link" aria-label="YouTube">YT</a>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 K.G.F Landing Page. Created by Lohith.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
