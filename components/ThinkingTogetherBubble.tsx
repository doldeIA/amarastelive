
import React, { useState, useRef } from 'react';
import ChatIcon from './icons/ChatIcon';

interface ThinkingTogetherBubbleProps {
  onClick: () => void;
}

const ThinkingTogetherBubble: React.FC<ThinkingTogetherBubbleProps> = ({ onClick }) => {
  const [isAnimatingClick, setIsAnimatingClick] = useState(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isAnimatingClick) return;

    setIsAnimatingClick(true);
    bubbleRef.current?.classList.add('animate-liquid-click');

    setTimeout(() => {
      onClick(); // Open the chat modal
      // Reset animation class after it finishes
      bubbleRef.current?.classList.remove('animate-liquid-click');
      setIsAnimatingClick(false);
    }, 500); // Duration must match the animation in index.html
  };

  return (
    <button
      ref={bubbleRef}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-20 w-32 h-32 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white rounded-full"
      aria-label="Abrir chat com iAmarasté"
    >
      {/* Canvas for the liquid animation, using the filter defined in index.html */}
      <div className="absolute inset-0 liquid-melt-container" aria-hidden="true">
        <div 
          className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" 
          style={{ backgroundColor: 'var(--bubble-red)', animation: 'move-blob-1 1.2s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" 
          style={{ backgroundColor: 'var(--bubble-white)', animation: 'move-blob-2 1.0s ease-in-out infinite alternate' }}
        ></div>
        <div 
          className="absolute w-2/5 h-2/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" 
          style={{ backgroundColor: 'var(--bubble-red)', animation: 'move-blob-3 1.4s ease-in-out infinite' }}
        ></div>
        {/* New blob for enhanced gradient */}
        <div 
          className="absolute w-1/3 h-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" 
          style={{ backgroundColor: 'var(--bubble-white)', animation: 'move-blob-4 1.1s ease-in-out infinite alternate' }}
        ></div>
      </div>
      
      {/* Icon is placed on top and is not affected by the filter */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <ChatIcon className="w-16 h-16 text-white" style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))' }} />
      </div>
    </button>
  );
};

export default ThinkingTogetherBubble;
