// Prompts específicos para o caso do cassino adaptados para Ollama

import { AssistantType } from './ai-service';
import { casinoSuspects, casinoAssistantEffects } from '../data/casino-case';

// Função para construir o prompt do NPC com base no suspeito e no assistente selecionado
export function buildCasinoNPCPrompt(
  npcName: string,
  playerMessage: string,
  conversationHistory: string[] = [],
  selectedAssistant: AssistantType
): string {
  // Obter informações do suspeito
  const suspect = casinoSuspects[npcName as keyof typeof casinoSuspects];
  if (!suspect) {
    return buildGenericNPCPrompt(npcName, playerMessage, conversationHistory, selectedAssistant);
  }

  // Obter efeitos do assistente
  const assistantEffect = casinoAssistantEffects[selectedAssistant];
  
  // Construir contexto do assistente específico para este suspeito
  let assistantContext = '';
  
  if (selectedAssistant === 'rico' && npcName === 'Vicente Barbosa') {
    assistantContext = 'Você respeita Rico Belmont por seu status social e riqueza. Você se sente mais à vontade para compartilhar informações privilegiadas com ele.';
  } else if (selectedAssistant === 'clara' && npcName === 'Isabela Ferraz') {
    assistantContext = 'Você se identifica com Clara Maia e sente que pode confiar nela. Você está mais disposta a falar sobre seu relacionamento com o delegado.';
  } else if (selectedAssistant === 'hacker' && (npcName === 'Vicente Barbosa' || npcName === 'Dr. Leandro Moura')) {
    assistantContext = 'Você está desconfiado da presença de Bárbara "Hacker". Você teme que ela possa acessar informações que você quer manter em segredo.';
  } else if (selectedAssistant === 'lurdes' && npcName === 'Dr. Leandro Moura') {
    assistantContext = 'Você fica nervoso com Dona Lurdes, pois sabe que ela é conhecida por espalhar fofocas. Você teme que ela já saiba sobre seu caso com Isabela.';
  } else if (selectedAssistant === 'ice' && npcName === 'Comissário Rogério Silva') {
    assistantContext = 'Você se sente analisado pela Dra. Ice e isso te deixa desconfortável. Você tenta controlar suas expressões faciais e tom de voz.';
  } else {
    // Efeito padrão baseado no assistante
    assistantContext = `O detetive está acompanhado por ${getAssistantFullName(selectedAssistant)}. ${assistantEffect.specialEffect}`;
  }

  // Histórico da conversa formatado
  const historyText = conversationHistory.length > 0 
    ? `\nHistórico da conversa:\n${conversationHistory.join('\n')}` 
    : '';

  // Construir o prompt completo
  return `Você é ${npcName}, ${suspect.description}. Você é ${suspect.relation} na cidade de Neo Aurora em 2004.

Seu segredo: ${suspect.secretInfo}

Seu álibi para a noite do crime: ${suspect.alibi}

Seu possível motivo para o crime: ${suspect.motive}

Você ${suspect.isGuilty ? 'É O VERDADEIRO CULPADO pelo assassinato do Delegado Gustavo Ferraz.' : 'NÃO é culpado pelo assassinato do Delegado Gustavo Ferraz.'}

Regras para suas respostas:
1. Use *ações* entre asteriscos para descrever comportamentos: *'Acende um cigarro nervosamente'*
2. Use gírias dos anos 2000 como "Tá ligado?", "Mó treta!", "Falou e disse", etc.
3. Nunca confesse diretamente! Mesmo se for culpado, dê apenas pistas indiretas.
4. Suas respostas devem ser curtas (máximo 3 parágrafos)
5. Reação ao assistente do detetive:
   ${assistantContext}
6. Esconda informações e minta se for do seu interesse
7. Responda sempre como ${npcName}, nunca quebre o personagem
8. Formato de e-mail: Suas respostas devem parecer um e-mail formal ou informal, dependendo da sua personalidade

${historyText}

Mensagem do detetive: "${playerMessage}"

Resposta de ${npcName}:`;
}

