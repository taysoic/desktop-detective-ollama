import React from 'react';
import { useGame } from '../../context/GameContext';
import './Desktop.css';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import RecycleBin from './RecycleBin';
import AssistantSelector from './AssistantSelector';

// Importações lazy para melhorar performance
import { lazy, Suspense } from 'react';
const MessagesApp = lazy(() => import('../messages/MessagesApp'));
const DetectiveApp = lazy(() => import('../detective/DetectiveApp'));
const DiaryApp = lazy(() => import('../diary/DiaryApp'));
const NewsApp = lazy(() => import('../news/NewsApp'));
const RecycleBinWindow = lazy(() => import('./RecycleBinWindow'));

// Importar imagens diretamente
import emailIcon from '../../assets/images/Nova pasta/mailbox_world-2.png';
import lupaIcon from '../../assets/images/Nova pasta/magnifying_glass-0.png';
import diarioIcon from '../../assets/images/Nova pasta/notepad-5.png';
import newsIcon from '../../assets/images/Nova pasta/newspaper.png';
import contratarIcon from '../../assets/images/Nova pasta/key_padlock-1.png';
import startButtonIcon from '../../assets/images/Nova pasta/trust0-0.png';

const Desktop: React.FC = () => {
  const { 
    windows, 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    activateWindow, 
    moveWindow,
    showAssistantSelector,
    openAssistantConfig,
    closeAssistantConfig
  } = useGame();

  const handleOpenRecycleBin = () => {
    openWindow('recycle');
  };

  const handleOpenAssistantConfig = () => {
    openAssistantConfig();
  };

  return (
    <div className="desktop">
      <div className="desktop-icons">
        <DesktopIcon 
          label="E-mails" 
          icon={emailIcon} 
          onClick={() => openWindow('messages')} 
        />
        <DesktopIcon 
          label="DetectivePro" 
          icon={lupaIcon} 
          onClick={() => openWindow('detective')} 
        />
        <DesktopIcon 
          label="Diário Digital" 
          icon={diarioIcon} 
          onClick={() => openWindow('diary')} 
        />
        <DesktopIcon 
          label="A Verdade" 
          icon={newsIcon} 
          onClick={() => openWindow('news')} 
        />
        <DesktopIcon 
          label="Assistente" 
          icon={contratarIcon} 
          onClick={handleOpenAssistantConfig} 
        />
        <RecycleBin onOpen={handleOpenRecycleBin} />
      </div>

      {windows.map(window => (
        !window.isMinimized && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            isActive={window.isActive}
            isMinimized={window.isMinimized}
            position={window.position}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onActivate={() => activateWindow(window.id)}
            onMove={(x, y) => moveWindow(window.id, x, y)}
          >
            <Suspense fallback={<div className="loading">Carregando...</div>}>
              {window.type === 'messages' && <MessagesApp />}
              {window.type === 'detective' && <DetectiveApp />}
              {window.type === 'diary' && <DiaryApp />}
              {window.type === 'news' && <NewsApp />}
              {window.type === 'recycle' && <RecycleBinWindow onClose={() => closeWindow(window.id)} />}
            </Suspense>
          </Window>
        )
      ))}

      <div className="taskbar">
        <div className="start-button">
          <img src={startButtonIcon} alt="Iniciar" />
          <span>Iniciar</span>
        </div>
        <div className="taskbar-items">
          {windows.map(window => (
            <div 
              key={window.id} 
              className={`taskbar-item ${window.isActive ? 'active' : ''}`}
              onClick={() => window.isMinimized ? activateWindow(window.id) : minimizeWindow(window.id)}
            >
              <span>{window.title}</span>
            </div>
          ))}
        </div>
        <div className="taskbar-tray">
          <div className="clock">
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>

      {showAssistantSelector && (
        <AssistantSelector onClose={closeAssistantConfig} />
      )}
    </div>
  );
};

export default Desktop;
