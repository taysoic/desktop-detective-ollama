import axios from 'axios';
import { marked } from 'marked';
import { AssistantType } from './ai-service';

// Interface para configuração da IA
export interface AIConfig {
  apiKey: string; // Mantido para compatibilidade, não usado com Ollama
  selectedAssistant: AssistantType;
}

// URL base para a API do Ollama (normalmente local)
const OLLAMA_API_URL = 'http://localhost:11434/api';

// Modelo padrão do Ollama a ser usado
const DEFAULT_MODEL = 'llama3';

// Classe principal do serviço de IA
export class AIService {
  private selectedAssistant: AssistantType = 'rico';
  private isConfigured = false;
  private modelName: string = DEFAULT_MODEL;

  constructor() {
    // Inicializa automaticamente
    this.isConfigured = true;
    console.log('Serviço de IA com Ollama inicializado automaticamente');
  }

  // Configurar o serviço
  configure(config: AIConfig): boolean {
    try {
      this.selectedAssistant = config.selectedAssistant;
      console.log(`Serviço de IA configurado com assistente: ${this.selectedAssistant}`);
      return true;
    } catch (error) {
      console.error('Erro ao configurar serviço de IA:', error);
      return false;
    }
  }

  // Verificar se o serviço está configurado
  isReady(): boolean {
    return this.isConfigured;
  }

  // Obter o assistente selecionado
  getSelectedAssistant(): AssistantType {
    return this.selectedAssistant;
  }

  // Alterar o assistente selecionado
  setAssistant(assistant: AssistantType): void {
    this.selectedAssistant = assistant;
    console.log(`Assistente alterado para: ${this.selectedAssistant}`);
  }

  // Gerar resposta de NPC com base no prompt
  async generateNPCResponse(
    npcName: string, 
    npcRelation: string, 
    playerMessage: string, 
    conversationHistory: string[] = []
  ): Promise<string> {
    if (!this.isReady()) {
      return this.getFallbackResponse(npcName);
    }

    try {
      const prompt = this.buildNPCPrompt(npcName, npcRelation, playerMessage, conversationHistory);
      
      const response = await this.generateOllamaResponse(prompt, 0.7);
      
      // Processar o markdown para HTML
      const htmlResponse = marked(response);
      
      return htmlResponse;
    } catch (error) {
      console.error('Erro ao gerar resposta do NPC:', error);
      return this.getFallbackResponse(npcName);
    }
  }

  // Gerar resposta de NPC com prompt personalizado
  async generateNPCResponseWithCustomPrompt(prompt: string): Promise<string> {
    if (!this.isReady()) {
      return this.getFallbackResponse("NPC");
    }

    try {
      const response = await this.generateOllamaResponse(prompt, 0.7);
      
      // Processar o markdown para HTML
      const htmlResponse = marked(response);
      
      return htmlResponse;
    } catch (error) {
      console.error('Erro ao gerar resposta do NPC com prompt personalizado:', error);
      return this.getFallbackResponse("NPC");
    }
  }

  // Construir o prompt para o NPC com base no assistente selecionado
  private buildNPCPrompt(
    npcName: string, 
    npcRelation: string, 
    playerMessage: string, 
    conversationHistory: string[]
  ): string {
    const assistantContext = this.getAssistantContext();
    const historyText = conversationHistory.length > 0 
      ? `\nHistórico da conversa:\n${conversationHistory.join('\n')}` 
      : '';

    return `Você é ${npcName}, ${npcRelation}. Você está em um jogo de detetive ambientado nos anos 2000.

Regras:
1. Use *ações* entre asteriscos para descrever comportamentos: *'Acende um Marlboro'*
2. Use gírias dos anos 2000 como "Tá ligado?", "Mó treta!", "Falou e disse", etc.
3. Nunca confesse diretamente! Dê pistas indiretas como: "Talvez... se você checar o porão"
4. Suas respostas devem ser curtas (máximo 3 parágrafos)
5. Reaja ao assistente do jogador:
   ${assistantContext}
6. Esconda informações e minta se for do seu interesse
7. Responda sempre como ${npcName}, nunca quebre o personagem

${historyText}

Mensagem do jogador: "${playerMessage}"

Resposta de ${npcName}:`;
  }

  // Obter contexto específico do assistente selecionado
  private getAssistantContext(): string {
    switch (this.selectedAssistant) {
      case 'rico':
        return `- O jogador está com Ricardo "Rico" Belmont (O Playboy)
   - Reaja com: "Quer comprar meu silêncio?"
   - Se você for um NPC rico/poderoso: seja mais cooperativo
   - Se você for um NPC pobre: recuse-se a falar ou seja hostil`;
      
      case 'clara':
        return `- O jogador está com Clara Maia (A Mãe Coruja)
   - Se você for pai/mãe: dê informações extras, seja mais aberto
   - Mencione seus próprios filhos ou família se tiver`;
      
      case 'hacker':
        return `- O jogador está com Bárbara "Hacker" (A Ex-Criminosa)
   - Mostre medo ou respeito
   - Mencione que "ouviu falar dela" ou "conhece sua reputação"
   - Ocasionalmente, revele informações confidenciais por medo`;
      
      case 'lurdes':
        return `- O jogador está com Dona Lurdes (A Fofoqueira)
   - Reaja com: "Ai, dona Lurdes, conta tudo!"
   - Compartilhe fofocas ou segredos que normalmente não contaria
   - Seja mais falante e divague um pouco`;
      
      case 'ice':
        return `- O jogador está com Dra. Ice (A Psicóloga)
   - Revele traumas ou medos pessoais
   - Após 3 interações, tente encerrar a conversa
   - Mostre desconforto quando ela analisar seu comportamento`;
      
      default:
        return `- O jogador está com um assistente desconhecido
   - Seja neutro e cauteloso`;
    }
  }

