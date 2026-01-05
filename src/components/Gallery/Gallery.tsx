import { motion } from 'framer-motion';
import './Gallery.css';

// Cinematic Concept Art generated for KGF Theme
const galleryImages = [
    { id: 1, src: '/assets/gallery/mine.png', alt: 'The Gold Mines of Narachi' },
    { id: 2, src: '/assets/gallery/rocky.png', alt: 'Rocky at the Gates' },
    { id: 3, src: '/assets/gallery/hammer.png', alt: 'The Hammer of Power' },
    { id: 4, src: '/assets/gallery/factory.png', alt: 'Industrial Nightmare' },
];

const Gallery: React.FC = () => {
    return (
        <section className="section-gallery">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    Visual Archive
                </motion.h2>

                <div className="gallery-grid">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            className="gallery-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <img src={img.src} alt={img.alt} loading="lazy" />
                            <div className="gallery-overlay">
                                <span className="gallery-icon">+</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
