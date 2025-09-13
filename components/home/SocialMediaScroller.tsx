

import React from 'react';

const socialFeeds = {
    instagram: "https://www.instagram.com/amarastelive/embed",
    spotify: "https://open.spotify.com/embed/artist/3407XfslidAhQKTIaFW24m?utm_source=generator&theme=0",
    threads: "https://www.threads.net/@amarastelive",
};

const SocialMediaScroller: React.FC = () => (
    <div 
      className="my-8 w-full mx-auto media-scroller"
      tabIndex={0}
      aria-label="Social media feeds"
    >
      {/* Instagram Panel */}
      <div className="media-scroller-panel h-[450px] sm:h-[500px]">
        <div className="media-panel-netflix h-full">
          <iframe
            src={socialFeeds.instagram}
            className="w-full h-full border-0 bg-white"
            title="Amarasté Instagram feed"
            allowTransparency={true}
            allow="encrypted-media"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Spotify Panel */}
      <div className="media-scroller-panel h-[450px] sm:h-[500px]">
         <div className="media-panel-netflix h-full">
            <iframe
              src={socialFeeds.spotify}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Amarasté on Spotify"
              className="rounded-md"
            ></iframe>
         </div>
      </div>
      
      {/* Threads Panel */}
      <div className="media-scroller-panel h-[450px] sm:h-[500px]">
          <div className="media-panel-netflix h-full p-0">
            <a href={socialFeeds.threads} target="_blank" rel="noopener noreferrer" className="social-card-link" aria-label="@amarastelive no Threads">
              <div className="social-card">
                <img src="./amarastelive.jpg" alt="Avatar de Amarasté" className="social-avatar" />
                <div className="social-meta">
                  <div className="social-handle">@amarastelive</div>
                  <div className="social-bio">Ver perfil no Threads</div>
                </div>
              </div>
            </a>
          </div>
      </div>
    </div>
);

export default SocialMediaScroller;