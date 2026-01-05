import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../../data';
import type { ChapterEvent as ChapterEventType } from '../../types';
import './ChapterGuide.css';

const ChapterEvent: React.FC<{ event: ChapterEventType }> = ({ event }) => {
    const [isOpen, setIsOpen] = useState(false);
    // @ts-ignore
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            className={`event-card ${isOpen ? 'open' : ''}`}
            layout
            onClick={() => setIsOpen(!isOpen)}
        >
            <motion.div className="event-header" layout="position">
                <div className="event-thumbnail-mini">
                    <img
                        src={imgError ? 'https://placehold.co/1024x1024/1a1a1a/gold?text=Chapter' : event.thumbnail}
                        alt={event.title}
                        onError={() => setImgError(true)}
                    />
                </div>
                <h4 className="event-title">{event.title}</h4>
                <div className="expand-icon">{isOpen ? '-' : '+'}</div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="event-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <p className="event-desc">{event.description}</p>
                        <blockquote className="event-quote">"{event.quote}"</blockquote>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ChapterGuide: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="chapters" className="section-chapters">
            <div className="container">
                <div className="chapter-header">
                    <h2 className="section-title">The Saga</h2>
                    <div className="chapter-tabs">
                        {chapters.map((chapter, index) => (
                            <button
                                key={chapter.id}
                                className={`tab-btn ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {chapter.title}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="chapter-content"
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="chapter-info">
                        <h3 className="chapter-subtitle">{chapters[activeTab].subtitle}</h3>
                    </div>
                    <div className="events-list">
                        {chapters[activeTab].events.map((event, i) => (
                            <ChapterEvent key={i} event={event} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ChapterGuide;
