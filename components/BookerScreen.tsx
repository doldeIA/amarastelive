
import React, { useState, useEffect, useMemo } from 'react';
import { applyClickAnimation } from '../animations';

const SparklesBackground: React.FC = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const sparkles = useMemo(() => {
        if (dimensions.width === 0) return [];
        return Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 2.5 + 1; // 1px to 3.5px
            const windX = (Math.random() - 0.5) * dimensions.width * 1.2;
            const windY = (Math.random() - 0.5) * dimensions.height * 1.2;
            return {
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${10 + Math.random() * 15}s`, // 10s to 25s
                animationDelay: `${Math.random() * 20}s`,
                '--wind-x': `${windX}px`,
                '--wind-y': `${windY}px`,
            };
        });
    }, [dimensions]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {sparkles.map(style => (
                <div key={style.id} className="cosmic-sparkle" style={style as React.CSSProperties} />
            ))}
        </div>
    );
};

const BookerScreen: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white pt-24 pb-12 relative overflow-hidden">
        <SparklesBackground />
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold pt-4 pb-3 text-white welcome-text-glow" style={{ fontFamily: "'Playfair Display', serif" }}>
                ABRACADABRA AGENCY
            </h1>
            <p className="text-sm text-white/80 mb-10 max-w-xl">
                Entre em contato para agendamentos e propostas.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=5575933002386&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => applyClickAnimation(e)}
              className="w-full max-w-md text-center grok-red-button font-bold text-2xl py-5 px-10 rounded-lg shadow-lg animate-subtle-red-pulse"
              aria-label="Agendar via WhatsApp"
            >
              <span className="animate-white-neon-flicker">AGENDAR</span>
            </a>
        </div>
    </div>
  );
};

export default BookerScreen;