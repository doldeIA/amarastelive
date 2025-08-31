import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import RotatingCircleIcon from './icons/RotatingCircleIcon';
import AssistantAvatar from './AssistantAvatar';
import { applyClickAnimation } from '../animations';

export interface Message {
  sender: 'user' | 'assistant';
  text: string;
  youtubeId?: string;
  showSignUpButton?: boolean;
}

interface ChatModalProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSendMessage: (input: string) => Promise<void>;
  onStopGeneration: () => void;
  onReEngage: () => void;
  onOpenSignUpModal: () => void;
}

const UserIcon = () => (
  <svg viewBox="0 0 8 8" className="pixel-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 0v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1v-1h-1v-1h-2z" />
  </svg>
);

const AssistantIcon = () => (
  <svg viewBox="0 0 8 8" className="pixel-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M2 0v1h-1v1h-1v3h1v1h1v1h4v-1h1v-1h1v-3h-1v-1h-1v-1h-4z" />
  </svg>
);


const renderFormattedText = (text: string, isFinal: boolean) => {
  const cleanText = String(text ?? '').trim();

  if (!isFinal) {
    return <>{cleanText.replace(/\*/g, '')}</>;
  }

  const parts = cleanText.split(/(\*.*?\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return <strong key={i}>{part.substring(1, part.length - 1)}</strong>;
        }
        return part;
      })}
    </>
  );
};


