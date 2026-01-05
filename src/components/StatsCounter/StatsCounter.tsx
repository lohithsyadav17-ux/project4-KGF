import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsCounter.css';

interface StatItemProps {
    value: string;
    label: string;
    suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = numericValue;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <motion.div
            ref={ref}
            className="stat-item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            <div className="stat-value">
                {value.includes('₹') && '₹'}
                {count}
                {suffix || (value.includes('+') ? '+' : '')}
            </div>
            <div className="stat-label">{label}</div>
        </motion.div>
    );
};

const StatsCounter: React.FC = () => {
    const stats = [
        { value: "₹4000+", label: "Total Box Office", suffix: " Cr" },
        { value: "5000000+", label: "Gold Bars Mined" },
        { value: "2", label: "Blockbuster Chapters" },
        { value: "180+", label: "Release Countries" },
    ];

    return (
        <section id="stats" className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
