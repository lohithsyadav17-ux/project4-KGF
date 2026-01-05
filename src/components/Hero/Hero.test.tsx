import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';
import '@testing-library/jest-dom';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
    useScroll: () => ({
        scrollY: { get: () => 0 },
        scrollYProgress: { get: () => 0, onChange: () => { } }
    }),
    useTransform: () => 0,
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock MagneticButton (since it uses ref logic not compatible with simple motion mock sometimes)
vi.mock('../MagneticButton/MagneticButton', () => ({
    default: ({ children }: any) => <div>{children}</div>
}));

describe('Hero Component', () => {
    it('renders the main title', () => {
        render(<Hero />);
        // Use getAll because of potential multiple matches or text split
        const titles = screen.getAllByText(/K.G.F/i);
        expect(titles.length).toBeGreaterThan(0);
    });

    it('renders the chapter number', () => {
        render(<Hero />);
        // Text is split: CHAPTER <span>2</span>
        // Check for 'CHAPTER'
        expect(screen.getByText(/CHAPTER/i)).toBeInTheDocument();
        // Check for '2' specifically in the gold span if needed, or just generally
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders the tagline', () => {
        render(<Hero />);
        expect(screen.getByText(/VIOLENCE, VIOLENCE, VIOLENCE/i)).toBeInTheDocument();
    });

    it('renders action buttons', () => {
        render(<Hero />);
        const enterButton = screen.getByText(/ENTER EMPIRE/i);
        expect(enterButton).toBeInTheDocument();
    });
});
