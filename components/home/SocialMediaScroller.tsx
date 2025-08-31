
import React from 'react';

const socialFeeds = {
    instagram: "https://www.instagram.com/amarastelive/embed",
    tiktok: "https://www.tiktok.com/embed/v2/@amarastelive",
    spotify: "https://open.spotify.com/embed/artist/3407XfslidAhQKTIaFW24m?utm_source=generator&theme=0",
    threads: "https://www.threads.net/@amarastelive",
    x: "https://twitter.com/amarastelive?ref_src=twsrc%5Etfw",
};

const SocialMediaScroller: React.FC = () => (
    <div 
      className="my-8 w-full mx-auto media-scroller"
      tabIndex={0}
      aria-label="Social media feeds"
    >
      {/* Instagram Panel */}
      <div className="media-scroller-panel h-[500px]">
        <div className="media-panel-netflix h-full">
          <iframe
            src={socialFeeds.instagram}
            className="w-full h-full border-0 bg-white"
            title="Amarasté Instagram feed"
            allowTransparency={true}
            allow="encrypted-media"
          ></iframe>
        </div>
      </div>

      {/* TikTok Panel */}
      <div className="media-scroller-panel h-[500px]">
         <div className="media-panel-netflix h-full">
            <iframe 
              src={socialFeeds.tiktok}
              className="w-full h-full border-0 bg-white"
              title="Amarasté TikTok feed"
              allow="encrypted-media;"
              loading="lazy"
            ></iframe>
         </div>
      </div>

      {/* Spotify Panel */}
      <div className="media-scroller-panel h-[500px]">
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
      <div className="media-scroller-panel h-[500px]">
          <a href={socialFeeds.threads} target="_blank" rel="noopener noreferrer" className="media-panel-netflix h-full text-black flex flex-col items-center justify-center p-4 no-underline">
            <div className="text-[8rem] font-black leading-none">@</div>
            <p className="text-xl mt-4 font-semibold">Ver no Threads</p>
            <p className="text-xs text-black/70 mt-2 text-center max-w-[80%]">A incorporação de feeds ao vivo ainda não é suportada pelo Threads.</p>
          </a>
      </div>

      {/* X Panel */}
      <div className="media-scroller-panel h-[500px]">
          <div className="media-panel-netflix h-full">
            <a className="twitter-timeline" data-height="490" data-theme="dark" href={socialFeeds.x}>Tweets by amarastelive</a>
          </div>
      </div>
    </div>
);

export default SocialMediaScroller;