const ChatModal: React.FC<ChatModalProps> = ({
  messages,
  isLoading,
  error,
  onClose,
  onSendMessage,
  onStopGeneration,
  onReEngage,
  onOpenSignUpModal,
}) => {
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hasSentReEngagement, setHasSentReEngagement] = useState(false);
  const [logoParticles, setLogoParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles for the logo glitch effect
    setLogoParticles(
      Array.from({ length: 30 }).map(() => ({
        left: `${40 + Math.random() * 20}%`,
        animationDelay: `${Math.random() * 1.5}s`,
        animationDuration: `${0.8 + Math.random() * 0.7}s`,
      }))
    );
  }, []);

  useEffect(() => {
    if (autoScroll && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      setHasSentReEngagement(false);
    }
  }, [messages]);

  useEffect(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const canReEngage = !isLoading && !hasSentReEngagement && messages.length > 0 && messages[messages.length-1].sender === 'assistant';

    if (canReEngage) {
        idleTimerRef.current = setTimeout(() => {
            onReEngage();
            setHasSentReEngagement(true);
        }, 60000); // 60 seconds
    }

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [userInput, isLoading, hasSentReEngagement, messages, onReEngage]);


  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 40;
    setAutoScroll(isAtBottom);
  };

  const handleLocalSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    const currentInput = userInput;
    setUserInput('');
    setAutoScroll(true);
    await onSendMessage(currentInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" aria-modal="true" role="dialog">
      <div className="cyber-chat-frame w-[90%] max-w-lg h-[80vh] max-h-[700px] md:max-w-2xl md:h-[85vh] md:max-h-[850px] rounded-sm shadow-2xl animate-swoop-in overflow-hidden">
        {/* Decorative corner elements */}
        <div className="cyber-frame-corner top-left"></div>
        <div className="cyber-frame-corner top-right"></div>
        <div className="cyber-frame-corner bottom-left"></div>
        <div className="cyber-frame-corner bottom-right"></div>

        <div className="flex flex-col h-full bg-black/50">
          <header className="flex-shrink-0 cyber-header">
              <div className="cyber-header-content relative pt-8">
                  <div className="logo-particles-container" aria-hidden="true">
                    {logoParticles.map((p, i) => (
                      <div key={i} className="logo-particle" style={p}></div>
                    ))}
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white logo-iamaraste mb-2">
                      iAmarasté
                  </h1>
                  <p className="text-sm text-white/90 tracking-wider animate-futuristic-glow" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                      Vamos Pensar Juntos!
                  </p>
                  <p className="text-[10px] text-white/60 tracking-tighter mt-2" style={{fontFamily: "'Press Start 2P', monospace"}}>
                      Programado com a cosmovisão do mundo Amarasté
                  </p>
                  <button
                    onClick={(e) => {
                      applyClickAnimation(e);
                      onClose();
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-white/70 rounded-full p-2 transition-all hover:bg-white/10 hover:text-white z-10"
                    aria-label="Close chat"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>
              </div>
              <div className="w-full h-px bg-white/50 animate-flow-ltr flowing-neon-line" style={{'--bubble-red': '#fff', animationDuration: '4s' } as React.CSSProperties}></div>
          </header>

          <div
            ref={chatRef}
            onScroll={handleScroll}
            className="flex-1 p-2 overflow-y-auto space-y-4 chat-messages-container"
          >
            {messages.map((msg, index) => {
              const isLastMessage = index === messages.length - 1;
              const isStreaming = isLoading && msg.sender === 'assistant' && isLastMessage;

              return (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                >
                  <div
                    className={`max-w-[85%] rounded-sm text-white chat-bubble ${msg.sender === 'user' ? 'user' : 'assistant'}`}
                  >
                      {msg.sender === 'assistant' && <AssistantIcon />}
                      <div className="flex-1">
                          {isStreaming && msg.text === '' ? (
                            <div className="flex items-baseline gap-1.5 py-1">
                              <span className="w-1.5 h-1.5 bg-white/50 rounded-full dot-1"></span>
                              <span className="w-1.5 h-1.5 bg-white/50 rounded-full dot-2"></span>
                              <span className="w-1.5 h-1.5 bg-white/50 rounded-full dot-3"></span>
                            </div>
                          ) : (
                             <div className="font-normal whitespace-pre-wrap">
                              {renderFormattedText(msg.text, !isStreaming)}
                              {isStreaming && (
                                <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>
                              )}
                            </div>
                          )}
                          {msg.youtubeId && !isStreaming && (
                              <div className="mt-3 rounded-sm overflow-hidden aspect-video border border-red-500/50">
                                  <iframe
                                      src={`https://www.youtube.com/embed/${msg.youtubeId}`}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full"
                                  ></iframe>
                              </div>
                          )}
                          {msg.showSignUpButton && !isStreaming && (
                              <button
                                  onClick={(e) => {
                                      applyClickAnimation(e);
                                      onOpenSignUpModal();
                                      onClose();
                                  }}
                                  className="mt-3 w-full text-center bg-white/20 text-white font-bold py-2 px-4 rounded-sm text-sm hover:bg-white/30 transition-colors"
                              >
                                  Cadastre-se para conteúdo exclusivo
                              </button>
                          )}
                      </div>
                      {msg.sender === 'user' && <UserIcon />}
                  </div>
                </div>
              );
            })}
          </div>

          {error && (
              <div className="px-4 pb-2">
                  <p className="text-red-400 text-center text-sm">{error}</p>
              </div>
          )}

          <div className="p-2 border-t border-red-500/30">
            {isLoading && (
              <div className="flex justify-center items-center mb-2">
                <button
                  type="button"
                  onClick={(e) => {
                    applyClickAnimation(e);
                    onStopGeneration();
                  }}
                  className="w-auto px-4 py-1 flex-shrink-0 flex items-center justify-center bg-coke-red text-white rounded-md transition-colors blinking-stop-button text-sm gap-2"
                  aria-label="Stop generation"
                >
                  PARAR
                  <RotatingCircleIcon className="w-4 h-4" />
                </button>
              </div>
            )}
            <form onSubmit={handleLocalSendMessage} className="flex items-center gap-2 relative">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={isLoading ? 'Aguarde...' : "Digite aqui..."}
                disabled={isLoading || !!error}
                className="flex-1 w-full bg-black/50 text-white placeholder-white/60 px-4 py-2.5 rounded-full border border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/80 transition"
                autoComplete="off"
              />
              <button
                type="submit"
                onClick={(e) => {
                  if (!userInput.trim() || !!error) return;
                  applyClickAnimation(e);
                }}
                disabled={!userInput.trim() || !!error}
                className="bg-red-600 text-white p-3 rounded-full transition-all duration-200 enabled:hover:scale-110 enabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_8px_var(--bubble-red)]"
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;