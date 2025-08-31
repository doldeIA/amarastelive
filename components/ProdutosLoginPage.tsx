
import React, { useState } from 'react';
import { applyClickAnimation } from '../animations';

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
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg p-6 w-full max-w-md mx-auto relative">
          
          <button 
            onClick={(e) => {
                applyClickAnimation(e);
                onNavigateHome();
            }}
            className="absolute top-4 right-4 text-white text-2xl hover:text-white/80 cursor-pointer"
            aria-label="Close"
          >
            &times;
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
                    type="password" // Use password type to hide input
                    id="access-code" 
                    required 
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Código de Acesso"
                    className="w-full bg-transparent border-b border-white/40 text-white text-center tracking-widest placeholder-white/60 p-2 mb-4 focus:outline-none focus:border-white/70"
                  />
              </div>
              
              {error && <p className="text-red-400 text-center text-sm">{error}</p>}
              
              <button 
                type="submit" 
                onClick={(e) => {
                    if (accessCode) applyClickAnimation(e);
                }}
                disabled={isLoading}
                className="w-full bg-transparent text-white px-4 py-2 rounded-lg ring-1 ring-white/50 hover:ring-white/80 transition mb-4 disabled:opacity-50 disabled:cursor-wait"
              >
                  {isLoading ? 'Verificando...' : 'DESBLOQUEAR'}
              </button>
          </form>
          
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="flex-shrink mx-4 text-white/50 text-sm">OU</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>
          
          <a 
            href="https://amarastelive.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
                applyClickAnimation(e);
            }}
            className="w-full py-3 px-4 bg-white text-warm-brown font-semibold rounded-lg shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Visitar Loja (Bandcamp)
          </a>
      
        </div>
    </div>
  );
};

export default ProdutosLoginPage;
