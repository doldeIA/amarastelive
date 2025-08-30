import React from 'react';
import { applyClickAnimation } from '../animations';

interface SoundCloudPlayerProps {
  onTalkAboutMusic: () => void;
  onOpenSignUpModal: () => void;
}

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ onTalkAboutMusic, onOpenSignUpModal }) => {
  // The color #A13500 matches the app's primary theme color. Options are set for a cleaner look.
  const soundCloudEmbedUrl = "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/explicar-a-garrafa&color=%23A13500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true";
  const youtubeEmbedUrl = "https://www.youtube.com/embed/6A6JHhknJts";

  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 sm:px-0">

      <div className="relative p-1 rounded-lg bg-black">
        <iframe
          title="Explicar a Garrafa"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={soundCloudEmbedUrl}
          className="w-full rounded-lg"
        />
      </div>

      <div className="w-full flex items-stretch justify-center gap-2 mt-6">
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onOpenSignUpModal();
          }}
          className="red-white-btn flex-1 text-center text-2xl py-6 px-4 whitespace-nowrap trembling-button"
          aria-label="Cadastro"
        >
          Cadastro
        </button>
        <button
          onClick={(e) => applyClickAnimation(e)}
          className="red-white-btn flex-1 text-center text-2xl py-6 px-4 whitespace-nowrap trembling-button"
          aria-label="Loja"
        >
          Loja
        </button>
        <button
          onClick={(e) => applyClickAnimation(e)}
          className="red-white-btn flex-1 text-center text-2xl py-6 px-4 whitespace-nowrap trembling-button"
          aria-label="Tribus"
        >
          Tribus
        </button>
        <button
          onClick={(e) => applyClickAnimation(e)}
          className="red-white-btn flex-1 text-center text-2xl py-6 px-4 whitespace-nowrap trembling-button"
          aria-label="Agenda"
        >
          Agenda
        </button>
      </div>
      
      <div 
        className="my-8 w-full mx-auto p-1 rounded-lg bg-black/50 border border-white/20"
        aria-label="Amarasté Instagram feed"
        tabIndex={0}
      >
        <iframe
          src="https://www.instagram.com/amarastelive/embed"
          className="w-full h-[500px] border-0 rounded-md bg-white"
          title="Amarasté Instagram feed"
          allowTransparency={true}
          allow="encrypted-media"
          scrolling="yes"
        ></iframe>
      </div>

      <div className="relative p-1 rounded-lg bg-black mt-6">
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
      
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onOpenSignUpModal();
          }}
          className="cadastre-btn text-xl py-5 px-10 dynamic-pulse-button"
          aria-label="Cadastre-se"
        >
          Cadastre-se
        </button>
      </div>

      <p className="home-copyright mt-8">
        Direitos Autorais © 2025 Amarasté Live
      </p>
    </div>
  );
};

export default SoundCloudPlayer;