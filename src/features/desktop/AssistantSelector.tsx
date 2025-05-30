import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { AssistantType } from '../../lib/ai-service';
import './AssistantSelector.css';

// Importar imagens diretamente
import ricoIcon from '../../assets/images/Nova pasta/trust0-0.png';
import claraIcon from '../../assets/images/Nova pasta/trust0-0.png';
import hackerIcon from '../../assets/images/Nova pasta/trust0-0.png';
import lurdesIcon from '../../assets/images/Nova pasta/trust0-0.png';
import iceIcon from '../../assets/images/Nova pasta/trust0-0.png';

interface AssistantSelectorProps {
  onClose: () => void;
}

const AssistantSelector: React.FC<AssistantSelectorProps> = ({ onClose }) => {
  const { selectAssistant, configureAI, selectedAssistant: currentAssistant } = useGame();
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType | null>(currentAssistant);

  const handleSelectAssistant = (assistant: AssistantType) => {
    setSelectedAssistant(assistant);
    
    // Configurar o assistente e a IA automaticamente
    selectAssistant(assistant);
    configureAI(''); // A chave API já está configurada no código
    
    // Fechar o seletor após a seleção
    onClose();
  };

  return (
    <div className="assistant-selector-overlay">
      <div className="assistant-selector">
        <div className="window-titlebar">
          <div className="window-title">Escolha seu Assistente</div>
          <div className="window-controls">
            <button className="window-control close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="selector-header">
          <h2>Escolha seu Assistente</h2>
          <p>Cada assistente tem habilidades e limitações únicas que afetarão sua investigação.</p>
        </div>
        
        <div className="assistants-grid">
          <div 
            className={`assistant-card ${selectedAssistant === 'rico' ? 'selected' : ''}`}
            onClick={() => handleSelectAssistant('rico')}
          >
            <div className="assistant-icon">
              <img src={ricoIcon} alt="Rico" />
            </div>
            <h3>Ricardo "Rico" Belmont</h3>
            <h4>O Playboy</h4>
            <div className="assistant-pros">
              <p>✅ Desbloqueia arquivos policiais</p>
              <p>✅ Paga subornos</p>
            </div>
            <div className="assistant-cons">
              <p>❌ +30% tempo em tarefas</p>
              <p>❌ NPCs pobres recusam diálogo</p>
            </div>
          </div>
          
          <div 
            className={`assistant-card ${selectedAssistant === 'clara' ? 'selected' : ''}`}
            onClick={() => handleSelectAssistant('clara')}
          >
            <div className="assistant-icon">
              <img src={claraIcon} alt="Clara" />
            </div>
            <h3>Clara Maia</h3>
            <h4>A Mãe Coruja</h4>
            <div className="assistant-pros">
              <p>✅ Revela 1 pista extra/dia</p>
              <p>✅ NPCs pais/mães dão informações extras</p>
            </div>
            <div className="assistant-cons">
              <p>❌ 25% chance de cancelar missões</p>
            </div>
          </div>
          
          <div 
            className={`assistant-card ${selectedAssistant === 'hacker' ? 'selected' : ''}`}
            onClick={() => handleSelectAssistant('hacker')}
          >
            <div className="assistant-icon">
              <img src={hackerIcon} alt="Hacker" />
            </div>
            <h3>Bárbara "Hacker"</h3>
            <h4>A Ex-Criminosa</h4>
            <div className="assistant-pros">
              <p>✅ Acesso a dados [REDACTED]</p>
              <p>✅ Opções de ameaça em diálogos</p>
            </div>
            <div className="assistant-cons">
              <p>❌ Eventos de perseguição policial</p>
            </div>
          </div>
          
          <div 
            className={`assistant-card ${selectedAssistant === 'lurdes' ? 'selected' : ''}`}
            onClick={() => handleSelectAssistant('lurdes')}
          >
            <div className="assistant-icon">
              <img src={lurdesIcon} alt="Lurdes" />
            </div>
            <h3>Dona Lurdes</h3>
            <h4>A Fofoqueira</h4>
            <div className="assistant-pros">
              <p>✅ NPCs soltam segredos</p>
              <p>✅ Revela pistas em situações críticas</p>
            </div>
            <div className="assistant-cons">
              <p>❌ Tasks demoram 3x mais</p>
            </div>
          </div>
          
          <div 
            className={`assistant-card ${selectedAssistant === 'ice' ? 'selected' : ''}`}
            onClick={() => handleSelectAssistant('ice')}
          >
            <div className="assistant-icon">
              <img src={iceIcon} alt="Ice" />
            </div>
            <h3>Dra. Ice</h3>
            <h4>A Psicóloga</h4>
            <div className="assistant-pros">
              <p>✅ Revela traumas de NPCs</p>
              <p>✅ Convence NPCs instáveis</p>
            </div>
            <div className="assistant-cons">
              <p>❌ NPCs fogem após 3 diálogos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantSelector;
