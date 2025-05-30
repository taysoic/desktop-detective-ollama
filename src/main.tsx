import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameProvider } from './context/GameContext';
import App from './App';
import './index.css';

// Criar um elemento para armazenar os assets pré-carregados
const preloadContainer = document.createElement('div');
preloadContainer.style.display = 'none';
document.body.appendChild(preloadContainer);

// Função para pré-carregar imagens
const preloadImages = async () => {
  const imageContext = import.meta.glob('./assets/images/icons/Nova pasta/*.png');
  
  for (const path in imageContext) {
    try {
      const img = document.createElement('img');
      // Tipar explicitamente o módulo para resolver o erro de TypeScript
      const module: { default: string } = await imageContext[path]() as { default: string };
      img.src = module.default;
      preloadContainer.appendChild(img);
    } catch (error) {
      console.error(`Erro ao pré-carregar imagem ${path}:`, error);
    }
  }
};

// Pré-carregar imagens antes de renderizar o app
preloadImages().then(() => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <GameProvider>
          <App />
        </GameProvider>
      </React.StrictMode>
    );
  }
});
