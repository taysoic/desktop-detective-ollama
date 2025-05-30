import { Message, Evidence, DiaryEntry, NewsArticle, GameState } from '../types';

// Estado inicial do jogo para o caso do cassino
export const casinoGameState: GameState = {
  currentCase: 'sangue-no-cassino',
  npcTrust: {
    'vicente': 50,
    'isabela': 50,
    'rogerio': 50,
    'marcela': 50,
    'dante': 50,
    'leandro': 50,
  },
  discoveredClues: [],
  completedAnalysis: [],
  gameProgress: 0,
  searchesRemaining: 3,
};

// Mensagens iniciais para o caso do cassino
export const casinoMessages: Message[] = [
  {
    id: 'casino-1',
    sender: 'Comissário Rogério Silva',
    content: 'Detetive, precisamos de sua ajuda urgente. O Delegado Gustavo Ferraz foi encontrado morto em seu escritório com um tiro na cabeça. Há um bilhete misterioso com os dizeres "A justiça chegou para você". Investigue imediatamente.',
    timestamp: '2004-06-15T08:30:00',
    read: false,
  },
  {
    id: 'casino-2',
    sender: 'Vicente Barbosa',
    content: 'Bom dia, detetive. Soube que está investigando a morte do Delegado Ferraz. Estou à disposição para ajudar no que for preciso. Meu cassino "Ouro de Midas" está de portas abertas para você.',
    timestamp: '2004-06-15T09:15:00',
    read: false,
  },
  {
    id: 'casino-3',
    sender: 'Isabela Ferraz',
    content: 'Detetive, sou a viúva do Delegado Gustavo. Gostaria de conversar sobre o caso. Tenho informações que podem ser úteis para a investigação.',
    timestamp: '2004-06-15T10:05:00',
    read: false,
  }
];

// Evidências iniciais para o caso do cassino
export const casinoEvidences: Evidence[] = [
  {
    id: 'casino-ev-1',
    type: 'photo',
    name: 'Cena do crime',
    description: 'Foto mostra o corpo do Delegado Gustavo Ferraz caído em sua cadeira no escritório. Há um ferimento de bala na têmpora direita e um revólver no chão. Um bilhete com os dizeres "A justiça chegou para você" está sobre a mesa.',
    marked: null,
  },
  {
    id: 'casino-ev-2',
    type: 'weapon',
    name: 'Revólver calibre .38',
    description: 'Arma encontrada no chão do escritório, próxima ao corpo. Possui apenas uma bala deflagrada e não apresenta impressões digitais visíveis.',
    marked: null,
  },
  {
    id: 'casino-ev-3',
    type: 'document',
    name: 'Bilhete misterioso',
    description: 'Papel comum com a frase "A justiça chegou para você" escrita em letra de forma. Não há impressões digitais no papel.',
    marked: null,
  },
  {
    id: 'casino-ev-4',
    type: 'document',
    name: 'Agenda do delegado',
    description: 'Agenda com anotações sobre reuniões. Na data do crime, há uma anotação: "22h - Encontro importante no Ouro de Midas. Não esquecer dossiê."',
    marked: null,
  }
];

// Entradas iniciais do diário para o caso do cassino
export const casinoDiaryEntries: DiaryEntry[] = [
  {
    id: 'casino-diary-1',
    title: 'Início da investigação',
    content: 'Fui designado para investigar o assassinato do Delegado Gustavo Ferraz, encontrado morto em seu escritório com um tiro na cabeça. Há suspeitas de que sua morte esteja relacionada a um esquema de corrupção.',
    timestamp: '2004-06-15T08:45:00',
    type: 'conclusion',
  }
];

