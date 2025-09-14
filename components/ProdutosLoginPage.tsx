

import React, { useState } from 'react';
import { applyClickAnimation } from '../animations';
import CloseIcon from './icons/CloseIcon';

interface ProdutosLoginPageProps {
  onNavigateHome: () => void;
  onNavigateToSignUp?: () => void; // Kept for prop compatibility
  onSpecialLoginSuccess: () => void;
  title?: string; // Kept for prop compatibility
}

const ProdutosLoginPage: React.FC<ProdutosLoginPageProps> = ({ onNavigateHome, onSpecialLoginSuccess }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate validation
    setTimeout(() => {
      if (accessCode === '1212') { // Check against the special access code
        onSpecialLoginSuccess();
      } else {
        setError('Código de acesso inválido.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-swoop-in">
        <div className="cyber-chat-frame p-6 sm:p-8 w-full max-w-md mx-auto relative">
          <div className="cyber-frame-corner top-left"></div>
          <div className="cyber-frame-corner top-right"></div>
          <div className="cyber-frame-corner bottom-left"></div>
          <div className="cyber-frame-corner bottom-right"></div>
          
          <button 
            onClick={(e) => {
                applyClickAnimation(e);
                onNavigateHome();
            }}
            className="absolute top-2 right-2 text-white/70 rounded-full p-2 transition-all hover:bg-white/10 hover:text-white z-10"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-white neon-heading-glow text-center mb-6">
              Acesso Exclusivo
          </h2>
          <p className="text-center text-white/80 mb-6 text-sm">
            Membros com código podem acessar downloads exclusivos. Outros produtos estão disponíveis em nossa loja oficial.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
               <div>
                  <label htmlFor="access-code" className="sr-only">Código de Acesso</label>
                  <input 
                    type="password"
                    id="access-code" 
                    required 
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Código de Acesso"
                    className="w-full bg-transparent border-b-2 border-red-500/50 text-white text-center tracking-widest placeholder-white/60 p-2 mb-4 focus:outline-none focus:border-red-400 transition"
                  />
              </div>
              
              {error && <p className="text-red-400 text-center text-sm">{error}</p>}
              
              <button 
                type="submit" 
                onClick={(e) => {
                    if (accessCode) applyClickAnimation(e);
                }}
                disabled={isLoading}
                className="w-full text-white font-bold py-3 text-base rounded-lg transition-transform duration-300 ease-in-out active:scale-95 backdrop-blur-sm access-btn-red disabled:opacity-50 disabled:cursor-wait"
              >
                  {isLoading ? 'Verificando...' : 'DESBLOQUEAR'}
              </button>
          </form>
          
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-red-500/30"></div>
            <span className="flex-shrink mx-4 text-red-400/70 text-sm">OU</span>
            <div className="flex-grow border-t border-red-500/30"></div>
          </div>
          
          <a 
            href="https://amarastelive.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
                applyClickAnimation(e);
            }}
            className="w-full block text-center text-white font-bold py-3 text-base rounded-lg transition-transform duration-300 ease-in-out active:scale-95 backdrop-blur-sm access-btn-brown"
          >
            Visitar Loja (Bandcamp)
          </a>
      
        </div>
    </div>
  );
};

export default ProdutosLoginPage;