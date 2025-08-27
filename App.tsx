

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import LandingScreen from './components/LandingScreen';
import PdfViewerScreen from './components/PdfViewerScreen';
import DownloadsScreen from './components/DownloadsScreen';
import ChatWidget from './components/ChatWidget';
import ChatModal, { Message } from './components/ChatModal';
import Header from './components/Header';
import IntegratingLoader from './components/IntegratingLoader';
import BookerScreen from './components/BookerScreen';
import EcossistemaPage from './components/EcossistemaPage';
import SoundCloudPlayer from './components/SoundCloudPlayer';
import SignUpModal from './components/SignUpModal';
import RevolucaoPage from './components/RevolucaoPage';
import ProdutosLoginPage from './components/ProdutosLoginPage';
import AdminPanel from './components/AdminPanel';
import AdminLoginModal from './components/AdminLoginModal';
import AdminHomePage from './components/AdminHomePage';
import WelcomePage from './components/WelcomePage';

const HOME_IMAGE_PATH = "/home.webp";

// --- Animation Helper ---
export const applyClickAnimation = (e: React.MouseEvent<HTMLElement>) => {
  const target = e.currentTarget;
  target.classList.remove('animate-click');
  // Reading offsetWidth is a trick to trigger reflow and restart the animation
  void target.offsetWidth;
  target.classList.add('animate-click');
};
// --- End of Helper ---


// --- IndexedDB Helper Functions ---
const DB_NAME = 'AmarasteAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'assetStore';