// Notícias iniciais para o caso do cassino
export const casinoNewsArticles: NewsArticle[] = [
  {
    id: 'casino-news-1',
    title: 'Delegado encontrado morto em seu escritório',
    content: 'O Delegado Gustavo Ferraz, 50 anos, foi encontrado sem vida em seu escritório na manhã de hoje. A polícia investiga o caso como homicídio. Ferraz era conhecido por sua carreira controversa, com diversas acusações de corrupção ao longo dos anos.',
    date: '2004-06-15',
    isClue: true,
  },
  {
    id: 'casino-news-2',
    title: 'Cassino "Ouro de Midas" inaugura nova ala VIP',
    content: 'O cassino mais luxuoso de Neo Aurora, o "Ouro de Midas", inaugurou ontem sua nova ala VIP, com a presença de empresários e autoridades locais. O proprietário, Vicente Barbosa, promete uma experiência exclusiva para os clientes mais seletos.',
    date: '2004-06-14',
    isClue: true,
  },
  {
    id: 'casino-news-3',
    title: 'Jornalista promete revelações bombásticas sobre corrupção policial',
    content: 'A jornalista investigativa Marcela Dantas anunciou que publicará em breve uma série de reportagens sobre um esquema de corrupção envolvendo autoridades policiais de Neo Aurora. "Tenho provas concretas que vão abalar as estruturas do poder", afirmou.',
    date: '2004-06-10',
    isClue: true,
  }
];

// Informações dos suspeitos para uso nos prompts de IA
export const casinoSuspects = {
  'Vicente Barbosa': {
    description: 'Dono do cassino "Ouro de Midas", homem de 45 anos, elegante e carismático',
    relation: 'empresário influente que tinha negócios com o delegado Gustavo Ferraz',
    secretInfo: 'Pagava propina mensal ao delegado para ignorar atividades ilegais no cassino, incluindo lavagem de dinheiro',
    alibi: 'Afirma que estava no cassino durante toda a noite do crime, supervisionando a inauguração da ala VIP',
    motive: 'O delegado estava exigindo mais dinheiro e ameaçando fechar o cassino',
    isGuilty: false
  },
  'Isabela Ferraz': {
    description: 'Viúva do delegado, mulher de 38 anos, elegante e aparentemente abalada',
    relation: 'esposa do delegado Gustavo Ferraz há 15 anos',
    secretInfo: 'O casamento era uma fachada e ela mantinha um caso com o advogado Dr. Leandro Moura',
    alibi: 'Diz que estava em casa dormindo no momento do crime',
    motive: 'Herdaria uma fortuna com a morte do marido e poderia ficar com seu amante',
    isGuilty: false
  },
  'Comissário Rogério Silva': {
    description: 'Policial de 52 anos, postura rígida e expressão sempre séria',
    relation: 'colega de trabalho e suposto amigo do delegado Gustavo Ferraz',
    secretInfo: 'Participava do esquema de corrupção, mas estava sendo chantageado pelo delegado',
    alibi: 'Afirma que estava em uma operação policial na noite do crime',
    motive: 'O delegado ameaçava expor sua participação no esquema de corrupção',
    isGuilty: true
  },
  'Marcela Dantas': {
    description: 'Jornalista de 35 anos, determinada e sempre com um gravador em mãos',
    relation: 'jornalista investigativa que estava apurando casos de corrupção policial',
    secretInfo: 'Tinha conseguido provas contra o delegado e planejava publicar uma reportagem',
    alibi: 'Diz que estava em casa trabalhando em sua reportagem',
    motive: 'O delegado descobriu sobre sua investigação e ameaçou sua vida',
    isGuilty: false
  },
  'Dante Moretti': {
    description: 'Mafioso italiano de 60 anos, sempre bem vestido e com guarda-costas',
    relation: 'líder de uma organização criminosa que operava em Neo Aurora',
    secretInfo: 'Pagava o delegado para ter proteção para seus negócios ilegais',
    alibi: 'Afirma que estava em sua casa de campo fora da cidade',
    motive: 'O delegado começou a exigir mais dinheiro e ameaçou expor seus negócios',
    isGuilty: false
  },
  'Dr. Leandro Moura': {
    description: 'Advogado de 40 anos, elegante, articulado e sempre com um sorriso confiante',
    relation: 'advogado que representava o delegado em questões legais',
    secretInfo: 'Mantinha um caso com Isabela Ferraz e sabia de todos os crimes do delegado',
    alibi: 'Diz que estava em um hotel da cidade em uma conferência de advogados',
    motive: 'Queria ficar com Isabela e eliminar o delegado que sabia sobre o caso',
    isGuilty: false
  }
};

