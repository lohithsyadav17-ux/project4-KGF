import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { characters } from '../../data';
import type { Character } from '../../types';
import './CharacterCard.css';

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
    // @ts-ignore
    const [imgError, setImgError] = useState(false);

    // 3D Tilt Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="card-container"
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="card-inner">
                {/* Front Side */}
                <div className="card-front">
                    <div className="image-wrapper">
                        <img
                            src={imgError ? 'https://placehold.co/1024x1024/1a1a1a/gold?text=KGF' : character.image}
                            alt={character.name}
                            className="card-image"
                            onError={() => setImgError(true)}
                        />
                        <div className="card-overlay"></div>
                        <div className="card-shine"></div>
                    </div>
                    <div className="card-info">
                        <h3 className="card-name text-gradient-gold">{character.name}</h3>
                        <p className="card-role text-gold">{character.role}</p>
                    </div>
                </div>

                {/* Back Side (Reveal on Hover/Flip logic handled via CSS or state if needed, but keeping CSS hover for now with 3D) */}
                <div className="card-back glass-panel">
                    <h3 className="back-name font-cinzel">{character.name}</h3>
                    <div className="separator-gold"></div>
                    <p className="back-quote">"{character.quote}"</p>
                    <p className="back-description">{character.description}</p>
                    <div className="back-powers">
                        {character.powers.map((power: string, i: number) => (
                            <span key={i} className="power-tag">{power}</span>
                        ))}
                    </div>
                    <div className="back-chapter">Chapter {character.chapter}</div>
                </div>
            </div>
        </motion.div>
    );
};

const CharacterSection: React.FC = () => {
    return (
        <section id="characters" className="section-characters">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    Key Players
                </motion.h2>

                <div className="characters-grid">
                    {characters.map((char) => (
                        <CharacterCard key={char.id} character={char} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CharacterSection;
