import React, { useEffect } from 'react';
import { applyClickAnimation } from '../animations';

interface WelcomePopupProps {
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-swoop-in">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-white welcome-text-glow mb-6">
          Sinta-se em casa...
        </h2>
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onClose();
          }}
          className="px-8 py-2 bg-transparent text-white rounded-lg ring-1 ring-white/50 hover:ring-white/80 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