// Pistas que podem ser descobertas durante o jogo
export const casinoClues = [
  {
    id: 'clue-1',
    name: 'Dossiê secreto',
    description: 'Um arquivo contendo provas de corrupção contra vários suspeitos, incluindo o Comissário Rogério',
    location: 'Escondido no escritório do delegado'
  },
  {
    id: 'clue-2',
    name: 'Gravação de áudio',
    description: 'Uma conversa gravada onde o Comissário Rogério ameaça o delegado',
    location: 'No computador da jornalista Marcela'
  },
  {
    id: 'clue-3',
    name: 'Extrato bancário',
    description: 'Comprovantes de depósitos suspeitos na conta do delegado vindos do cassino',
    location: 'No cofre da casa do delegado'
  },
  {
    id: 'clue-4',
    name: 'Bilhete de amor',
    description: 'Uma carta romântica entre Isabela e Dr. Leandro',
    location: 'Na bolsa de Isabela'
  },
  {
    id: 'clue-5',
    name: 'Registro de armas',
    description: 'Documento mostrando que o Comissário Rogério possui uma arma do mesmo calibre da usada no crime',
    location: 'Nos arquivos da delegacia'
  }
];

// Informações de busca para o motor de pesquisa
export const casinoSearchResults = {
  'Vicente Barbosa cassino': [
    'Empresário Vicente Barbosa inaugurou o cassino "Ouro de Midas" em 2002',
    'Investigação sobre lavagem de dinheiro no cassino "Ouro de Midas" foi arquivada em 2003',
    'Vicente Barbosa foi visto com o Delegado Ferraz em várias ocasiões no cassino'
  ],
  'Isabela Ferraz testamento': [
    'Isabela Ferraz é a única beneficiária do testamento do Delegado Gustavo',
    'Fortuna estimada do Delegado Ferraz é de R$ 3 milhões, valor incompatível com seu salário',
    'Isabela e Gustavo Ferraz não tinham filhos'
  ],
  'Comissário Rogério Silva corrupção': [
    'Comissário Rogério Silva foi investigado internamente em 2002, mas o caso foi arquivado',
    'Rogério Silva trabalhou com o Delegado Ferraz em diversos casos polêmicos',
    'Testemunha anônima afirma ter visto Rogério recebendo dinheiro do delegado'
  ],
  'Marcela Dantas jornalista': [
    'Jornalista Marcela Dantas ganhou prêmio por reportagem sobre corrupção em 2003',
    'Marcela Dantas trabalha no jornal "A Verdade" há 8 anos',
    'Recentemente, Marcela recebeu ameaças anônimas sobre suas investigações'
  ],
  'Dante Moretti criminal': [
    'Dante Moretti foi preso em 1998 por extorsão, mas foi solto por falta de provas',
    'Polícia suspeita que Moretti controla o tráfico de drogas em Neo Aurora',
    'Moretti é dono de várias empresas suspeitas de lavagem de dinheiro'
  ],
  'Dr. Leandro Moura advogado': [
    'Dr. Leandro Moura representou vários criminosos conhecidos em Neo Aurora',
    'Leandro Moura foi visto frequentemente na casa do Delegado Ferraz',
    'O advogado Leandro Moura e Isabela Ferraz estudaram juntos na faculdade'
  ],
  'Delegado Gustavo Ferraz corrupção': [
    'Delegado Ferraz foi acusado de receber propina em 2001, mas o caso foi arquivado',
    'Patrimônio do Delegado Ferraz cresceu 300% nos últimos 5 anos',
    'Ex-policial afirma que Ferraz comandava esquema de proteção a criminosos'
  ],
  'Cassino Ouro de Midas lavagem': [
    'Fiscalização no cassino Ouro de Midas foi cancelada três vezes no último ano',
    'Cassino movimenta milhões por mês, mas declara lucros modestos',
    'Funcionário demitido do cassino alega ter visto operações suspeitas'
  ]
};

