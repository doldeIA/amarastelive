import React from 'react';
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
  { theme: 'red', name: "Explicar a Garrafa", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/explicar-a-garrafa&color=%23FF0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'black', name: "Observar", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/observar&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'red', name: "Possibilidades", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/possibilidades-0101011101&color=%23FF0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'black', name: "Virtuality", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/virtuality&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'red', name: "Níveis de Resposta 2020", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/niveis-de-resposta-2020&color=%23FF0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'black', name: "Recomeçar (feat. Gaia)", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/recomecar-feat-gaia&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'red', name: "Coragem", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/coragem&color=%23FF0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'black', name: "Feirademangaio", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/feirademangaio&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
  { theme: 'red', name: "Yourself", url: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/amarastelive/yourself&color=%23FF0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false" },
];

const youtubeVideos = [
  { id: '6A6JHhknJts', title: 'Ansiedade' },
  { id: '2iXyU4WZPIw', title: 'O Começo, o Meio e o Fim' },
  { id: '4XAAx9aPMaM', title: 'Sobre(Existir) XXV' },
  { id: 'vh50NWlWHsk', title: 'Explicar a Garrafa' },
  { id: 'P469PRyF5ys', title: 'Jogos Psíquicos' },
  { id: 's892gD7e2_I', title: 'Magical XXV' },
  { id: 'm7IgwHTMnwE', title: 'Observar' },
];

const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ onTalkAboutMusic, onOpenSignUpModal, onNavigate }) => {

  return (
    <div className="w-full my-8">
      <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
        {/* Logo da marca acima dos players */}
        <div className="w-full flex justify-center my-4">
          <img
            src="/logo.webp"
            alt="Logo Amarasté"
            className="h-20 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="w-full max-w-lg mx-auto my-2 flowing-neon-line animate-flow-rtl"></div>
        
        {/* New SoundCloud Scroller */}
        <div className="my-6 w-full mx-auto media-scroller" tabIndex={0} aria-label="SoundCloud tracks">
            {soundCloudTracks.map(track => (
                <div key={track.name} className="media-scroller-panel h-[166px]">
                    <div className={`media-panel-netflix h-full p-1 ${track.theme === 'black' ? 'media-panel-black-theme' : ''}`}>
                         <iframe
                            title={track.name}
                            width="100%"
                            height="166"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={track.url}
                            className="w-full h-full rounded-sm"
                            loading="lazy"
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
      </div>
      
      <div className="bg-deep-brown py-8 mt-6">
        <div className="media-scroller px-4 sm:px-6 lg:px-8" tabIndex={0} aria-label="YouTube videos">
            {youtubeVideos.map(video => (
                <div key={video.id} className="media-scroller-panel">
                    <div className="youtube-player-wrapper">
                        <div className="iframe-container">
                             <iframe
                                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                                title={`YouTube video player - ${video.title}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                              ></iframe>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
        <div className="w-full flex flex-col items-center justify-center mt-8 gap-4">
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
          <a 
            href="https://api.whatsapp.com/send/?phone=5575933002386&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs"
            aria-label="AGENDAR DATA via WhatsApp"
          >
            <button
                onClick={(e) => {
                  applyClickAnimation(e);
                }}
                className="red-white-btn text-center text-2xl py-6 px-4 whitespace-nowrap trembling-button w-full"
            >
                AGENDAR DATA
            </button>
          </a>
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
      </div>

      <div id="iamaraste" className="bg-deep-brown py-8 mt-6">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
          <div className="iamaraste-box">
            <div className="iamaraste-corner top-left"></div>
            <div className="iamaraste-corner top-right"></div>
            <div className="iamaraste-corner bottom-left"></div>
            <div className="iamaraste-corner bottom-right"></div>
            <p className="text-white/40 font-mono text-sm animate-pulse">Conteúdo iAmarasté em breve...</p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
        <p className="home-copyright mt-8 text-white/70">
          Direitos Autorais © 2025 Amarasté Live
        </p>
      </div>

    </div>
  );
};

export default SoundCloudPlayer;