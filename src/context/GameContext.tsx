import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Window, GameState, Message, Evidence, DiaryEntry, NewsArticle, DeletedItem } from '../types';
import { aiService, AssistantType } from '../lib/ai-service';
import { buildCasinoNPCPrompt, buildCasinoEvidencePrompt, buildCasinoSearchPrompt } from '../lib/casino-prompts';
import { 
  casinoGameState, 
  casinoMessages, 
  casinoEvidences, 
  casinoDiaryEntries, 
  casinoNewsArticles,
  casinoSuspects,
  casinoClues,
  casinoAssistantEffects,
  casinoEndings
} from '../data/casino-case';

interface GameContextType {
  windows: Window[];
  messages: Message[];
  evidences: Evidence[];
  diaryEntries: DiaryEntry[];
  newsArticles: NewsArticle[];
  gameState: GameState;
  selectedAssistant: AssistantType | null;
  isAIConfigured: boolean;
  deletedItems: DeletedItem[];
  showAssistantSelector: boolean;
  configureAI: (apiKey: string) => boolean;
  selectAssistant: (assistant: AssistantType) => void;
  openWindow: (type: Window['type']) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  activateWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  markEvidenceAs: (id: string, status: 'authentic' | 'altered') => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (id: string) => void;
  sendMessage: (to: string, content: string) => Promise<void>;
  analyzeEvidence: (id: string) => Promise<void>;
  searchInformation: (query: string) => Promise<string>;
  moveToRecycleBin: (itemType: 'message' | 'evidence' | 'note', id: string) => void;
  restoreFromBin: (id: string) => void;
  emptyBin: () => void;
  openAssistantConfig: () => void;
  closeAssistantConfig: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [messages, setMessages] = useState<Message[]>(casinoMessages);
  const [evidences, setEvidences] = useState<Evidence[]>(casinoEvidences);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(casinoDiaryEntries);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(casinoNewsArticles);
  const [gameState, setGameState] = useState<GameState>(casinoGameState);
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType | null>(null);
  const [isAIConfigured, setIsAIConfigured] = useState<boolean>(true); // Configurado por padrão
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([]);
  const [showAssistantSelector, setShowAssistantSelector] = useState<boolean>(true);

  // Configurar a IA com a API key
  const configureAI = (apiKey: string): boolean => {
    if (!selectedAssistant) {
      console.error('Nenhum assistente selecionado');
      return false;
    }
    
    const success = aiService.configure({
      apiKey,
      selectedAssistant
    });
    
    setIsAIConfigured(success);
    return success;
  };

  // Selecionar um assistente
  const selectAssistant = (assistant: AssistantType) => {
    setSelectedAssistant(assistant);
    
    if (aiService.isReady()) {
      aiService.setAssistant(assistant);
    }
    
    // Adicionar entrada no diário sobre a escolha do assistente
    addDiaryEntry({
      title: 'Assistente contratado',
      content: `Contratei ${getAssistantFullName(assistant)} como meu assistente para o caso do Delegado Gustavo Ferraz.`,
      type: 'conclusion',
    });
    
    // Adicionar pista única baseada no assistente escolhido
    const assistantEffect = casinoAssistantEffects[assistant];
    if (assistantEffect && assistantEffect.uniqueClue) {
      setTimeout(() => {
        addDiaryEntry({
          title: 'Informação exclusiva',
          content: assistantEffect.uniqueClue,
          type: 'conclusion',
        });
      }, 5000);
    }
  };

  // Obter nome completo do assistente
  const getAssistantFullName = (assistant: AssistantType): string => {
    switch (assistant) {
      case 'rico': return 'Ricardo "Rico" Belmont';
      case 'clara': return 'Clara Maia';
      case 'hacker': return 'Bárbara "Hacker"';
      case 'lurdes': return 'Dona Lurdes';
      case 'ice': return 'Dra. Ice';
      default: return 'Assistente desconhecido';
    }
  };

