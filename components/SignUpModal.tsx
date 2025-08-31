
import React from 'react';
import CloseIcon from './icons/CloseIcon';
import { applyClickAnimation } from '../animations';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-swoop-in" 
      onClick={onClose}
    >
      <div 
        className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg p-8 text-white flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            applyClickAnimation(e);
            onClose();
          }}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close sign up form"
        >
          <CloseIcon className="w-7 h-7" />
        </button>

        <h2 
          className="text-center text-[2rem] font-bold text-white neon-heading-glow mb-4"
        >
          CADASTRO
        </h2>
        
        <p className="text-center text-white/80 mb-6">
          As inscrições para a área de membros estão temporariamente encerradas. Siga-nos no Instagram para ser o primeiro a saber quando reabrirmos!
        </p>

        <a
          href="https://instagram.com/amarastelive"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => applyClickAnimation(e)}
          className="w-full max-w-xs mt-2 py-3 px-4 bg-soft-beige text-primary font-bold rounded-lg shadow-lg transition-transform hover:scale-105 soft-neon flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919 4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.441a5.4 5.4 0 100 10.8 5.4 5.4 0 000-10.8zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg>
          Seguir no Instagram
        </a>
        
        <div className="text-center pt-6">
          <button onClick={(e) => {
              applyClickAnimation(e);
              onSwitchToLogin();
            }} 
            className="text-sm font-semibold text-white/70 hover:text-white hover:underline transition-colors">
            Já tem login? Faça Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