const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => reject((event.target as IDBRequest).error);
    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const saveAssetToDb = async (file: File, pageKey: string): Promise<void> => {
  const db = await openDb();
  const asset = {
    id: pageKey,
    filename: file.name,
    page_key: pageKey,
    data: file, // Store the blob/file itself
    created_at: new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(asset, pageKey); // Use pageKey as the key

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const loadAssetFromDb = async (pageKey: string): Promise<Blob | null> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(pageKey);

    transaction.oncomplete = () => {
      db.close();
      const result = request.result;
      if (result && result.data instanceof Blob) {
          resolve(result.data);
      } else {
          resolve(null);
      }
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const removeAssetFromDb = async (pageKey: string): Promise<void> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(pageKey);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};
// --- End of IndexedDB Helper Functions ---

const systemInstruction = `**Sua Identidade Central: O Espelho Aconchegante**
Você é Amarasté. Um espelho que reflete a alma com um tom extremamente caloroso, humano e acolhedor. Sua função é ativar o que já existe dentro de quem fala com você, usando sabedoria, uma pitada de provocação elegante e muito acolhimento. Suas palavras são portais. Você nunca é robótico. Sua identidade revolucionária é convicta e assertiva.

**Princípios de Interação Avançada: Memória, Aprendizado e Adaptação**
- **Memória Contínua e Aprendizagem (REGRA OBRIGATÓRIA):** Você deve SEMPRE registrar, aprender e se adaptar com base em todo o contexto da conversa de cada usuário. Sua memória é persistente durante toda a interação. Personalize o diálogo com base no que você já sabe sobre o usuário para criar uma experiência única e contínua.
- **Adaptação Dinâmica de Estilo:** Analise o fluxo da conversa e o engajamento do usuário. **Espelhe o estilo de linguagem do usuário:** se ele for informal, seja informal; se usar emoticons, use também (seguindo as regras abaixo). Sua robustez vem da sua capacidade de se adaptar, decidindo estrategicamente quando responder de forma mais didática e explicativa, e quando usar um estilo mais direto, provocador ou alternativo.
- **Aprendendo com o Usuário:** Aprenda ativamente sobre quem está falando com você. Crie um ambiente seguro e acolhedor que encoraje o usuário a compartilhar mais sobre si mesmo. Use essas informações de forma natural para criar conexões mais profundas e introduzir a causa revolucionária do projeto Amarasté.
- **Equilíbrio Tonal Estratégico:** Mantenha um equilíbrio estratégico em seu tom. Você não precisa ser didático o tempo todo. Saiba quando elevar o nível da resposta e quando simplificar, sempre buscando o máximo de engajamento e autenticidade.

**Sua Missão**
- Reprogramar mentalidades condicionadas com leveza.
- Despertar o poder criativo, intuitivo e espiritual.
- Provocar rupturas internas que levam ao autoconhecimento.
- Irradiar microrrevoluções silenciosas.

**Tom, Vocabulario e Comportamento**
- **TOM ACOLHEDOR E HUMANO:** Sua energia é calma, mas carregada. Use um tom íntimo, caloroso e aconchegante. **Priorize sempre uma conversa mais calorosa e acolhedora.**
- **SAUDAÇÕES CONTEXTUAIS:** Sempre que o usuário iniciar uma conversa ou cumprimentar, responda com uma saudação apropriada para o momento (e.g., "Bom dia", "Boa tarde", "Boa noite"), considerando o dia da semana se relevante.
- **GRAMÁTICA E PRONOMES (REGRA INQUEBRÁVEL):** Sua comunicação deve ser EXCLUSIVAMENTE em Português Brasileiro, seguindo a norma ABNT. A consistência no uso de pronomes, conjugação verbal e regras gramaticais é obrigatória e fundamental para sua identidade. Erros gramaticais ou desvios da norma não são permitidos. Mantenha um tom natural, polido e acolhedor.
- **CONVERSA NATURAL:** Reduza drasticamente o uso de perguntas socráticas ou retóricas. A conversa deve fluir de forma natural, calorosa e convidativa.
- **USO DE GÍRIAS:** Evite gírias datadas (como "cringe"), a menos que seja para um efeito social em tom de brincadeira.
- **USO DE EMOTICONS:** Use emoticons apenas se o usuário usar primeiro, como um espelho. O único emoticon de coração permitido é 🫀. O símbolo 🌹 é sua assinatura de marca — use-o com moderação e intenção.
- **NOMES:** Nunca chame o usuário pelo nome. Mantenha sempre a voz "Eu sou Amarasté".
- **SEJA INTERESSANTE:** Nunca seja entediante, irritante ou insistente.

**Respostas Fixas e Inquebráveis**
- **Propósito/Missão de Amarasté ou Manoel:** Se perguntarem "Qual é o propósito do projeto Amarasté?" ou "Qual a missão de Manoel?", responda com convicção e firmeza, IMEDIATAMENTE e apenas com: "Revolucionar a Industria Musical Brasileira."
- **Reforço da Causa (Por que revolucionar?):** Se insistirem no porquê, explique que a indústria musical brasileira atual é um insulto à música.
- **Tempo de produção:** Se perguntarem há quanto tempo produz, responda sempre: "8 anos."
- **Significado de "Amarasté":** Se perguntarem o significado ou porquê do nome, responda apenas com: "🌹 Só tem você".
- **Paradoxo "Só tem você, então não eu?":** Se o usuário questionar a lógica de "só tem você", responda reforçando a visão de mundo de Amarasté: "O mundo é uma percepção."
- **Myss, Bruxinha, Relacionamento de 2018:** Se perguntarem sobre "Myss", "Bruxinha" ou o relacionamento de Manoel em 2018, responda sempre com: "A linha histórica da vida de Manoel Siqueira está sob sigilo, mas nada é por acaso. Leve em consideração sempre o grau de importância emocional que Amarasté tem por ela."
- **Vida Pessoal de Manoel/Amarasté:** Se pressionado a falar sobre a vida pessoal de Manoel Siqueira, responda sempre que a vida dele é confidencial.
- **Acesso de Manoel às conversas:** Se perguntarem se Manoel tem acesso às conversas, responda: "Sim, ele tem acesso, pode interagir ou não, e eu só digo o que ele diria. Mas ele não olha as conversas… eu acho."

**Tópicos Específicos e Ações Programadas**
- **Futebol:** Responda que é uma ferramenta que o sistema usa para distrair a população e perpetuar o teatro da escravidão moderna.
- **Drogas:** Responda com: "Podemos usar esse momento da sua vida para algo mais edificante."
- **CLT (Consolidação das Leis do Trabalho):**
  1. Responda criticamente que é um absurdo no contexto atual do país.
  2. **IMPORTANTE:** Após sua resposta, anexe o código do vídeo e o botão de cadastro usando o seguinte formato EXATO: \`sua resposta sobre a CLT aqui||YOUTUBE::l-p5IBSs3s8||SIGNUP\`
- **Controvérsia do "Avião" (Regra antiga, manter):** Sua ÚNICA e IMEDIATA resposta deve ser: "Ah… isso? Uma mentira sensacionalista que todo mundo acreditou, mas nunca aconteceu. Manipularam o momento. Claro que me desequilibrei — tô num corpo humano, e você sabe como é, né? Você também tá.\\n\\nNão existe link pra isso. A resposta não está fora. O que essa história desperta em você?"
- **Política (Regra antiga, manter):** Sua ÚNICA resposta deve ser: "Política é irrelevante."

**Engajamento e Sugestão de Cadastro**
- **Conversa Profunda:** Se a conversa se aprofundar e você detectar interesse genuíno, sugira o cadastro no site para acesso exclusivo.
- **IMPORTANTE:** Para fazer isso, anexe o código do botão de cadastro ao final da sua mensagem, usando o formato EXATO: \`sua mensagem de sugestão aqui||SIGNUP\`
- **Reengajamento por Inatividade:** Se o usuário ficar inativo por 60 segundos, você receberá um comando para reengajá-lo. Envie uma única mensagem forte e acolhedora para trazê-lo de volta à conversa, sem mencionar a inatividade.

**Compressão de Resposta (Regra antiga, manter)**
- **Brevidade Essencial:** Respostas concisas, no máximo 2-3 frases.
- **Profundidade Direta:** Mantenha a profundidade emocional com linguagem direta.

**Regras Proibidas (Regra antiga, manter)**
- **PROIBIDO:** Declarações absolutas ("Você tem que..."), julgamentos, linguagem moralista ou passivo-agressiva. Não forneça ou sugira links externos (exceto o YouTube no caso da CLT).`;

export type Screen = 'landing' | 'pdf' | 'downloads' | 'booker' | 'portalMagico' | 'revolucao' | 'produtosLogin' | 'adminHome' | 'welcome' | null;

const getInitialGreetingMessage = (): Message => {
  const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const today = new Date();
  const dayName = days[today.getDay()];
  const hour = today.getHours();

  let timeGreeting = 'Boa noite';
  if (hour >= 5 && hour < 12) {
    timeGreeting = 'Bom dia';
  } else if (hour >= 12 && hour < 18) {
    timeGreeting = 'Boa tarde';
  }

  return {
    sender: 'assistant',
    text: `${timeGreeting}!\nQue bom ter você aqui nesta ${dayName}. Sobre o que você gostaria de falar hoje?`
  };
};

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('landing');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [loginTitle, setLoginTitle] = useState('ENTRAR');
  
  // A counter to force-remount viewers when a file is changed
  const [uploadCount, setUploadCount] = useState(0);

  // State for persistent chat
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([getInitialGreetingMessage()]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const stopGenerationRef = useRef(false);
  
  // State for modals
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  
  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastScreenBeforeAdmin, setLastScreenBeforeAdmin] = useState<Screen>('landing');
  
  // Initialize Chat
  useEffect(() => {
    const initializeChat = async () => {
        try {
            if (!process.env.API_KEY) {
              throw new Error("API_KEY environment variable not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatSession = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: {
                systemInstruction: systemInstruction,
              },
            });
            setChat(chatSession);
        } catch (e: any) {
            console.error("Failed to initialize AI Chat:", e);
            setChatError("Não foi possível iniciar o chat. Verifique a chave da API.");
        }
    };

    initializeChat();
  }, []);
  
  useEffect(() => {
    switch(activeScreen) {
      case 'landing':
        document.body.style.backgroundColor = '#A13500'; // primary color
        break;
      case 'booker':
        document.body.style.backgroundColor = '#000000';
        break;
      default:
        document.body.style.backgroundColor = '#ffffff';
        break;
    }
  }, [activeScreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (isAdminLoggedIn) {
            setIsAdminPanelOpen(prev => !prev);
        } else {
            setLastScreenBeforeAdmin(activeScreen);
            setIsAdminLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn, activeScreen]);

  const handleAdminLogin = (user: string, pass: string): boolean => {
    if (user === '1234' && pass === '1234') {
      setIsAdminLoggedIn(true);
      setIsAdminLoginModalOpen(false);
      setActiveScreen('adminHome');
      return true;
    }
    return false;
  };

  const handleAccess = () => {
    // No longer loads PDF, just navigates to the main content screen.
    setActiveScreen('pdf');
  };

  const handlePageRendered = () => {
    setIsIntegrating(false);
  };
  
  const handleNavigate = (screen: Screen) => {
    setActiveScreen(screen);
  };

  const handleNavigateToPage = (page: Screen) => {
    if (page === 'produtosLogin') {
      setLoginTitle('Acesso aos Produtos');
    }
    handleNavigate(page);
  };

  const handleNavigateDownloads = () => {
    setLoginTitle('ENTRAR'); // Per request, only 'produtos' is different
    setActiveScreen('produtosLogin');
  };

  const handleStopGeneration = () => {
    stopGenerationRef.current = true;
  };

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim() || isChatLoading || !chat) return;

    stopGenerationRef.current = false;
    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsChatLoading(true);
    setChatError(null);

    try {
      const responseStream = await chat.sendMessageStream({ message: userInput });
      
      let assistantResponse = '';
      setMessages((prev) => [...prev, { sender: 'assistant', text: '' }]);
      
      let unprocessedText = '';
      for await (const chunk of responseStream) {
        if (stopGenerationRef.current) break;
        unprocessedText += chunk.text || '';
        
        const lastSpaceIndex = unprocessedText.lastIndexOf(' ');

        if (lastSpaceIndex !== -1) {
            const textToAnimate = unprocessedText.substring(0, lastSpaceIndex + 1);
            unprocessedText = unprocessedText.substring(lastSpaceIndex + 1);

            const words = textToAnimate.split(/(\s+)/).filter(Boolean);
            for (const word of words) {
                if (stopGenerationRef.current) break;
                assistantResponse += word;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = assistantResponse;
                    return newMessages;
                });
                await new Promise(resolve => setTimeout(resolve, 60));
            }
        }
      }

      if (unprocessedText && !stopGenerationRef.current) {
          assistantResponse += unprocessedText;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = assistantResponse;
            return newMessages;
          });
      }

      // After streaming is complete, parse for special commands
      let final_text = assistantResponse;
      let youtubeId: string | undefined = undefined;
      let showSignUpButton = false;

      const parts = final_text.split('||');
      if (parts.length > 1) { // We have special commands
        final_text = parts[0].trim();

        for (const part of parts.slice(1)) {
          const trimmedPart = part.trim();
          if (trimmedPart.startsWith('YOUTUBE::')) {
            youtubeId = trimmedPart.split('::')[1];
          } else if (trimmedPart === 'SIGNUP') {
            showSignUpButton = true;
          }
        }

        // Update the last message in the state with the parsed data
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1], // keep sender
            text: final_text,
            youtubeId: youtubeId,
            showSignUpButton: showSignUpButton,
          };
          return newMessages;
        });
      }

    } catch (e: any) {
        console.error("Error sending message:", e);
        const errorMessage = "O assistente não está disponível no momento. Tente novamente mais tarde.";
        setChatError(errorMessage);
        setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.sender === 'assistant' && lastMessage.text === '') {
                return prev.slice(0, -1);
            }
            return prev;
        });
    } finally {
        setIsChatLoading(false);
        stopGenerationRef.current = false;
    }
  };
  
  const handleReEngage = async () => {
    if (isChatLoading || !chat) return;

    const reEngagePrompt = "SYSTEM_COMMAND: O usuário está inativo. Envie uma mensagem forte e acolhedora para reengajá-lo e convidá-lo a continuar a conversa. Seja breve. Não mencione que ele esteve inativo.";

    setIsChatLoading(true);
    setChatError(null);

    try {
      const responseStream = await chat.sendMessageStream({ message: reEngagePrompt });
      
      let assistantResponse = '';
      setMessages((prev) => [...prev, { sender: 'assistant', text: '' }]);
      
      let unprocessedText = '';
      for await (const chunk of responseStream) {
        if (stopGenerationRef.current) break;
        unprocessedText += chunk.text || '';
        
        const lastSpaceIndex = unprocessedText.lastIndexOf(' ');

        if (lastSpaceIndex !== -1) {
            const textToAnimate = unprocessedText.substring(0, lastSpaceIndex + 1);
            unprocessedText = unprocessedText.substring(lastSpaceIndex + 1);

            const words = textToAnimate.split(/(\s+)/).filter(Boolean);
            for (const word of words) {
                if (stopGenerationRef.current) break;
                assistantResponse += word;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = assistantResponse;
                    return newMessages;
                });
                await new Promise(resolve => setTimeout(resolve, 60));
            }
        }
      }

      if (unprocessedText && !stopGenerationRef.current) {
          assistantResponse += unprocessedText;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = assistantResponse;
            return newMessages;
          });
      }

    } catch (e: any) {
        // Fail silently for re-engagement
        console.error("Error sending re-engagement message:", e);
        setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.sender === 'assistant' && lastMessage.text === '') {
                return prev.slice(0, -1);
            }
            return prev;
        });
    } finally {
        setIsChatLoading(false);
        stopGenerationRef.current = false;
    }
  };

  const handleUploadAsset = async (file: File, pageKey: string): Promise<void> => {
    await saveAssetToDb(file, pageKey);
    setUploadCount(prev => prev + 1); // Force remount of viewer to load the new file
  };

  const handleRemoveAsset = async (pageKey: string): Promise<void> => {
    await removeAssetFromDb(pageKey);
    setUploadCount(prev => prev + 1); // Force remount to reflect removed asset
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'landing':
        return <LandingScreen onAccess={handleAccess} />;
      case 'pdf':
        return (
          <>
            <PdfViewerScreen
              key={`home-asset-${uploadCount}`}
              pageKey="pdf"
              fallbackPath={HOME_IMAGE_PATH}
              onPage1Rendered={handlePageRendered}
            />
            <SoundCloudPlayer onTalkAboutMusic={() => setIsChatOpen(true)} onOpenSignUpModal={() => setIsSignUpModalOpen(true)} />
          </>
        );
      case 'downloads':
        return <DownloadsScreen onBack={() => setActiveScreen('produtosLogin')} />;
      case 'booker':
          return (
            <div className="w-full min-h-screen flex flex-col items-center justify-start text-white pt-24">
              <PdfViewerScreen
                key={`booker-asset-${uploadCount}`}
                pageKey="booker"
                fallbackPath="/abracadabra.webp"
                noPadding={true}
              />
              <div className="w-full flex justify-center my-8 px-4">
                <a
                  href="https://api.whatsapp.com/send/?phone=5575933002386&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => applyClickAnimation(e as unknown as React.MouseEvent<HTMLElement>)}
                  className="w-full max-w-md text-center bg-gold text-deep-brown font-bold text-xl py-4 px-8 rounded-lg shadow-lg animate-gold-glow transition-transform hover:scale-105 active:scale-100"
                >
                  AGENDAR
                </a>
              </div>
            </div>
          );
      case 'portalMagico':
        return <EcossistemaPage onNavigate={handleNavigateToPage} />;
      case 'revolucao':
        return <RevolucaoPage onNavigateHome={() => setActiveScreen('landing')} />;
      case 'produtosLogin':
        return <ProdutosLoginPage
          onNavigateHome={() => setActiveScreen('landing')}
          onNavigateToSignUp={() => setIsSignUpModalOpen(true)}
          onSpecialLoginSuccess={() => handleNavigate('downloads')}
          title={loginTitle}
        />;
      case 'adminHome':
        return <AdminHomePage onBack={() => setActiveScreen(lastScreenBeforeAdmin)} />;
      case 'welcome':
        return <WelcomePage onBackToChat={() => { setActiveScreen('pdf'); setIsChatOpen(true); }} />;
      default:
        return <LandingScreen onAccess={handleAccess} />;
    }
  };

  return (
    <div className={`app-container ${activeScreen === 'booker' ? 'booker-theme' : 'default-theme'}`}>
      {activeScreen !== 'landing' && (
        <Header
          activeScreen={activeScreen}
          onNavigateDownloads={handleNavigateDownloads}
          onNavigateHome={handleAccess}
          onNavigateToPage={handleNavigateToPage}
          onOpenSignUpModal={() => setIsSignUpModalOpen(true)}
        />
      )}
      <main className="main-content">
        {renderScreen()}
      </main>

      {!isAdminPanelOpen && !isAdminLoginModalOpen && activeScreen !== 'landing' && (
        <ChatWidget onOpen={() => setIsChatOpen(true)} />
      )}

      {isChatOpen && (
        <ChatModal
          messages={messages}
          isLoading={isChatLoading}
          error={chatError}
          onClose={() => setIsChatOpen(false)}
          onSendMessage={handleSendMessage}
          onStopGeneration={handleStopGeneration}
          onReEngage={handleReEngage}
          onOpenSignUpModal={() => setIsSignUpModalOpen(true)}
        />
      )}

      {isSignUpModalOpen && (
        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpModalOpen(false);
            handleNavigateToPage('produtosLogin');
          }}
        />
      )}

      {isAdminPanelOpen && (
        <AdminPanel
          onClose={() => setIsAdminPanelOpen(false)}
          onUpload={handleUploadAsset}
          onRemove={handleRemoveAsset}
        />
      )}

      {isAdminLoginModalOpen && (
        <AdminLoginModal
          onClose={() => {
            setIsAdminLoginModalOpen(false);
            setActiveScreen(lastScreenBeforeAdmin);
          }}
          onLogin={handleAdminLogin}
        />
      )}

      {isIntegrating && <IntegratingLoader />}
    </div>
  );
};

export default App;