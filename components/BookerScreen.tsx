

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
                ABRACADABRA AGENCY
            </h1>
            <p className="text-sm text-white/80 mb-10 max-w-xl">
                Ouça o álbum 'Jogos Psíquicos' abaixo ou entre em contato para agendamentos e propostas.
            </p>
            
            <div className="bandcamp-container">
                <iframe 
                    style={{border: 0, width: '100%', height: '120px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/album=3380295254/size=large/bgcol=333333/linkcol=e32929/tracklist=false/artwork=small/transparent=true/" 
                    seamless
                    title="Jogos Psíquicos by Amarasté"
                >
                    <a href="https://amarastelive.bandcamp.com/album/jogos-ps-quicos">Jogos Psíquicos by Amarasté</a>
                </iframe>
            </div>
        </div>
    </div>
  );
};

export default BookerScreen;