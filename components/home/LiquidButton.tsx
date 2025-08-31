
import React from 'react';

interface LiquidButtonProps {
    onClick: () => void;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ onClick }) => (
    <div className="flex justify-center mb-6">
        <button
          onClick={onClick}
          className="relative w-full max-w-[16rem] h-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white rounded-full psychedelic-bubble-button"
          aria-label="@amarastélive"
        >
          <div className="absolute inset-0 liquid-melt-container" aria-hidden="true">
            <div 
              className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full liquid-blob-1" 
              style={{ backgroundColor: 'var(--bubble-red, #FF0000)' }}
            ></div>
            <div 
              className="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full liquid-blob-2" 
              style={{ backgroundColor: 'var(--bubble-white, #ffffff)' }}
            ></div>
            <div 
              className="absolute w-2/5 h-2/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full liquid-blob-3" 
              style={{ backgroundColor: 'var(--bubble-red, #FF0000)' }}
            ></div>
            <div 
              className="absolute w-1/3 h-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 liquid-blob-4" 
              style={{ backgroundColor: 'var(--bubble-white, #ffffff)' }}
            ></div>
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <span className="text-black font-bold text-xl animate-text-liquid-glow-dark" style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.2))' }}>
                @amarastélive
            </span>
          </div>
        </button>
    </div>
);

export default LiquidButton;