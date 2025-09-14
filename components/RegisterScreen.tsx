import React, { useMemo, useState } from 'react';
import { applyClickAnimation } from '../animations';

interface RegisterScreenProps {
  onBack: () => void;
}

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.918l-6.573 4.818C9.656 40.091 16.318 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.447-2.274 4.481-4.253 5.964l6.19 5.238C42.012 35.244 44 30.027 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);


const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        instagram: '',
        whatsapp: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for submission logic
        console.log('Form submitted:', formData);
        // Here you would add validation and an API call
    };
    
    const particles = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        const count = isMobile ? 25 : 50;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            backgroundColor: Math.random() > 0.8 ? '#fff' : 'var(--bubble-red)',
        }));
    }, []);

  return (
    <div className="first-page">
      <div className="arcade-scanlines" />
      <div className="arcade-frame">
          <div className="arcade-corner top-left" />
          <div className="arcade-corner top-right" />
          <div className="arcade-corner bottom-left" />
          <div className="arcade-corner bottom-right" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map(p => <div key={p.id} className="pixel-particle" style={p as React.CSSProperties} />)}
      </div>
      
      <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-transparent transition-opacity duration-500 overflow-y-auto relative landing-content custom-scrollbar">
        
        <div className="w-full max-w-md my-auto">
            <div className="cyber-chat-frame p-6 sm:p-8">
                <div className="cyber-frame-corner top-left"></div>
                <div className="cyber-frame-corner top-right"></div>
                <div className="cyber-frame-corner bottom-left"></div>
                <div className="cyber-frame-corner bottom-right"></div>

                 <h1 className="text-center text-3xl font-bold text-white logo-iamaraste mb-6 mt-[30px]" style={{animation: 'none'}}>
                    CADASTRO
                </h1>

                <button
                    onClick={() => console.log('Google Sign-In clicked (not implemented)')}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors mb-4"
                >
                    <GoogleIcon />
                    <span>Entrar com Google</span>
                </button>

                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-red-500/30"></div>
                    <span className="flex-shrink mx-4 text-red-400/70 text-sm">OU</span>
                    <div className="flex-grow border-t border-red-500/30"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Input Fields with Floating Labels */}
                    <div className="relative">
                        <input type="text" name="name" id="name" placeholder=" " onChange={handleChange} className="peer w-full bg-transparent border-0 border-b-2 border-red-500/50 text-white p-2 focus:outline-none focus:border-red-500 transition" />
                        <label htmlFor="name" className="absolute left-2 -top-5 text-sm text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white/70 pointer-events-none">Nome:</label>
                    </div>
                     <div className="relative">
                        <input type="email" name="email" id="email" placeholder=" " onChange={handleChange} className="peer w-full bg-transparent border-0 border-b-2 border-red-500/50 text-white p-2 focus:outline-none focus:border-red-500 transition" />
                        <label htmlFor="email" className="absolute left-2 -top-5 text-sm text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white/70 pointer-events-none">Email:</label>
                    </div>
                     <div className="relative">
                        <input type="text" name="instagram" id="instagram" placeholder=" " onChange={handleChange} className="peer w-full bg-transparent border-0 border-b-2 border-red-500/50 text-white p-2 focus:outline-none focus:border-red-500 transition" />
                        <label htmlFor="instagram" className="absolute left-2 -top-5 text-sm text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white/70 pointer-events-none">@Instagram:</label>
                    </div>
                    <div className="relative">
                        <input type="tel" name="whatsapp" id="whatsapp" placeholder=" " onChange={handleChange} className="peer w-full bg-transparent border-0 border-b-2 border-red-500/50 text-white p-2 focus:outline-none focus:border-red-500 transition" />
                        <label htmlFor="whatsapp" className="absolute left-2 -top-5 text-sm text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white/70 pointer-events-none">Whatsapp: ()</label>
                    </div>
                    <div className="relative">
                        <input type="password" name="password" id="password" placeholder=" " onChange={handleChange} className="peer w-full bg-transparent border-0 border-b-2 border-red-500/50 text-white p-2 focus:outline-none focus:border-red-500 transition" />
                         <label htmlFor="password" className="absolute left-2 -top-5 text-sm text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white/70 pointer-events-none">Senha:</label>
                    </div>
                    <div className="relative">
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder=" " onChange={handleChange} className="peer w-full bg-transparent border-0 border-b-2 border-red-500/50 text-white p-2 focus:outline-none focus:border-red-500 transition" />
                        <label htmlFor="confirmPassword" className="absolute left-2 -top-5 text-sm text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white/70 pointer-events-none">Confirmar senha:</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full relative z-10 text-white font-bold py-4 text-lg rounded-lg border border-red-500/80 transition-transform duration-300 ease-in-out active:scale-95 backdrop-blur-sm access-btn-red !mt-8"
                        aria-label="Finalizar Cadastro"
                    >
                        FINALIZAR
                    </button>
                </form>
            </div>
        </div>

        <div className="w-full max-w-md z-10 mt-2 mb-8 flex-shrink-0">
          <button
            onClick={(e) => {
              applyClickAnimation(e);
              onBack();
            }}
            className="w-full relative z-10 text-white font-semibold py-3 text-base rounded-lg border border-white/50 transition-colors hover:bg-white/10 chat-pulse-glow"
            aria-label="Voltar para a página anterior"
          >
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;