  const openWindow = (type: Window['type']) => {
    const newWindow: Window = {
      id: `${type}-${Date.now()}`,
      title: type === 'messages' ? 'E-mails' : 
             type === 'detective' ? 'DetectivePro' : 
             type === 'diary' ? 'Diário Digital' : 
             type === 'news' ? 'A Verdade' : 
             type === 'recycle' ? 'Lixeira' : 'Janela',
      type,
      isMinimized: false,
      isActive: true,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      size: {
        width: 800,
        height: 600,
      }
    };
    
    // Desativa todas as outras janelas
    setWindows(prev => [
      ...prev.map(w => ({ ...w, isActive: false })),
      newWindow
    ]);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true, isActive: false } : w
    ));
  };

  const activateWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, isActive: true } : { ...w, isActive: false }
    ));
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position: { x, y } } : w
    ));
  };

  const markEvidenceAs = (id: string, status: 'authentic' | 'altered') => {
    setEvidences(prev => prev.map(e => 
      e.id === id ? { ...e, marked: status } : e
    ));
    
    // Adiciona entrada no diário automaticamente
    const evidence = evidences.find(e => e.id === id);
    if (evidence) {
      addDiaryEntry({
        title: `Análise: ${evidence.name}`,
        content: `Marquei a evidência "${evidence.name}" como ${status === 'authentic' ? 'autêntica' : 'alterada'}.`,
        type: 'evidence',
        relatedTo: [id]
      });
      
      // Atualizar progresso do jogo
      updateGameProgress();
    }
  };

  const addDiaryEntry = (entry: Omit<DiaryEntry, 'id' | 'timestamp'>) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: `diary-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setDiaryEntries(prev => [...prev, newEntry]);
    
    // Verificar se é uma descoberta importante
    if (entry.type === 'conclusion' && entry.content.includes('Comissário Rogério')) {
      updateGameProgress();
    }
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
  };

  // Enviar mensagem para um NPC
  const sendMessage = async (to: string, content: string) => {
    // Adicionar mensagem do jogador
    const playerMessageId = `msg-player-${Date.now()}`;
    const playerMessage: Message = {
      id: playerMessageId,
      sender: 'Você',
      content,
      timestamp: new Date().toISOString(),
      read: true,
    };
    
    setMessages(prev => [...prev, playerMessage]);
    
    // Obter histórico de mensagens para contexto
    const conversationHistory = messages
      .filter(m => m.sender === to || m.sender === 'Você')
      .map(m => `${m.sender}: ${m.content}`);
    
    // Gerar resposta do NPC usando IA
    let npcResponse = '';
    try {
      // Usar prompt específico do caso do cassino
      if (selectedAssistant) {
        npcResponse = await aiService.generateNPCResponseWithCustomPrompt(
          buildCasinoNPCPrompt(to, content, conversationHistory, selectedAssistant)
        );
      } else {
        // Fallback para o método padrão se não houver assistente selecionado
        npcResponse = await aiService.generateNPCResponse(
          to,
          getSuspectRelation(to),
          content,
          conversationHistory
        );
      }
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      npcResponse = `<p><em>${to} parece confuso</em></p><p>Desculpe, não entendi bem. Pode repetir?</p>`;
    }
    
    // Adicionar resposta do NPC
    const npcMessageId = `msg-npc-${Date.now()}`;
    const npcMessage: Message = {
      id: npcMessageId,
      sender: to,
      content: npcResponse,
      timestamp: new Date(Date.now() + 5000).toISOString(), // 5 segundos depois
      read: false,
    };
    
    // Simular delay na resposta
    setTimeout(() => {
      setMessages(prev => [...prev, npcMessage]);
      
      // Adicionar entrada no diário
      addDiaryEntry({
        title: `Conversa com ${to}`,
        content: `Perguntei: "${content}"\n\nResposta: "${npcResponse.replace(/<[^>]*>/g, '')}"`,
        type: 'conversation',
        relatedTo: [playerMessageId, npcMessageId]
      });
      
      // Atualizar confiança do NPC
      updateNPCTrust(to, content);
      
      // Verificar se é uma conversa importante para o progresso
      if (content.toLowerCase().includes('comissário') || 
          content.toLowerCase().includes('rogério') || 
          content.toLowerCase().includes('arma') || 
          content.toLowerCase().includes('assassinato')) {
        updateGameProgress();
      }
    }, 2000);
  };

  // Obter relação do suspeito
  const getSuspectRelation = (npcName: string): string => {
    const suspect = casinoSuspects[npcName as keyof typeof casinoSuspects];
    if (suspect) {
      return suspect.relation;
    }
    
    // Relações padrão para outros NPCs
    switch (npcName) {
      case 'Comissário Rogério Silva':
        return 'comissário de polícia e colega do falecido Delegado Gustavo Ferraz';
      case 'Vicente Barbosa':
        return 'dono do cassino Ouro de Midas e empresário influente em Neo Aurora';
      case 'Isabela Ferraz':
        return 'viúva do Delegado Gustavo Ferraz';
      case 'Marcela Dantas':
        return 'jornalista investigativa do jornal A Verdade';
      case 'Dante Moretti':
        return 'empresário italiano com negócios suspeitos em Neo Aurora';
      case 'Dr. Leandro Moura':
        return 'advogado que representava o Delegado Gustavo Ferraz';
      default:
        return 'pessoa relacionada ao caso do Delegado Gustavo Ferraz';
    }
  };

  // Atualizar nível de confiança do NPC
  const updateNPCTrust = (npcName: string, playerMessage: string) => {
    // Mapear nome do NPC para chave no estado
    let npcKey = '';
    if (npcName.includes('Vicente')) npcKey = 'vicente';
    else if (npcName.includes('Isabela')) npcKey = 'isabela';
    else if (npcName.includes('Rogério') || npcName.includes('Comissário')) npcKey = 'rogerio';
    else if (npcName.includes('Marcela')) npcKey = 'marcela';
    else if (npcName.includes('Dante')) npcKey = 'dante';
    else if (npcName.includes('Leandro')) npcKey = 'leandro';
    
    if (!npcKey || !gameState.npcTrust[npcKey]) return;
    
    let trustChange = 0;
    
    // Mensagens agressivas diminuem confiança
    if (playerMessage.includes('!') || 
        /\b(ment|mentir|mentiu|mentiroso|falso)\b/i.test(playerMessage)) {
      trustChange -= 5;
    }
    
    // Mensagens educadas aumentam confiança
    if (/\b(por favor|obrigad|gentil|ajudar)\b/i.test(playerMessage)) {
      trustChange += 3;
    }
    
    // Efeitos especiais baseados no assistente selecionado
    if (selectedAssistant) {
      // Rico tem efeito especial com Vicente (dono do cassino)
      if (selectedAssistant === 'rico' && npcKey === 'vicente') {
        trustChange += 5;
      }
      
      // Rico tem efeito negativo com Marcela (jornalista)
      if (selectedAssistant === 'rico' && npcKey === 'marcela') {
        trustChange -= 3;
      }
      
      // Clara tem efeito especial com Isabela (viúva)
      if (selectedAssistant === 'clara' && npcKey === 'isabela') {
        trustChange += 5;
      }
      
      // Clara tem efeito negativo com Dante (mafioso)
      if (selectedAssistant === 'clara' && npcKey === 'dante') {
        trustChange -= 3;
      }
      
      // Hacker tem efeito negativo com Vicente e Leandro
      if (selectedAssistant === 'hacker' && (npcKey === 'vicente' || npcKey === 'leandro')) {
        trustChange -= 3;
      }
      
      // Lurdes tem efeito especial com todos (fofocas)
      if (selectedAssistant === 'lurdes') {
        trustChange += 2;
      }
      
      // Ice tem efeito negativo com Dante
      if (selectedAssistant === 'ice' && npcKey === 'dante') {
        trustChange -= 3;
      }
    }
    
    // Atualizar estado
    setGameState(prev => ({
      ...prev,
      npcTrust: {
        ...prev.npcTrust,
        [npcKey]: Math.max(0, Math.min(100, prev.npcTrust[npcKey] + trustChange))
      }
    }));
  };

  // Analisar evidência usando IA
  const analyzeEvidence = async (id: string) => {
    const evidence = evidences.find(e => e.id === id);
    if (!evidence) return;
    
    try {
      // Usar prompt específico do caso do cassino
      const analysis = await aiService.analyzeEvidenceWithCustomPrompt(
        buildCasinoEvidencePrompt(evidence.type, evidence.description)
      );
      
      // Atualizar evidência com análise
      setEvidences(prev => prev.map(e => 
        e.id === id ? { ...e, analysis } : e
      ));
      
      // Adicionar entrada no diário
      addDiaryEntry({
        title: `Análise forense: ${evidence.name}`,
        content: `Relatório do DetectivePro:\n${analysis.replace(/<[^>]*>/g, '')}`,
        type: 'evidence',
        relatedTo: [id]
      });
      
      // Atualizar estado do jogo
      setGameState(prev => ({
        ...prev,
        completedAnalysis: [...prev.completedAnalysis, id]
      }));
      
      // Atualizar progresso do jogo
      updateGameProgress();
      
    } catch (error) {
      console.error('Erro ao analisar evidência:', error);
    }
  };

  // Pesquisar informações usando IA
  const searchInformation = async (query: string): Promise<string> => {
    // Verificar se ainda há pesquisas disponíveis
    if (gameState.searchesRemaining <= 0) {
      return `<div class="search-results">
        <p class="search-query">Resultados para: ${query}</p>
        <p class="search-error">Limite de pesquisas diárias atingido.</p>
        <p class="search-tip">Tente novamente amanhã ou atualize seu plano GooGle Premium.</p>
      </div>`;
    }
    
    try {
      // Usar prompt específico do caso do cassino
      const results = selectedAssistant 
        ? await aiService.searchInformationWithCustomPrompt(
            buildCasinoSearchPrompt(query, selectedAssistant)
          )
        : await aiService.searchInformation(query);
      
      // Diminuir contador de pesquisas
      setGameState(prev => ({
        ...prev,
        searchesRemaining: prev.searchesRemaining - 1
      }));
      
      // Adicionar entrada no diário
      addDiaryEntry({
        title: `Pesquisa: ${query}`,
        content: `Realizei uma pesquisa sobre "${query}" no GooGle.\n\nResultados principais: ${results.replace(/<[^>]*>/g, '').substring(0, 200)}...`,
        type: 'conclusion',
      });
      
      // Verificar se é uma pesquisa importante para o progresso
      if (query.toLowerCase().includes('comissário') || 
          query.toLowerCase().includes('rogério') || 
          query.toLowerCase().includes('arma') || 
          query.toLowerCase().includes('delegado')) {
        updateGameProgress();
      }
      
      return results;
    } catch (error) {
      console.error('Erro ao pesquisar informações:', error);
      return `<div class="search-results">
        <p class="search-query">Resultados para: ${query}</p>
        <p class="search-error">Erro de conexão. Servidor GooGle indisponível.</p>
        <p class="search-tip">Tente novamente mais tarde ou verifique sua conexão dial-up.</p>
      </div>`;
    }
  };

  // Atualizar progresso do jogo
  const updateGameProgress = () => {
    setGameState(prev => {
      // Calcular novo progresso
      const totalEvidences = casinoEvidences.length;
      const analyzedEvidences = prev.completedAnalysis.length;
      const totalSuspects = Object.keys(casinoSuspects).length;
      const interviewedSuspects = new Set(
        messages
          .filter(m => m.sender !== 'Você' && m.sender !== 'Sistema')
          .map(m => m.sender)
      ).size;
      
      // Calcular progresso como porcentagem (0-100)
      const newProgress = Math.min(
        100,
        Math.floor(
          ((analyzedEvidences / totalEvidences) * 50) + 
          ((interviewedSuspects / totalSuspects) * 30) +
          (prev.discoveredClues.length * 5)
        )
      );
      
      // Verificar se descobriu novas pistas
      let discoveredClues = [...prev.discoveredClues];
      
      // Verificar condições para descobrir pistas específicas
      const diaryContent = diaryEntries.map(entry => entry.content.toLowerCase()).join(' ');
      
      // Dossiê secreto
      if (!discoveredClues.includes('clue-1') && 
          (diaryContent.includes('dossiê') || diaryContent.includes('provas contra'))) {
        discoveredClues.push('clue-1');
        
        // Adicionar entrada no diário
        setTimeout(() => {
          addDiaryEntry({
            title: 'Pista descoberta: Dossiê secreto',
            content: 'Descobri a existência de um dossiê secreto que o delegado mantinha com provas contra vários suspeitos, incluindo o Comissário Rogério.',
            type: 'conclusion',
          });
        }, 1000);
      }
      
      // Gravação de áudio
      if (!discoveredClues.includes('clue-2') && 
          selectedAssistant === 'hacker' && 
          newProgress > 30) {
        discoveredClues.push('clue-2');
        
        // Adicionar entrada no diário
        setTimeout(() => {
          addDiaryEntry({
            title: 'Pista descoberta: Gravação de áudio',
            content: 'Bárbara "Hacker" conseguiu acessar o computador da jornalista Marcela e encontrou uma gravação onde o Comissário Rogério ameaça o delegado.',
            type: 'conclusion',
          });
        }, 1000);
      }
      
      // Extrato bancário
      if (!discoveredClues.includes('clue-3') && 
          diaryContent.includes('dinheiro') && diaryContent.includes('cassino')) {
        discoveredClues.push('clue-3');
        
        // Adicionar entrada no diário
        setTimeout(() => {
          addDiaryEntry({
            title: 'Pista descoberta: Extrato bancário',
            content: 'Encontrei comprovantes de depósitos suspeitos na conta do delegado vindos do cassino Ouro de Midas.',
            type: 'conclusion',
          });
        }, 1000);
      }
      
      // Bilhete de amor
      if (!discoveredClues.includes('clue-4') && 
          selectedAssistant === 'lurdes' && 
          newProgress > 40) {
        discoveredClues.push('clue-4');
        
        // Adicionar entrada no diário
        setTimeout(() => {
          addDiaryEntry({
            title: 'Pista descoberta: Bilhete de amor',
            content: 'Dona Lurdes descobriu uma carta romântica entre Isabela e Dr. Leandro, confirmando o caso extraconjugal.',
            type: 'conclusion',
          });
        }, 1000);
      }
      
      // Registro de armas
      if (!discoveredClues.includes('clue-5') && 
          diaryContent.includes('arma') && diaryContent.includes('comissário')) {
        discoveredClues.push('clue-5');
        
        // Adicionar entrada no diário
        setTimeout(() => {
          addDiaryEntry({
            title: 'Pista descoberta: Registro de armas',
            content: 'Encontrei um documento mostrando que o Comissário Rogério possui uma arma do mesmo calibre da usada no crime.',
            type: 'conclusion',
          });
        }, 1000);
      }
      
      // Verificar condições para finais
      checkForEndings(newProgress, discoveredClues);
      
      return {
        ...prev,
        gameProgress: newProgress,
        discoveredClues
      };
    });
  };

  // Verificar condições para finais do jogo
  const checkForEndings = (progress: number, discoveredClues: string[]) => {
    // Final correto - Acusar o Comissário Rogério com provas suficientes
    if (progress >= 80 && discoveredClues.includes('clue-2') && discoveredClues.includes('clue-5')) {
      const hasAccusedRogerio = diaryEntries.some(entry => 
        entry.content.toLowerCase().includes('acuso') && 
        entry.content.toLowerCase().includes('rogério') &&
        entry.content.toLowerCase().includes('assassinato')
      );
      
      if (hasAccusedRogerio) {
        triggerEnding('correct');
        return;
      }
    }
    
    // Final errado - Acusar pessoa errada
    const hasAccusedWrongPerson = diaryEntries.some(entry => 
      entry.content.toLowerCase().includes('acuso') && 
      !entry.content.toLowerCase().includes('rogério') &&
      (
        entry.content.toLowerCase().includes('vicente') ||
        entry.content.toLowerCase().includes('isabela') ||
        entry.content.toLowerCase().includes('marcela') ||
        entry.content.toLowerCase().includes('dante') ||
        entry.content.toLowerCase().includes('leandro')
      )
    );
    
    if (hasAccusedWrongPerson) {
      triggerEnding('wrong');
      return;
    }
    
    // Final de fuga - Reunir todas as provas mas demorar para apresentá-las
    const gameStartDate = new Date(casinoMessages[0].timestamp);
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate.getTime() - gameStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (progress >= 90 && daysPassed >= 20) {
      triggerEnding('escape');
      return;
    }
    
    // Final de morte - Confrontar o Comissário sem provas suficientes
    const hasConfrontedRogerio = diaryEntries.some(entry => 
      entry.content.toLowerCase().includes('confrontei') && 
      entry.content.toLowerCase().includes('rogério')
    );
    
    if (hasConfrontedRogerio && progress < 60) {
      triggerEnding('death');
      return;
    }
    
    // Final encoberto - Não apresentar acusação após muito tempo
    if (daysPassed >= 30 && progress < 70) {
      triggerEnding('covered');
      return;
    }
  };

  // Disparar final do jogo
  const triggerEnding = (endingKey: keyof typeof casinoEndings) => {
    const ending = casinoEndings[endingKey];
    
    // Adicionar entrada no diário
    addDiaryEntry({
      title: `CONCLUSÃO DO CASO: ${ending.title}`,
      content: ending.description,
      type: 'conclusion',
    });
    
    // Adicionar mensagem final
    const finalMessage: Message = {
      id: `ending-${Date.now()}`,
      sender: 'Sistema',
      content: `<h2>Caso encerrado: ${ending.title}</h2><p>${ending.description}</p>`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setMessages(prev => [...prev, finalMessage]);
  };

  // Mover item para a lixeira
  const moveToRecycleBin = (itemType: 'message' | 'evidence' | 'note', id: string) => {
    let itemToDelete: DeletedItem | null = null;
    
    if (itemType === 'message') {
      const message = messages.find(m => m.id === id);
      if (message) {
        itemToDelete = {
          id,
          name: `Mensagem de ${message.sender}`,
          type: 'message',
          originalData: message,
          deletedAt: new Date().toISOString()
        };
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } else if (itemType === 'evidence') {
      const evidence = evidences.find(e => e.id === id);
      if (evidence) {
        itemToDelete = {
          id,
          name: evidence.name,
          type: 'evidence',
          originalData: evidence,
          deletedAt: new Date().toISOString()
        };
        setEvidences(prev => prev.filter(e => e.id !== id));
      }
    } else if (itemType === 'note') {
      const entry = diaryEntries.find(e => e.id === id);
      if (entry) {
        itemToDelete = {
          id,
          name: entry.title,
          type: 'note',
          originalData: entry,
          deletedAt: new Date().toISOString()
        };
        setDiaryEntries(prev => prev.filter(e => e.id !== id));
      }
    }
    
    if (itemToDelete) {
      setDeletedItems(prev => [...prev, itemToDelete!]);
    }
  };

  // Restaurar item da lixeira
  const restoreFromBin = (id: string) => {
    const item = deletedItems.find(i => i.id === id);
    if (!item) return;
    
    if (item.type === 'message') {
      setMessages(prev => [...prev, item.originalData as Message]);
    } else if (item.type === 'evidence') {
      setEvidences(prev => [...prev, item.originalData as Evidence]);
    } else if (item.type === 'note') {
      setDiaryEntries(prev => [...prev, item.originalData as DiaryEntry]);
    }
    
    setDeletedItems(prev => prev.filter(i => i.id !== id));
  };

  // Esvaziar lixeira
  const emptyBin = () => {
    setDeletedItems([]);
  };

  // Abrir configuração do assistente
  const openAssistantConfig = () => {
    setShowAssistantSelector(true);
  };

  // Fechar configuração do assistente
  const closeAssistantConfig = () => {
    setShowAssistantSelector(false);
  };

  return (
    <GameContext.Provider value={{
      windows,
      messages,
      evidences,
      diaryEntries,
      newsArticles,
      gameState,
      selectedAssistant,
      isAIConfigured,
      deletedItems,
      showAssistantSelector,
      configureAI,
      selectAssistant,
      openWindow,
      closeWindow,
      minimizeWindow,
      activateWindow,
      moveWindow,
      markEvidenceAs,
      addDiaryEntry,
      markMessageAsRead,
      sendMessage,
      analyzeEvidence,
      searchInformation,
      moveToRecycleBin,
      restoreFromBin,
      emptyBin,
      openAssistantConfig,
      closeAssistantConfig,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
