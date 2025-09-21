import React from 'react';
import { applyClickAnimation } from '../animations';

interface MusicasScreenProps {
  onBack: () => void;
}

const identityBackground = (() => {
  const baseUrl = ((import.meta as any)?.env?.BASE_URL as string | undefined) ?? '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}assets/amaraste-identity-background.jpg`;
})();

const MusicasScreen: React.FC<MusicasScreenProps> = ({ onBack }) => {
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
        {particles.map((particle) => (
          <div key={particle.id} className="pixel-particle" style={particle as React.CSSProperties} />
        ))}
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 landing-content">
        <div className="identity-window-wrapper animate-swoop-in">
          <div
            className="identity-window"
            style={{ backgroundImage: `url(${identityBackground})` }}
          >
            <div className="identity-window__content">
              <div className="identity-window__header">
                <span>DJ / COMPOSITOR / PRODUTOR</span>
                <span>DESDE 2011</span>
              </div>
              <div className="identity-window__divider" aria-hidden="true" />
              <h2 className="identity-window__title">Amarasté Live</h2>
              <div className="identity-window__divider" aria-hidden="true" />
              <p className="identity-window__description">
                Amarasté Live é um arquétipo vivo da fusão entre a sombra e a luz. O psytrance é o idioma através do qual essa energia se comunica.
              </p>
              <p className="identity-window__description">
                Criado por Manoel Siqueira em Maceió (AL), o projeto provoca o que há de mais vital em nós: a lembrança da nossa natureza livre, indomável e cósmica.
              </p>
              <span className="identity-window__signature">🌹 Só tem você</span>
            </div>
          </div>

          <button
            onClick={(event) => {
              applyClickAnimation(event);
              onBack();
            }}
            className="identity-window__close-btn"
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
