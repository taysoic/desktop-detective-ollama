# Desktop Detective

Um jogo investigativo com interface retrô do Windows XP, análise forense e diário dinâmico, com integração de IA.

## 📌 Visão Geral

Desktop Detective é um jogo estilo "detetive virtual" onde o jogador usa um computador estilo Windows XP para:

- 🗨️ Conversar com NPCs (via e-mails) controlados por IA Gemini
- 🔍 Analisar provas no software DetectivePro (fotos, armas, documentos)
- 📔 Registrar pistas em um diário de bordo automático
- 🌐 Obter dicas no site de notícias "A Verdade"
- 🕵️‍♂️ Desvendar um assassinato com múltiplos finais baseados nas escolhas

O tema é Noir/mistério, com NPCs que mentem, escondem informações e nunca confessam diretamente.

## 📂 Sistema de Assistentes

O jogo inclui 5 assistentes diferentes que afetam o gameplay e os diálogos:

1. **Ricardo "Rico" Belmont (O Playboy)**
   - Vantagens: Desbloqueia arquivos policiais, paga subornos
   - Desvantagens: Mais tempo em tarefas, NPCs pobres recusam diálogo

2. **Clara Maia (A Mãe Coruja)**
   - Vantagens: Revela pistas extras, NPCs pais/mães dão informações extras
   - Desvantagens: Chance de cancelar missões

3. **Bárbara "Hacker" (A Ex-Criminosa)**
   - Vantagens: Acesso a dados restritos, opções de ameaça em diálogos
   - Desvantagens: Eventos de perseguição policial

4. **Dona Lurdes (A Fofoqueira)**
   - Vantagens: NPCs soltam segredos, revela pistas em situações críticas
   - Desvantagens: Tarefas demoram mais

5. **Dra. Ice (A Psicóloga)**
   - Vantagens: Revela traumas de NPCs, convence NPCs instáveis
   - Desvantagens: NPCs fogem após 3 diálogos

## 🚀 Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou pnpm

### Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
cd desktop-detective
pnpm install
```

3. Inicie o servidor de desenvolvimento:

```bash
pnpm run dev
```

4. Acesse o jogo em `http://localhost:5173`

## 🔑 Configuração da API Gemini (IA)

O jogo utiliza a API Gemini do Google para gerar respostas de NPCs, análises forenses e resultados de pesquisa. Para ativar esses recursos:

1. **Obtenha uma chave de API Gemini**:
   - Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Crie uma conta ou faça login
   - Gere uma nova chave de API

2. **Configure a API no jogo**:
   - Clique no ícone "Assistente" na área de trabalho
   - Escolha seu assistente preferido
   - Na tela seguinte, insira sua chave de API no campo indicado
   - Clique em "Confirmar"

3. **Modo Offline**:
   - Se não tiver uma chave de API, você pode clicar em "Pular" para jogar no modo offline
   - No modo offline, as respostas dos NPCs, análises e pesquisas usarão textos pré-definidos

4. **Alterando o Assistente ou API Key**:
   - Você pode alterar seu assistente ou configurar a API a qualquer momento
   - Basta clicar no ícone "Assistente" na área de trabalho

### Verificando a Integração da IA

Para verificar se a IA está funcionando corretamente:

1. Abra o aplicativo de E-mails e envie uma mensagem para um NPC
2. Se a resposta contiver ações entre asteriscos (ex: *"Ajusta a gravata nervosamente"*) e for contextual à sua pergunta, a IA está funcionando
3. Use o DetectivePro para analisar uma evidência - a análise detalhada indica que a IA está ativa
4. Faça uma pesquisa no site "A Verdade" - resultados personalizados confirmam a integração da IA

## 🗑️ Usando a Lixeira

O jogo inclui uma lixeira funcional que permite gerenciar itens excluídos:

1. **Excluir itens**:
   - Nas aplicações de E-mails, DetectivePro e Diário Digital, você encontrará opções para excluir mensagens, evidências e anotações
   - Os itens excluídos são movidos para a Lixeira

2. **Acessar a Lixeira**:
   - Clique no ícone da Lixeira na área de trabalho
   - A Lixeira mostrará vazia ou cheia dependendo se há itens excluídos

3. **Restaurar itens**:
   - Na janela da Lixeira, selecione os itens que deseja restaurar
   - Clique no botão "Restaurar"
   - Os itens voltarão para seus aplicativos originais

4. **Esvaziar a Lixeira**:
   - Para excluir permanentemente todos os itens da Lixeira
   - Clique no botão "Esvaziar Lixeira"
   - Confirme a ação quando solicitado

## 🏗️ Estrutura do Projeto

