import React from 'react';
import PdfViewerScreen from './PdfViewerScreen';
import { applyClickAnimation } from '../App';

interface SoundCloudPlayerProps {
  onTalkAboutMusic: () => void;
  onOpenSignUpModal: () => void;
}

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ onTalkAboutMusic, onOpenSignUpModal }) => {
  const soundCloudEmbedUrl = "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/explicar-a-garrafa&visual=true";
  const youtubeEmbedUrl = "https://www.youtube.com/embed/6A6JHhknJts";

  return (
    <div className="w-full max-w-[1000px] mx-auto mb-8 px-2">

      <div className="relative p-1 rounded-lg bg-black neon-border">
        <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <iframe
              title="Explicar a Garrafa"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={soundCloudEmbedUrl}
              className="absolute top-0 left-0 w-full h-full touch-none"
            />
        </div>
      </div>
      
      <div className="glow-line mt-2 mb-2" />
      
      <PdfViewerScreen 
        pageKey="home2" 
        fallbackPath="/home2.pdf" 
        noPadding 
      />
      
      {/* New YouTube Player for "Ansiedade" */}
      <div className="relative p-1 rounded-lg bg-black neon-border mt-6">
        <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={youtubeEmbedUrl}
            title="YouTube video player - Ansiedade"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
      
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onOpenSignUpModal();
          }}
          className="cadastre-btn"
          aria-label="Cadastre-se"
        >
          Cadastre-se
        </button>
      </div>

      <p className="home-copyright mt-4">
        Direitos Autorais © 2025 Amarasté Live
      </p>
    </div>
  );
};

export default SoundCloudPlayer;
