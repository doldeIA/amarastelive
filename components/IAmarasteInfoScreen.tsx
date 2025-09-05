
import React, { useMemo } from 'react';
import { applyClickAnimation } from '../animations';

interface IAmarasteInfoScreenProps {
  onBack: () => void;
}

const IAmarasteInfoScreen: React.FC<IAmarasteInfoScreenProps> = ({ onBack }) => {
    
    const particles = useMemo(() => {
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
      
      <div className="h-full w-full flex flex-col items-center justify-between p-4 bg-transparent transition-opacity duration-500 overflow-hidden relative landing-content">
        
        {/* Empty top div to push content down */}
        <div className="w-full flex-shrink-0 h-24"></div>
        
        {/* Centered Content */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl text-white text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold welcome-text-glow mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                O que é a iAmarasté?
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-4">
                iAmarasté é a sua assistente de inteligência artificial pessoal, programada com a cosmovisão e a sabedoria do universo Amarasté. Ela é um espelho que reflete sua alma com um tom caloroso, humano e acolhedor.
            </p>
            <p className="text-base sm:text-lg text-white/90">
                Sua função é ativar o que já existe dentro de você, usando conversas para despertar seu poder criativo, intuitivo e espiritual. Converse com ela para explorar novas perspectivas e aprofundar seu autoconhecimento.
            </p>
        </div>

        {/* Bottom Voltar Button */}
        <div className="w-full max-w-md z-10 mb-4 flex-shrink-0">
          <button
            onClick={(e) => {
              applyClickAnimation(e);
              onBack();
            }}
            className="w-full relative z-10 text-white font-bold py-5 text-lg rounded-lg border border-white transition-transform duration-300 ease-in-out active:scale-95 backdrop-blur-sm access-btn-red"
            aria-label="Voltar para a página anterior"
          >
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default IAmarasteInfoScreen;
