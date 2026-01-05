import { useEffect, useRef } from 'react';
import './GoldParticles.css';

const GoldParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="gold-reveal-container" ref={containerRef}>
      <div className="gold-layer">
        <div className="particles-overlay"></div>
      </div>
      <div
        className="coal-layer"
        style={{
          WebkitMaskImage: `radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%)`,
          maskImage: `radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%)`
        }}
      ></div>
    </div>
  );
};

export default GoldParticles;
