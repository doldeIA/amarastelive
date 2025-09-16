import React from 'react';
import { applyClickAnimation } from '../animations';

interface MusicasScreenProps {
  onBack: () => void;
}

const MusicasScreen: React.FC<MusicasScreenProps> = ({ onBack }) => {
  // Re-using the background effect from landing/info screens
  const particles = React.useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const count = isMobile ? 25 : 50;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 5}s`,
      width: `${1 + Math.random() * 2}px`,
      height: `${1 + Math.random() * 2}px`,
      backgroundColor: Math.random() > 0.8 ? '#fff' : 'var(--bubble-red)',
    }));
  }, []);

  return (
    <div className="first-page">
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
      
      <div className="h-full w-full flex flex-col items-center justify-end p-4 bg-transparent transition-opacity duration-500 overflow-y-auto relative landing-content">
        {/* Main content can be empty or have a title if needed, but for now it's just the back button */}
        
        <div className="w-full max-w-md z-10 mb-8 flex-shrink-0">
          <button
            onClick={(e) => {
              applyClickAnimation(e);
              onBack();
            }}
            className="w-full relative z-10 text-white font-semibold py-3 text-base rounded-lg border border-white/50 transition-colors hover:bg-white/10 chat-pulse-glow"
            aria-label="Voltar para a página anterior"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicasScreen;
