import React from 'react';

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Instagram</title>
    <circle cx="12" cy="12" r="12" fill="currentColor"/>
    <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="8" r="0.75" fill="white"/>
  </svg>
);

export default InstagramIcon;
