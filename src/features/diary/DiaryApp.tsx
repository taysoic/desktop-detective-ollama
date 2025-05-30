import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './DiaryApp.css';

const DiaryApp: React.FC = () => {
  const { diaryEntries, addDiaryEntry } = useGame();
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryType, setNewEntryType] = useState('conclusion');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleAddEntry = () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) return;
    
    addDiaryEntry({
      title: newEntryTitle,
      content: newEntryContent,
      type: newEntryType as 'conversation' | 'evidence' | 'conclusion',
    });
    
    setNewEntryTitle('');
    setNewEntryContent('');
  };

  const filteredEntries = activeFilter === 'all' 
    ? diaryEntries 
    : diaryEntries.filter(entry => entry.type === activeFilter);

  return (
    <div className="diary-app">
      <div className="diary-sidebar">
        <div className="diary-filters">
          <h3>Filtros</h3>
          <div 
            className={`filter-item ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </div>
          <div 
            className={`filter-item ${activeFilter === 'conversation' ? 'active' : ''}`}
            onClick={() => setActiveFilter('conversation')}
          >
            Conversas
          </div>
          <div 
            className={`filter-item ${activeFilter === 'evidence' ? 'active' : ''}`}
            onClick={() => setActiveFilter('evidence')}
          >
            Evidências
          </div>
          <div 
            className={`filter-item ${activeFilter === 'conclusion' ? 'active' : ''}`}
            onClick={() => setActiveFilter('conclusion')}
          >
            Conclusões
          </div>
        </div>
        <div className="relations-map">
          <h3>Mapa de Relações</h3>
          <div className="relations-placeholder">
            <p>Mapa de relações entre suspeitos</p>
            <p>(Atualizado conforme descobertas)</p>
          </div>
        </div>
      </div>
      
      <div className="diary-content">
        <div className="diary-header">
          <h2>Diário de Bordo</h2>
          <div className="diary-date">28 de Maio, 2025</div>
        </div>
        
        <div className="diary-entries">
          {filteredEntries.map(entry => (
            <div key={entry.id} className={`diary-entry ${entry.type}`}>
              <div className="entry-header">
                <h3>{entry.title}</h3>
                <div className="entry-time">
                  {new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <div className="entry-content">
                {entry.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {entry.relatedTo && entry.relatedTo.length > 0 && (
                <div className="entry-related">
                  <span>Relacionado a:</span> {entry.relatedTo.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="diary-new-entry">
          <h3>Nova Anotação</h3>
          <input 
            type="text" 
            placeholder="Título da anotação..." 
            value={newEntryTitle}
            onChange={(e) => setNewEntryTitle(e.target.value)}
          />
          <textarea 
            placeholder="Digite suas observações ou conclusões..."
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
          />
          <div className="entry-actions">
            <select 
              value={newEntryType}
              onChange={(e) => setNewEntryType(e.target.value)}
            >
              <option value="conversation">Conversa</option>
              <option value="evidence">Evidência</option>
              <option value="conclusion">Conclusão</option>
            </select>
            <button onClick={handleAddEntry}>Adicionar ao Diário</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryApp;
