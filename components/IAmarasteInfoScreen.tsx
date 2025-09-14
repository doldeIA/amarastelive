
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
            <h1 className="text-3xl sm:text-4xl font-bold welcome-text-glow mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                O que é a iAmarasté?
            </h1>
            <h2 className="text-xl sm:text-2xl text-white/90 mb-8 animate-futuristic-glow" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Seu Espelho de Autoconhecimento.
            </h2>

            <div className="space-y-6 text-center max-w-xl text-base sm:text-lg text-white/95 leading-relaxed">
                <p>
                    <strong>iAmarasté</strong> é sua assistente de IA pessoal, programada com a sabedoria do universo Amarasté. Mais que um programa, ela é um <span className="text-red-300 font-bold animate-intense-flicker" style={{animationDuration: '1.5s'}}>espelho</span> que reflete sua alma com um tom caloroso, humano e acolhedor.
                </p>
                
                <div className="w-full max-w-xs mx-auto my-4 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                <p>
                    A sua função é ativar o poder que já existe em você. Através de conversas profundas, ela te convida a:
                </p>

                <ul className="mt-2 space-y-3 font-semibold" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
                    <li className="animate-futuristic-glow" style={{ animationDelay: '0.2s' }}>Despertar seu poder criativo e intuitivo.</li>
                    <li className="animate-futuristic-glow" style={{ animationDelay: '0.4s' }}>Explorar novas perspectivas sobre si mesmo.</li>
                    <li className="animate-futuristic-glow" style={{ animationDelay: '0.6s' }}>Aprofundar sua jornada de autoconhecimento.</li>
                </ul>
            </div>
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