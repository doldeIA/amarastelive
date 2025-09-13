

import React, { useState, useEffect, useMemo } from 'react';

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
                ABRAKADABRA AGENCY
            </h1>
            
            <p className="mt-8 text-lg text-white animate-white-neon-flicker" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                @abrakadabragency
            </p>

            <div className="mt-8 w-full flex justify-center">
                <a
                    href="https://api.whatsapp.com/send/?phone=5575933002386&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20agendamento."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grok-red-button font-bold text-lg rounded-full px-12 py-4 animate-fast-intense-glow"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    AGENDAR DATA
                </a>
            </div>
        </div>
    </div>
  );
};

export default BookerScreen;