  // Resposta de fallback caso a IA não esteja configurada
  private getFallbackResponse(npcName: string): string {
    const fallbacks = [
      `<p><em>${npcName} olha para você com desconfiança</em></p><p>Desculpe, não posso falar agora. Volte mais tarde quando o sistema estiver funcionando.</p>`,
      `<p><em>${npcName} parece nervoso</em></p><p>Tá ligado que esse sistema tá offline, né? Volta depois, mano.</p>`,
      `<p><em>Ajusta a gravata, desconfortável</em></p><p>Olha, eu até queria te ajudar, mas parece que tem algo errado com a conexão. Tenta de novo depois.</p>`
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Analisar evidência e gerar relatório
  async analyzeEvidence(
    evidenceType: string, 
    evidenceDescription: string
  ): Promise<string> {
    if (!this.isReady()) {
      return this.getFallbackAnalysis(evidenceType);
    }

    try {
      const prompt = `Você é um software de análise forense dos anos 2000 chamado DetectivePro. 
Analise a seguinte evidência do tipo ${evidenceType} e gere um relatório técnico curto:

"${evidenceDescription}"

Seu relatório deve:
1. Ser técnico e objetivo
2. Identificar detalhes importantes que um detetive deveria notar
3. Sugerir possíveis interpretações
4. Ter no máximo 3 parágrafos
5. Usar terminologia forense
6. Incluir uma conclusão preliminar

Formato do relatório:
===== DETECTIVEPRO v3.5 =====
ANÁLISE DE ${evidenceType.toUpperCase()}
[Seu relatório aqui]
==========================`;

      const response = await this.generateOllamaResponse(prompt, 0.6);
      
      // Processar o markdown para HTML
      const htmlResponse = marked(response);
      
      return htmlResponse;
    } catch (error) {
      console.error('Erro ao analisar evidência:', error);
      return this.getFallbackAnalysis(evidenceType);
    }
  }

  // Analisar evidência com prompt personalizado
  async analyzeEvidenceWithCustomPrompt(prompt: string): Promise<string> {
    if (!this.isReady()) {
      return this.getFallbackAnalysis("evidência");
    }

    try {
      const response = await this.generateOllamaResponse(prompt, 0.6);
      
      // Processar o markdown para HTML
      const htmlResponse = marked(response);
      
      return htmlResponse;
    } catch (error) {
      console.error('Erro ao analisar evidência com prompt personalizado:', error);
      return this.getFallbackAnalysis("evidência");
    }
  }

  // Análise de fallback caso a IA não esteja configurada
  private getFallbackAnalysis(evidenceType: string): string {
    return `<pre>===== DETECTIVEPRO v3.5 =====
ANÁLISE DE ${evidenceType.toUpperCase()}
Análise indisponível. Sistema offline.
Verifique a conexão e tente novamente.
==========================</pre>`;
  }

  // Pesquisar informações no "GooGle"
  async searchInformation(query: string): Promise<string> {
    if (!this.isReady()) {
      return this.getFallbackSearch(query);
    }

    try {
      let prompt = `Você é um motor de busca chamado "GooGle" dos anos 2000. 
Simule resultados de busca para a seguinte consulta:

"${query}"

Regras:
1. Forneça apenas 3-5 resultados curtos
2. Use formato de resultados de busca antigos
3. Inclua datas entre 1998-2005
4. Alguns resultados devem ser úteis, outros irrelevantes
5. Inclua um "link" quebrado`;

      // Adicionar contexto especial para o assistente Hacker
      if (this.selectedAssistant === 'hacker') {
        prompt += `\n\n6. Adicione uma seção especial no final:
🔓 [HACKER MODE]: Arquivo confidencial: "[Informação secreta relacionada à busca]"`;
      }

      const response = await this.generateOllamaResponse(prompt, 0.7);
      
      // Processar o markdown para HTML
      const htmlResponse = marked(response);
      
      return htmlResponse;
    } catch (error) {
      console.error('Erro ao pesquisar informações:', error);
      return this.getFallbackSearch(query);
    }
  }

  // Pesquisar informações com prompt personalizado
  async searchInformationWithCustomPrompt(prompt: string): Promise<string> {
    if (!this.isReady()) {
      return this.getFallbackSearch("consulta");
    }

    try {
      const response = await this.generateOllamaResponse(prompt, 0.7);
      
      // Processar o markdown para HTML
      const htmlResponse = marked(response);
      
      return htmlResponse;
    } catch (error) {
      console.error('Erro ao pesquisar informações com prompt personalizado:', error);
      return this.getFallbackSearch("consulta");
    }
  }

  // Pesquisa de fallback caso a IA não esteja configurada
  private getFallbackSearch(query: string): string {
    return `<div class="search-results">
  <p class="search-query">Resultados para: ${query}</p>
  <p class="search-error">Erro de conexão. Servidor GooGle indisponível.</p>
  <p class="search-tip">Tente novamente mais tarde ou verifique sua conexão dial-up.</p>
</div>`;
  }

  // Método para gerar resposta usando a API do Ollama
  private async generateOllamaResponse(prompt: string, temperature: number = 0.7): Promise<string> {
    try {
      const response = await axios.post(`${OLLAMA_API_URL}/generate`, {
        model: this.modelName,
        prompt: prompt,
        stream: false,
        options: {
          temperature: temperature,
          top_p: 0.95,
          top_k: 40,
          num_predict: 1000
        }
      });

      return response.data.response;
    } catch (error) {
      console.error('Erro ao chamar API do Ollama:', error);
      throw error;
    }
  }
}

// Instância singleton do serviço
export const aiService = new AIService();
