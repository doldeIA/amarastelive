import React, { useEffect } from 'react';
import { applyClickAnimation } from '../animations';
import ActionGrid from './home/ActionGrid';
import SocialMediaScroller from './home/SocialMediaScroller';


interface SoundCloudPlayerProps {
  onTalkAboutMusic: () => void;
  onOpenSignUpModal: () => void;
}

const soundCloudTracks = [
  { name: "Explicar a Garrafa", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/explicar-a-garrafa&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Observar", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/observar&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Possibilidades", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/possibilidades-0101011101&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
  { name: "Virtuality", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/virtuality&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true" },
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
      
      <div className="youtube-circle-container">
          <iframe
            src={youtubeEmbedUrl}
            title="YouTube video player - Ansiedade"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
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

      <p className="home-copyright mt-8">
        Direitos Autorais © 2025 Amarasté Live
      </p>
    </div>
  );
};

export default SoundCloudPlayer;