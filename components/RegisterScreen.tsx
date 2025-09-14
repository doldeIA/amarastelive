import React, { useMemo, useState } from 'react';
import { applyClickAnimation } from '../animations';

interface RegisterScreenProps {
  onBack: () => void;
}

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

                <form onSubmit={handleSubmit} className="space-y-5">
                    <h1 className="text-center text-3xl font-bold text-white logo-iamaraste mb-6" style={{animation: 'none'}}>
                        CADASTRO
                    </h1>
                    
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

        <div className="w-full max-w-md z-10 mt-6 mb-4 flex-shrink-0">
          <button
            onClick={(e) => {
              applyClickAnimation(e);
              onBack();
            }}
            className="w-full relative z-10 text-white font-semibold py-3 text-base rounded-lg border border-white/50 transition-colors hover:bg-white/10"
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
