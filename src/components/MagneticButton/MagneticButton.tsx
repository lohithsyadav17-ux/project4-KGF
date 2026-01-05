import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './MagneticButton.css';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number; // How strong the magnetic pull is (default: 30)
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    onClick,
    strength = 30
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // map range based on strength
        setPosition({ x: (x / width) * strength, y: (y / height) * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`magnetic-wrapper ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