// Efeitos dos assistentes no caso do cassino
export const casinoAssistantEffects = {
  'rico': {
    specialEffect: 'Pode obter informações privilegiadas de Vicente Barbosa e tem acesso à área VIP do cassino',
    negativeEffect: 'Comissário Rogério e Marcela Dantas se recusam a cooperar plenamente',
    uniqueClue: 'Descobre que Vicente Barbosa tinha um acordo secreto com o delegado'
  },
  'clara': {
    specialEffect: 'Consegue a confiança de Isabela Ferraz, que revela detalhes sobre seu casamento',
    negativeEffect: 'Dante Moretti se recusa a falar com uma "mãe certinha"',
    uniqueClue: 'Descobre através de Isabela que o delegado tinha um cofre secreto'
  },
  'hacker': {
    specialEffect: 'Consegue acessar e-mails apagados do delegado e registros confidenciais',
    negativeEffect: 'Vicente Barbosa e Dr. Leandro ficam desconfiados e menos cooperativos',
    uniqueClue: 'Encontra uma gravação de áudio comprometedora do Comissário Rogério'
  },
  'lurdes': {
    specialEffect: 'Descobre fofocas sobre o caso entre Isabela e Dr. Leandro',
    negativeEffect: 'Marcela Dantas considera Dona Lurdes pouco profissional',
    uniqueClue: 'Ouve de uma faxineira que o Comissário Rogério esteve no escritório na noite do crime'
  },
  'ice': {
    specialEffect: 'Analisa o comportamento dos suspeitos e detecta mentiras com mais facilidade',
    negativeEffect: 'Dante Moretti se sente analisado e se torna hostil',
    uniqueClue: 'Percebe inconsistências no depoimento do Comissário Rogério'
  }
};

// Finais possíveis para o caso
export const casinoEndings = {
  'correct': {
    title: 'Justiça Verdadeira',
    description: 'Você reuniu provas suficientes contra o Comissário Rogério Silva e conseguiu prendê-lo pelo assassinato do Delegado Ferraz. As evidências eram irrefutáveis: a arma do crime pertencia a ele, suas impressões digitais foram encontradas no local e a gravação de áudio revelou sua ameaça ao delegado. A cidade de Neo Aurora agora tem uma chance de limpar sua polícia.',
    requirement: 'Acusar o Comissário Rogério com pelo menos 3 provas concretas'
  },
  'wrong': {
    title: 'Culpado Incorreto',
    description: 'Você acusou a pessoa errada e o verdadeiro assassino continua livre. Sua reputação como detetive foi manchada e o caso acabou sendo arquivado por falta de provas conclusivas. O Comissário Rogério Silva, verdadeiro culpado, continua na polícia, agora com mais poder ainda.',
    requirement: 'Acusar qualquer suspeito que não seja o Comissário Rogério'
  },
  'covered': {
    title: 'Encoberto pela Corrupção',
    description: 'Apesar de suas descobertas, forças poderosas conseguiram abafar o caso. Suas evidências desapareceram misteriosamente, testemunhas mudaram seus depoimentos e o caso foi oficialmente arquivado. A corrupção em Neo Aurora é mais profunda do que você imaginava.',
    requirement: 'Não apresentar acusação formal após 30 dias de investigação'
  },
  'death': {
    title: 'Morte do Detetive',
    description: 'Você chegou perto demais da verdade. Em uma noite escura, enquanto voltava para casa, foi emboscado e silenciado permanentemente. Seu corpo foi encontrado com um bilhete similar ao do delegado: "A justiça chegou para você". O caso nunca foi resolvido.',
    requirement: 'Confrontar o Comissário Rogério sem provas suficientes'
  },
  'escape': {
    title: 'Fuga do Culpado',
    description: 'Quando você finalmente reuniu todas as provas contra o Comissário Rogério Silva, descobriu que ele havia fugido da cidade. Um grande esquema de corrupção foi revelado, mas o assassino escapou da justiça. Pelo menos a verdade veio à tona.',
    requirement: 'Reunir todas as provas mas demorar mais de 20 dias para apresentá-las'
  }
};
