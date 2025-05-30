# 🕵️ Desktop Detective

![Windows XP Style Interface](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A detective game with Windows XP retro interface, forensic analysis, and dynamic AI-powered diary.

## ✨ Features
- 🖥️ Authentic Windows XP desktop experience
- 🤖 AI-driven NPC conversations (Gemini API)
- 🔍 Forensic evidence analysis system
- 📅 Dynamic case journal
- 📰 Interactive news website for clues
- 🎭 5 unique assistants with special abilities

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/desktop-detective.git

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🧩 Assistants System
Assistant	Strengths	Weaknesses
Ricardo Belmont	Police files access, bribes	Poor NPCs refuse dialogue
Clara Maia	Extra clues, parent NPC bonus	May cancel missions
Bárbara Hacker	Restricted data, threats	Police chase events
Dona Lurdes	NPCs reveal secrets	Slower tasks
Dr. Ice	Reveal NPC traumas	NPCs flee after 3 chats

desktop-detective/
├── src/
│   ├── features/
│   │   ├── desktop/      # XP Interface
│   │   ├── messages/     # Email system
│   │   ├── detective/    # Forensic tools
│   │   └── news/         # News website
├── public/               # Static assets
└── package.json          # Dependencies

🌐 AI Integration
Get API key from Google AI Studio
Configure in-game via Assistant icon
Or play in offline mode

🛠️ Tech Stack
Frontend: React 18 + TypeScript
Styling: Tailwind CSS
UI Components: shadcn/ui
AI: Google Gemini API
Audio: howler.js

Build: Vite
📜 License
MIT - See LICENSE for details.
