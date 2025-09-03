import React, { useEffect, useState, useRef } from 'react';
import { applyClickAnimation } from '../animations';
import ActionGrid from './home/ActionGrid';
import SocialMediaScroller from './home/SocialMediaScroller';
import WebpGallery from './WebpGallery';


interface SoundCloudPlayerProps {
  onTalkAboutMusic: () => void;
  onOpenSignUpModal: () => void;
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

const GamifiedUI = () => {
    useEffect(() => {
        const playBtn = document.getElementById('play60') as HTMLButtonElement | null;
        const xpBar = document.getElementById('xpBar') as HTMLDivElement | null;
        
        const handleClick = () => {
            if (!playBtn || playBtn.disabled) return;
            
            playBtn.disabled = true;
            let t = 60;
            playBtn.textContent = `${t}s`;
            
            const interval = setInterval(() => {
                t--;
                if (playBtn) playBtn.textContent = `${t}s`;
                if (t <= 0) {
                    clearInterval(interval);
                    if(playBtn) {
                        playBtn.disabled = false;
                        playBtn.textContent = 'Play 60s Prompt';
                    }
                }
            }, 1000);
            
            if (xpBar) {
              const currentWidth = parseFloat(xpBar.style.width) || 12;
              xpBar.style.width = `${Math.min(100, currentWidth + 36)}%`;
            }
        };

        playBtn?.addEventListener('click', handleClick);

        return () => {
            playBtn?.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <section className="mini-game-ui" id="miniGameUI">
          <div className="session-card">Quick Book — Next slots: <span id="slots">—</span></div>
          <div className="mood-slider">Mood: <input type="range" min="0" max="2" id="moodRange"/></div>
          <button id="play60" className="action-btn">Play 60s Prompt</button>
          <div className="reward-meter"><div className="bar" id="xpBar" style={{width:'12%'}}></div></div>
        </section>
    );
};


const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ onTalkAboutMusic, onOpenSignUpModal }) => {
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

  /* WEBP GALLERY - ADDED BY STUDIO */
  // NOTE: Replace these placeholders with your actual image paths.
  // Ensure you have both .webp and a fallback (.jpg, .png) in your /public folder if one is created.
  const galleryImages = [
    { webp: 'https://placehold.co/1200x675/ff0000/ffffff.webp?text=IMG+1', fallback: 'https://placehold.co/1200x675/ff0000/ffffff.png?text=IMG+1', alt: 'Descrição da Imagem 1' },
    { webp: 'https://placehold.co/1200x675/e41b17/ffffff.webp?text=IMG+2', fallback: 'https://placehold.co/1200x675/e41b17/ffffff.png?text=IMG+2', alt: 'Descrição da Imagem 2' },
    { webp: 'https://placehold.co/1200x675/b22222/ffffff.webp?text=IMG+3', fallback: 'https://placehold.co/1200x675/b22222/ffffff.png?text=IMG+3', alt: 'Descrição da Imagem 3' },
    { webp: 'https://placehold.co/1200x675/7b3f1a/ffffff.webp?text=IMG+4', fallback: 'https://placehold.co/1200x675/7b3f1a/ffffff.png?text=IMG+4', alt: 'Descrição da Imagem 4' },
  ];

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
        <div className="neon-line below-final"></div>
        <GamifiedUI />
      </div>

      <p className="home-copyright mt-8 text-black">
        Direitos Autorais © 2025 Amarasté Live
      </p>

      {/* WEBP GALLERY - ADDED BY STUDIO */}
      <WebpGallery images={galleryImages} />
    </div>
  );
};

export default SoundCloudPlayer;