```
desktop-detective/
├── public/                  # Arquivos públicos estáticos
├── src/
│   ├── assets/              # Recursos estáticos
│   │   ├── images/          # Imagens do jogo
│   │   │   ├── icons/       # Ícones no estilo Windows XP
│   │   │   └── backgrounds/ # Papéis de parede
│   │   ├── sounds/          # Efeitos sonoros (dial-up, notificações)
│   │   └── fonts/           # Fontes personalizadas
│   ├── components/          # Componentes reutilizáveis
│   │   └── ui/              # Componentes de UI
│   ├── context/             # Contextos React
│   │   └── GameContext.tsx  # Contexto global do jogo
│   ├── features/            # Módulos principais do jogo
│   │   ├── desktop/         # Interface do desktop virtual (Windows XP)
│   │   │   ├── AssistantSelector.tsx # Seletor de assistentes e configuração de API
│   │   │   ├── RecycleBin.tsx        # Ícone da lixeira
│   │   │   └── RecycleBinWindow.tsx  # Janela da lixeira
│   │   ├── messages/        # Sistema de e-mails
│   │   ├── detective/       # Software de análise forense
│   │   ├── diary/           # Diário de bordo
│   │   └── news/            # Site de notícias "A Verdade"
│   ├── hooks/               # Hooks personalizados
│   ├── lib/                 # Funções utilitárias
│   │   └── ai-service.ts    # Serviço de integração com IA Gemini
│   ├── types/               # Definições de tipos TypeScript
│   ├── App.css              # Estilos da aplicação
│   ├── App.tsx              # Componente principal
│   ├── index.css            # Estilos globais
│   └── main.tsx             # Ponto de entrada
├── components.json          # Configuração do shadcn/ui
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

## 💻 Componentes do Sistema

### 1. Interface do Desktop (Desktop.tsx)

- Simula um desktop Windows XP (2001)
- Ícones clássicos do Windows para acessar os diferentes módulos
- Janelas arrastáveis e redimensionáveis
- Barra de tarefas com botão iniciar e relógio
- Papel de parede manchado de café
- Lixeira funcional para gerenciar itens excluídos
- Acesso à configuração de assistente e API key

### 2. Sistema de E-mails (MessagesApp.tsx)

- Interface de e-mail para comunicação com NPCs
- Lista de mensagens recebidas
- Visualização de conteúdo da mensagem
- Campo para resposta
- Integração com IA Gemini para respostas dos NPCs

### 3. Software Detetive (DetectiveApp.tsx)

- Ferramenta para análise de evidências
- Categorias: Fotografias, Armas, Documentos
- Funcionalidade para marcar evidências como autênticas ou alteradas
- Geração de relatórios de análise via IA

### 4. Diário de Bordo (DiaryApp.tsx)

- Registro automático de pistas e conversas
- Filtros por tipo de entrada
- Mapa de relações entre suspeitos
- Adição manual de novas entradas e conclusões

### 5. Site de Notícias e Pesquisa (NewsApp.tsx)

- Interface de jornal online "A Verdade"
- Manchetes relacionadas ao caso
- Motor de busca "GooGle" com limite diário de pesquisas
- Resultados de pesquisa gerados por IA

### 6. Configuração de Assistente (AssistantSelector.tsx)

- Interface para escolha entre os 5 assistentes disponíveis
- Tela dedicada para configuração da API key Gemini
- Opção para jogar no modo offline (sem API key)
- Acessível a qualquer momento durante o jogo

### 7. Lixeira (RecycleBin.tsx e RecycleBinWindow.tsx)

- Ícone na área de trabalho que muda conforme o estado (vazia/cheia)
- Janela para visualizar, restaurar ou excluir permanentemente itens
- Gerenciamento de mensagens, evidências e anotações excluídas

## 🎮 Fluxo do Jogo

1. O jogador escolhe um assistente entre 5 opções excêntricas
2. Configura a API Gemini (opcional)
3. Recebe um e-mail inicial com o contexto do caso
4. Interage com os diferentes módulos para coletar pistas
5. As mensagens trocadas com NPCs são registradas no diário
6. As evidências analisadas geram entradas no diário
7. O site de notícias fornece dicas contextuais
8. O jogador deve conectar as pistas para resolver o caso

## 🔄 Detalhes da Integração com IA

O jogo utiliza a API Gemini para três funcionalidades principais:

### 1. Respostas de NPCs

- Cada NPC tem um prompt personalizado baseado em sua personalidade
- As respostas são influenciadas pelo assistente escolhido
- Os NPCs usam gírias dos anos 2000 e nunca confessam diretamente
- As ações são descritas entre asteriscos (ex: *"Olha para o lado nervosamente"*)

### 2. Análise Forense

- O DetectivePro utiliza IA para gerar relatórios técnicos sobre evidências
- As análises identificam detalhes importantes e sugerem interpretações
- O formato simula um software forense dos anos 2000

### 3. Motor de Busca

- O "GooGle" simula resultados de busca da época (1998-2005)
- Pesquisas limitadas por dia
- O assistente "Hacker" desbloqueia informações confidenciais adicionais

## 🎨 Design e Estilo

- Interface inspirada no Windows XP (2001)
- Ícones clássicos do Windows XP
- Efeitos sonoros CRT (dial-up, notificação de e-mail)
- Fontes e cores típicas da época
- Efeito de máquina de escrever nas mensagens

## 📝 Exemplo de Caso

O projeto inclui um caso de exemplo:

- Cena do Crime: Biblioteca da mansão Blackwood
- Vítima: Richard Blackwood, empresário
- Suspeitos: Mordomo, Empregada, Jardineiro, Chef
- Evidências iniciais: Faca, carta rasgada, pegadas de lama

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui para componentes
- Google Generative AI (Gemini)
- marked para formatação de markdown
- howler.js para efeitos sonoros
- Vite como bundler

## 🔮 Próximos Passos

- Adicionar mais casos e cenários
- Implementar sistema de pontuação e progressão
- Adicionar efeitos sonoros (CRT, teclado mecânico)
- Implementar minigames (quebrar senhas, descobrir detalhes pessoais)
- Expandir o sistema de análise forense

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
#   d e s k t o p - d e t e c t i v e - o l l a m a  
 