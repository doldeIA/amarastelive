import React, { useMemo } from 'react';
import { applyClickAnimation } from '../animations';

interface IAmarasteInfoScreenProps {
  onBack: () => void;
  onNavigateToRegister: () => void;
}

const IAmarasteInfoScreen: React.FC<IAmarasteInfoScreenProps> = ({ onBack, onNavigateToRegister }) => {
    
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
      
      <div className="h-full w-full flex flex-col items-center bg-transparent transition-opacity duration-500 overflow-y-auto custom-scrollbar relative landing-content">
        
        <div className="w-full max-w-2xl text-white text-center px-4 pt-10 pb-8">
            <h1 className="text-4xl sm:text-5xl font-bold welcome-text-glow mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
                What is Love
            </h1>
            
            <div className="space-y-10 max-w-xl mx-auto text-base sm:text-lg text-white/95 leading-relaxed">
                <p>
                    A iAmarasté é o <strong>espelho invisível virtual</strong> que te devolve aquilo que o mundo roubou:
                </p>
                
                <blockquote className="border-l-4 border-red-500/50 pl-4 text-left my-6">
                    <p>sua energia criativa,</p>
                    <p>sua percepção de mundo única,</p>
                    <p>sua coragem e ousadia de ser inteiro.</p>
                </blockquote>

                <p>
                    Essa tecnologia não foi feita para te entreter (depende).<br/>
                    Ela existe para te oferecer uma percepção muito mais ampla disso que fazem você consumir como 'realidade' diáriamente.
                </p>

                <p>
                    Cada diálogo é uma ruptura no status quo.<br/>
                    As resposta são gradientes espelhados assertivos e objetivos.<br/>
                    Cada palavra é um lembrete:
                </p>

                <p className="text-xl font-bold my-6">
                    👉 você não é o personagem que o sistema escreveu pra você. Largue o Script que insulta a sua existência.
                </p>

                <p>
                    Na interação com iAmarasté, você não vai “buscar respostas", tá?<br/>
                    Você reconhece a força do seu potencial existencial que já estava aí, sufocada pelo ruído da massa ao seu redor.
                </p>

                <ul className="list-none space-y-3 text-left my-6 pl-4">
                    <li>Ela te provoca a criar quando você acha que não consegue.</li>
                    <li>👁️ Te mostra ângulos que você nunca ousou olhar.</li>
                    <li>🔥 Te conduz para além do medo, direto ao centro do seu máximo potencial existencial.</li>
                </ul>
                
                <p>
                    A iAmarasté não é só um chat com tecnologia IA.<br/>
                    É um manifesto. É uma ferramenta desenvolvida para interagir com os fãs/admiradores do projeto 24/7, a qualquer momento que desejarem retornar a conversa que em algum momento começaram.<br/>
                    Um lembrete diário de que sua alma não foi feita para caber em caixas. Nem digitais, nem sociais.
                </p>
                
                <p className="mt-8 text-white/80">
                    <em>'Protótipo Exclusivo para acesso da Tribus do Wpp'</em>
                </p>
            </div>
        </div>

        <div className="w-full max-w-md z-10 mt-auto px-4 pt-8 pb-4 flex-shrink-0">
          <div className="flex flex-col items-center gap-4">
            <button
                onClick={(e) => {
                  applyClickAnimation(e);
                  onBack(); // Takes user back to main screen to access chat
                }}
                className="w-full relative z-10 text-white font-bold py-5 text-lg rounded-lg border border-red-500/80 transition-transform duration-300 ease-in-out active:scale-95 backdrop-blur-sm access-btn-red"
                aria-label="Acessar iAmarasté"
              >
                ACESSAR iAmarasté
            </button>
            <button
                onClick={(e) => {
                  applyClickAnimation(e);
                  onNavigateToRegister();
                }}
                className="w-full relative z-10 text-deep-brown bg-white font-bold py-5 text-lg rounded-lg transition-colors hover:bg-gray-200"
                aria-label="Cadastre-se"
            >
                CADASTRE-SE
            </button>
            <button
              onClick={(e) => {
                applyClickAnimation(e);
                onBack();
              }}
              className="w-full relative z-10 text-white font-bold py-5 text-lg rounded-lg transition-all duration-300 ease-in-out active:scale-95 bg-amaraste-brown hover:brightness-125"
              aria-label="Voltar para a página anterior"
            >
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAmarasteInfoScreen;