import { AssistantType } from '../lib/ai-service';

// Interface para janelas
export interface Window {
  id: string;
  title: string;
  type: 'messages' | 'detective' | 'diary' | 'news' | 'recycle';
  isMinimized: boolean;
  isActive: boolean;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

// Interface para estado do jogo
export interface GameState {
  currentCase: string;
  npcTrust: {
    [key: string]: number;
  };
  discoveredClues: string[];
  completedAnalysis: string[];
  gameProgress: number;
  searchesRemaining: number;
}

// Interface para mensagens
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Interface para evidências
export interface Evidence {
  id: string;
  type: 'photo' | 'weapon' | 'document' | 'fingerprint' | 'other';
  name: string;
  description: string;
  marked: 'authentic' | 'altered' | null;
  analysis?: string;
}

// Interface para entradas do diário
export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  type: 'conclusion' | 'evidence' | 'conversation';
  relatedTo?: string[];
}

// Interface para artigos de notícias
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  date: string;
  isClue: boolean;
}

// Interface para itens deletados
export interface DeletedItem {
  id: string;
  name: string;
  type: 'message' | 'evidence' | 'note';
  originalData: any;
  deletedAt: string;
}

export interface GameContextType {
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
