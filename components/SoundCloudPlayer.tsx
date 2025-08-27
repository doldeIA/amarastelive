import React, { useState, useEffect } from 'react';
import { applyClickAnimation } from '../App';
import PdfViewerScreen from './PdfViewerScreen';

interface SoundCloudPlayerProps {
  onTalkAboutMusic: () => void;
  onOpenSignUpModal: () => void;
}

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ onTalkAboutMusic, onOpenSignUpModal }) => {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Replicates the responsive logic from PdfViewerScreen to match its width.
      const totalMargin = Math.max(screenWidth * 0.1, 24);
      const calculatedWidth = Math.min(screenWidth - totalMargin, 1024);
      setContainerWidth(calculatedWidth);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const soundCloudEmbedUrl = "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/explicar-a-garrafa&visual=true";
  const youtubeEmbedUrl = "https://www.youtube.com/embed/6A6JHhknJts";

  if (containerWidth === 0) {
    // Avoid rendering with 0 width, which could cause a flash of unstyled content
    return null;
  }

  return (
    <div style={{ width: `${containerWidth}px` }} className="mx-auto my-8">

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
      
      <div className="relative p-1 rounded-lg bg-black neon-border mt-8">
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
      
      <div className="w-full flex flex-col items-center mt-8 px-4">
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onOpenSignUpModal();
          }}
          className="cadastre-btn w-full max-w-lg text-xl py-4"
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