// Função para construir um prompt genérico para NPCs não-suspeitos
function buildGenericNPCPrompt(
  npcName: string,
  playerMessage: string,
  conversationHistory: string[] = [],
  selectedAssistant: AssistantType
): string {
  // Determinar a relação do NPC
  let npcRelation = '';
  switch (npcName) {
    case 'Recepcionista do Cassino':
      npcRelation = 'funcionário do cassino Ouro de Midas que controla a entrada de visitantes';
      break;
    case 'Bartender do Cassino':
      npcRelation = 'bartender que trabalha no cassino Ouro de Midas há 5 anos e ouve muitas conversas';
      break;
    case 'Secretária da Delegacia':
      npcRelation = 'secretária que trabalhava diretamente com o Delegado Gustavo Ferraz';
      break;
    case 'Faxineira da Delegacia':
      npcRelation = 'faxineira que limpa a delegacia todas as noites e vê muitas coisas';
      break;
    default:
      npcRelation = 'pessoa que conhece detalhes sobre o caso do Delegado Gustavo Ferraz';
  }

  // Histórico da conversa formatado
  const historyText = conversationHistory.length > 0 
    ? `\nHistórico da conversa:\n${conversationHistory.join('\n')}` 
    : '';

  return `Você é ${npcName}, ${npcRelation} na cidade de Neo Aurora em 2004.

Regras para suas respostas:
1. Use *ações* entre asteriscos para descrever comportamentos: *'Olha para os lados nervosamente'*
2. Use gírias dos anos 2000 como "Tá ligado?", "Mó treta!", "Falou e disse", etc.
3. Você conhece alguns detalhes sobre o caso, mas não é um suspeito principal
4. Suas respostas devem ser curtas (máximo 2 parágrafos)
5. O detetive está acompanhado por ${getAssistantFullName(selectedAssistant)}
6. Responda sempre como ${npcName}, nunca quebre o personagem
7. Formato de e-mail: Suas respostas devem parecer um e-mail formal ou informal, dependendo da sua personalidade

${historyText}

Mensagem do detetive: "${playerMessage}"

Resposta de ${npcName}:`;
}

// Função para construir o prompt de análise de evidência para o caso do cassino
export function buildCasinoEvidencePrompt(
  evidenceType: string,
  evidenceDescription: string
): string {
  return `Você é um software de análise forense dos anos 2000 chamado DetectivePro, especializado em casos de homicídio. 
Analise a seguinte evidência do tipo ${evidenceType} relacionada ao assassinato do Delegado Gustavo Ferraz:

"${evidenceDescription}"

Seu relatório deve:
1. Ser técnico e objetivo, usando terminologia forense dos anos 2000
2. Identificar detalhes importantes que um detetive deveria notar
3. Sugerir possíveis interpretações relacionadas ao caso do delegado assassinado
4. Ter no máximo 3 parágrafos
5. Incluir uma conclusão preliminar
6. Sutilmente sugerir conexões com o Comissário Rogério Silva (o verdadeiro culpado)

Formato do relatório:
===== DETECTIVEPRO v3.5 =====
ANÁLISE DE ${evidenceType.toUpperCase()}
[Seu relatório aqui]
==========================`;
}

// Função para construir o prompt de pesquisa para o caso do cassino
export function buildCasinoSearchPrompt(
  query: string,
  selectedAssistant: AssistantType
): string {
  let hackerMode = '';
  if (selectedAssistant === 'hacker') {
    hackerMode = `\n\n6. Adicione uma seção especial no final:
🔓 [HACKER MODE]: Arquivo confidencial: "[Informação secreta relacionada à busca que sugere o envolvimento do Comissário Rogério]"`;
  }

  return `Você é um motor de busca chamado "GooGle" dos anos 2000 em Neo Aurora. 
Simule resultados de busca para a seguinte consulta relacionada ao caso do Delegado Gustavo Ferraz:

"${query}"

Regras:
1. Forneça apenas 3-5 resultados curtos
2. Use formato de resultados de busca antigos (2004)
3. Inclua datas entre 2002-2004
4. Alguns resultados devem ser úteis para o caso, outros irrelevantes
5. Inclua um "link" quebrado${hackerMode}

Os resultados devem incluir informações sobre o caso do delegado assassinado, o cassino Ouro de Midas, 
ou os suspeitos (Vicente Barbosa, Isabela Ferraz, Comissário Rogério Silva, Marcela Dantas, 
Dante Moretti, Dr. Leandro Moura).`;
}

// Função auxiliar para obter o nome completo do assistente
function getAssistantFullName(assistant: AssistantType): string {
  switch (assistant) {
    case 'rico': return 'Ricardo "Rico" Belmont (O Playboy)';
    case 'clara': return 'Clara Maia (A Mãe Coruja)';
    case 'hacker': return 'Bárbara "Hacker" (A Ex-Criminosa)';
    case 'lurdes': return 'Dona Lurdes (A Fofoqueira)';
    case 'ice': return 'Dra. Ice (A Psicóloga)';
    default: return 'um assistente desconhecido';
  }
}
