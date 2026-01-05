import { useState } from 'react';
import './FireEmbers.css';

const generateEmbers = () => Array.from({ length: 20 }).map(() => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`
}));

const FireEmbers: React.FC = () => {
    const [embers] = useState(generateEmbers);

    return (
        <div className="fire-embers-container">
            {embers.map((style, i) => (
                <div
                    key={i}
                    className="ember"
                    style={style}
                ></div>
            ))}
        </div>
    );
};

export default FireEmbers;
