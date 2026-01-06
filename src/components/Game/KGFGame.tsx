import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import './KGFGame.css';

interface KGFGameProps {
    onClose: () => void;
}

interface GameItem {
    id: number;
    type: 'gold' | 'diamond' | 'dynamite';
    x: number;
    y: number;
}

const GAME_DURATION = 30; // Seconds

const KGFGame: React.FC<KGFGameProps> = ({ onClose }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [items, setItems] = useState<GameItem[]>([]);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [popups, setPopups] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

    // Timer Logic
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>; // Correct type for NodeJS/Browser environments
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameState('gameover');
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    // Spawning Logic
    useEffect(() => {
        let spawnTimer: ReturnType<typeof setInterval>;
        if (gameState === 'playing') {
            spawnTimer = setInterval(() => {
                spawnItem();
            }, 600); // Spawn every 600ms
        }
        return () => clearInterval(spawnTimer);
    }, [gameState]);

    const spawnItem = () => {
        if (!gameAreaRef.current) return;

        const { width, height } = gameAreaRef.current.getBoundingClientRect();
        // Keep within padding
        const x = Math.random() * (width - 80) + 40;
        const y = Math.random() * (height - 80) + 40;

        const types: ('gold' | 'diamond' | 'dynamite')[] = ['gold', 'gold', 'gold', 'diamond', 'dynamite', 'dynamite'];
        const type = types[Math.floor(Math.random() * types.length)];

        const newItem: GameItem = {
            id: Date.now(),
            type,
            x,
            y
        };

        setItems((prev) => [...prev, newItem]);

        // Remove item after 2 seconds if not clicked
        setTimeout(() => {
            setItems((prev) => prev.filter((i) => i.id !== newItem.id));
        }, 2000);
    };

    const handleItemClick = (e: React.MouseEvent, item: GameItem) => {
        e.stopPropagation();

        let points = 0;
        if (item.type === 'gold') points = 10;
        if (item.type === 'diamond') points = 50;
        if (item.type === 'dynamite') points = -20;

        setScore((prev) => Math.max(0, prev + points));

        // Add Floating Text
        const popupId = Date.now();
        setPopups(prev => [...prev, {
            id: popupId,
            x: item.x,
            y: item.y,
            text: points > 0 ? `+${points}` : `${points}`
        }]);

        // Remove text after animation
        setTimeout(() => {
            setPopups(prev => prev.filter(p => p.id !== popupId));
        }, 800);

        setItems((prev) => prev.filter((i) => i.id !== item.id));

        if (item.type === 'dynamite') {
            // Optional: Shake screen or visual feedback
        }
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setItems([]);
        setGameState('playing');
    };

    return createPortal(
        <motion.div
            className="kgf-game-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button className="close-game-btn" onClick={onClose}>&times;</button>

            <div className="game-container">
                <div className="game-header">
                    <div className="score-display">GOLD: {score} KG</div>
                    <div className="timer-display">TIME: {timeLeft}s</div>
                </div>

                <div className="game-area" ref={gameAreaRef}>
                    {gameState === 'start' && (
                        <div className="game-over-screen">
                            <div className="start-screen">
                                <h1>Kolar Gold Rush</h1>
                                <p>Welcome to the Narachi Mines. Collect as much gold and diamonds as you can before time runs out. Avoid the dynamite!</p>

                                <div className="instructions">
                                    <div className="instruction-item">
                                        <span className="instruction-icon">🪙</span>
                                        <span>+10 KG</span>
                                    </div>
                                    <div className="instruction-item">
                                        <span className="instruction-icon">💎</span>
                                        <span>+50 KG</span>
                                    </div>
                                    <div className="instruction-item">
                                        <span className="instruction-icon">🧨</span>
                                        <span>-20 KG</span>
                                    </div>
                                </div>

                                <button className="game-btn" onClick={startGame}>Start Mining</button>
                            </div>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="game-item"
                                    style={{ left: item.x, top: item.y }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={(e) => handleItemClick(e, item)}
                                >
                                    {item.type === 'gold' && '🪙'}
                                    {item.type === 'diamond' && '💎'}
                                    {item.type === 'dynamite' && '🧨'}
                                </motion.div>
                            ))}
                            {popups.map(popup => (
                                <div
                                    key={popup.id}
                                    className="score-pop"
                                    style={{ left: popup.x, top: popup.y - 20 }}
                                >
                                    {popup.text}
                                </div>
                            ))}
                        </AnimatePresence>
                    )}

                    {gameState === 'gameover' && (
                        <div className="game-over-screen">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <h2>SHIFT OVER</h2>
                                <p className="final-score">TOTAL HAUL: {score} KG</p>
                                <div className="game-buttons">
                                    <button className="game-btn" onClick={startGame}>Mine Again</button>
                                    <button className="game-btn" onClick={onClose}>Leave Mines</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>,
        document.body
    );
};

export default KGFGame;
