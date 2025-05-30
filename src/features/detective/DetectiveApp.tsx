import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './DetectiveApp.css';

const DetectiveApp: React.FC = () => {
  const { evidences, markEvidenceAs, analyzeEvidence } = useGame();
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(evidences.length > 0 ? evidences[0].id : null);
  const [analysisNotes, setAnalysisNotes] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const selectedEvidence = evidences.find(e => e.id === selectedEvidenceId);

  const handleAnalyze = async () => {
    if (!selectedEvidenceId || analyzing) return;
    
    setAnalyzing(true);
    
    try {
      await analyzeEvidence(selectedEvidenceId);
    } catch (error) {
      console.error('Erro ao analisar evidência:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="detective-app">
      <div className="detective-sidebar">
        <div className="evidence-categories">
          <div className="category active">Fotografias</div>
          <div className="category">Armas</div>
          <div className="category">Documentos</div>
          <div className="category">Relatórios</div>
        </div>
      </div>
      
      <div className="evidence-list">
        {evidences.map(evidence => (
          <div 
            key={evidence.id} 
            className={`evidence-item ${evidence.id === selectedEvidenceId ? 'selected' : ''}`}
            onClick={() => setSelectedEvidenceId(evidence.id)}
          >
            <div className="evidence-icon">
              {evidence.type === 'photo' ? '📷' : 
               evidence.type === 'weapon' ? '🔪' : '📄'}
            </div>
            <div className="evidence-name">{evidence.name}</div>
          </div>
        ))}
      </div>
      
      <div className="evidence-viewer">
        {selectedEvidence && (
          <>
            <div className="evidence-header">
              <h3>{selectedEvidence.name}</h3>
              <div className="evidence-type">Tipo: {
                selectedEvidence.type === 'photo' ? 'Fotografia' : 
                selectedEvidence.type === 'weapon' ? 'Arma' : 'Documento'
              }</div>
            </div>
            
            <div className="evidence-description">
              <div className="evidence-image-placeholder">
                {selectedEvidence.type === 'photo' ? '📷' : 
                 selectedEvidence.type === 'weapon' ? '🔪' : '📄'}
              </div>
              <p>{selectedEvidence.description}</p>
            </div>
            
            {selectedEvidence.analysis ? (
              <div className="evidence-analysis-result">
                <h4>Análise Forense</h4>
                <div 
                  className="analysis-content"
                  dangerouslySetInnerHTML={{ __html: selectedEvidence.analysis }}
                />
              </div>
            ) : (
              <div className="evidence-analysis">
                <h4>Análise Forense</h4>
                <textarea 
                  placeholder="Digite suas observações sobre esta evidência..."
                  value={analysisNotes}
                  onChange={(e) => setAnalysisNotes(e.target.value)}
                />
                <button 
                  className="btn-analyze"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                >
                  {analyzing ? 'Analisando...' : 'Analisar com DetectivePro'}
                </button>
              </div>
            )}
            
            <div className="evidence-actions">
              <div className="evidence-mark">
                <span>Marcar como:</span>
                <button 
                  className={`btn-authentic ${selectedEvidence.marked === 'authentic' ? 'active' : ''}`}
                  onClick={() => markEvidenceAs(selectedEvidence.id, 'authentic')}
                >
                  Autêntica
                </button>
                <button 
                  className={`btn-altered ${selectedEvidence.marked === 'altered' ? 'active' : ''}`}
                  onClick={() => markEvidenceAs(selectedEvidence.id, 'altered')}
                >
                  Alterada
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetectiveApp;
