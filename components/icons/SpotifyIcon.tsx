import React from 'react';

const SpotifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Spotify</title>
    <circle cx="12" cy="12" r="12" fill="currentColor"/>
    <path
      fill="white"
      d="M17.36 14.34a.49.49 0 0 1-.68.16 8.35 8.35 0 0 0-7.73-1.22.5.5 0 0 1-.56-.37.49.49 0 0 1 .37-.56c3.2-.84 6.7.2 9.47 2.14a.49.49 0 0 1 .13.75zm.9-2.7a.62.62 0 0 1-.84.22c-2.5-1.52-6.22-1.95-9.1-.94a.62.62 0 0 1-.68-.54.62.62 0 0 1 .54-.68c3.2-.95 7.2-.46 10.05 1.4a.62.62 0 0 1 .23.84zm.04-2.78c-2.9-1.7-7.6-1.84-10.5-.9a.75.75 0 0 1-.78-.73.75.75 0 0 1 .74-.78c3.3-.9 8.4-.78 11.6 1.2a.75.75 0 0 1 .32 1.01.75.75 0 0 1-1.01-.32z"
    />
  </svg>
);

export default SpotifyIcon;
