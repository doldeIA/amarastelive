import React from 'react';
import { applyClickAnimation } from '../animations';

interface TremblingChatBubbleProps {
  onClick: () => void;
}

const TremblingChatBubble: React.FC<TremblingChatBubbleProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center my-4 px-4">
      <button
        onClick={(e) => {
          applyClickAnimation(e);
          onClick();
        }}
        className="relative w-full max-w-[16rem] h-20 bg-deep-brown rounded-full text-white font-bold text-xl
                   flex items-center justify-center
                   border-2 border-red-500/50
                   transition-transform duration-200 active:scale-95
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-red-500
                   trembling-button"
        aria-label="Abrir chat iAmarasté"
      >
        iAmarasté
      </button>
    </div>
  );
};

export default TremblingChatBubble;