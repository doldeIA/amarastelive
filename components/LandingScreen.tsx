import React, { useMemo } from 'react';
import { applyClickAnimation } from '../animations';


interface LandingScreenProps {
  onAccess: () => void;
  onAdminAccess: () => void;
  isLoading: boolean;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onAccess, onAdminAccess, isLoading }) => {
    
    const particles = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        const count = isMobile ? 35 : 70;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 7}s`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            backgroundColor: Math.random() > 0.8 ? '#fff' : 'var(--bubble-red)',
        }));
    }, []);

  return (
    <div className="first-page">
      {/* New animated elements */}
      <div className="arcade-scanlines" />
      <div className="arcade-frame">
          <div className="arcade-corner top-left" />
          <div className="arcade-corner top-right" />
          <div className="arcade-corner bottom-left" />
          <div className="arcade-corner bottom-right" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map(p => <div key={p.id} className="pixel-particle" style={p as React.CSSProperties} />)}
      </div>
      
      {/* Main content container for responsive centering and bottom positioning */}
      <div className="h-[85%] w-full flex flex-col items-center justify-between px-4 pb-4 bg-transparent transition-opacity duration-500 overflow-hidden relative landing-content">
        
        {/* Top Triangle Loader */}
        <div className="w-full flex justify-center pt-2.5">
            <button
                onClick={onAdminAccess}
                className="triangle-container"
                aria-label="Acesso de Administrador"
            >
                <svg viewBox="0 0 100 100" className="rot-triangle" role="img" aria-label="Loading indicator">
                    <defs>
                        <linearGradient id="triGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ff3b3b" />
                            <stop offset="100%" stopColor="#ff0000" />
                        </linearGradient>
                    </defs>
                    <polygon points="50,5 95,92 5,92" className="triangle-shape" />
                </svg>
            </button>
        </div>
        
        {/* Centered Logo */}
        <div className="flex-grow flex items-center justify-center w-full">
            
        </div>


        {/* Bottom Acessar Button */}
        <div className="w-full max-w-md z-10 mb-4 flex-shrink-0">
          <button
            onClick={(e) => {
              applyClickAnimation(e);
              onAccess();
            }}
            disabled={isLoading}
            className="w-full relative z-10 text-white font-bold py-5 text-lg rounded-lg border border-red-500/80 transition-transform duration-300 ease-in-out active:scale-95 backdrop-blur-sm access-btn-red"
            aria-label="Acessar conteúdo"
          >
            {isLoading ? 'CARREGANDO...' : 'ACESSAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;