
import React, { useEffect, useState, useRef } from 'react';
import { applyClickAnimation } from '../animations';
import ActionGrid from './home/ActionGrid';
import SocialMediaScroller from './home/SocialMediaScroller';
import { Screen } from '../types';


interface SoundCloudPlayerProps {
  onTalkAboutMusic: () => void;
  onOpenSignUpModal: () => void;
  onNavigate: (screen: Screen) => void;
}

const soundCloudTracks = [
  { name: "Explicar a Garrafa", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/explicar-a-garrafa&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Observar", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/observar&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Possibilidades", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/possibilidades-0101011101&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Virtuality", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/virtuality&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Níveis de Resposta 2020", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/niveis-de-resposta-2020&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Recomeçar (feat. Gaia)", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/recomecar-feat-gaia&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Coragem", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/coragem&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Feirademangaio", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/feirademangaio&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Yourself", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/yourself&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
];

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ onTalkAboutMusic, onOpenSignUpModal, onNavigate }) => {
  const youtubeEmbedUrl = "https://www.youtube-nocookie.com/embed/6A6JHhknJts";
  const [isYoutubeVisible, setIsYoutubeVisible] = useState(false);
  const youtubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsYoutubeVisible(true);
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: '100px' }
    );

    if (youtubeRef.current) {
        observer.observe(youtubeRef.current);
    }

    return () => {
        if (youtubeRef.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(youtubeRef.current);
        }
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 sm:px-0">
      

      <div className="w-full max-w-lg mx-auto my-2 flowing-neon-line animate-flow-rtl"></div>
      
      {/* New SoundCloud Scroller */}
      <div className="my-6 w-full mx-auto media-scroller" tabIndex={0} aria-label="SoundCloud tracks">
          {soundCloudTracks.map(track => (
              <div key={track.name} className="media-scroller-panel h-[166px]">
                  <div className="media-panel-netflix h-full p-1">
                       <iframe
                          title={track.name}
                          width="100%"
                          height="166"
                          scrolling="no"
                          frameBorder="no"
                          allow="autoplay"
                          src={track.url}
                          className="w-full h-full rounded-sm"
                        />
                  </div>
              </div>
          ))}
      </div>


      <ActionGrid 
        onTalkAboutMusic={onTalkAboutMusic} 
        onOpenSignUpModal={onOpenSignUpModal}
      />
      
      <div className="w-full max-w-lg mx-auto my-6 flowing-neon-line animate-flow-rtl"></div>
      
      <SocialMediaScroller />
      
      <div className="ansiedade-decor-wrapper" ref={youtubeRef}>
          <div className="ans-ball ans-ball-left" aria-hidden="true"></div>
          <div className="ans-ball ans-ball-right" aria-hidden="true"></div>
          <div className="youtube-circle-container">
            {isYoutubeVisible ? (
              <iframe
                src={youtubeEmbedUrl}
                title="YouTube video player - Ansiedade"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <p className="text-white/50 text-xs animate-pulse">Carregando vídeo...</p>
              </div>
            )}
          </div>
      </div>
      
      <div className="w-full flex flex-col items-center justify-center mt-8 gap-4 px-4 sm:px-0">
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onOpenSignUpModal();
          }}
          className="cadastre-btn text-xl py-5 px-10 dynamic-pulse-button w-full max-w-xs"
          aria-label="Cadastre-se"
        >
          Cadastre-se
        </button>
        <div className="w-full max-w-xs my-2 flowing-neon-line animate-flow-ltr"></div>
        <button
            onClick={(e) => {
              applyClickAnimation(e);
            }}
            className="red-white-btn text-center text-2xl py-6 px-4 whitespace-nowrap trembling-button w-full max-w-xs"
            aria-label="AGENDAR DATA"
          >
            AGENDAR DATA
        </button>
        <div className="w-full max-w-xs my-2 flowing-neon-line animate-flow-rtl"></div>
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onNavigate('iamarasteInfo');
          }}
          className="cadastre-btn text-xl py-5 px-10 dynamic-pulse-button w-full max-w-xs"
          aria-label="O que é a iAmarasté?"
        >
          O que é a iAmarasté?
        </button>
      </div>

      <p className="home-copyright mt-8 text-black">
        Direitos Autorais © 2025 Amarasté Live
      </p>

    </div>
  );
};

export default SoundCloudPlayer;
