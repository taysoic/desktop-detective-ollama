import React from 'react';
import { useGame } from '../../context/GameContext';
import './RecycleBinWindow.css';

const RecycleBinWindow: React.FC<{ onClose: () => void }> = () => {
  const { deletedItems, restoreFromBin, emptyBin } = useGame();

  return (
    <div className="recycle-bin-window">
      <div className="recycle-bin-header">
        <h3>Lixeira</h3>
        <button 
          className="empty-bin-btn"
          onClick={emptyBin}
          disabled={deletedItems.length === 0}
        >
          Esvaziar Lixeira
        </button>
      </div>
      
      <div className="deleted-items-list">
        {deletedItems.length === 0 ? (
          <div className="empty-bin-message">
            <p>A lixeira está vazia.</p>
          </div>
        ) : (
          deletedItems.map(item => (
            <div key={item.id} className="deleted-item">
              <div className="deleted-item-info">
                <div className="deleted-item-name">{item.name}</div>
                <div className="deleted-item-type">
                  {item.type === 'message' ? 'Mensagem' : 
                   item.type === 'evidence' ? 'Evidência' : 'Nota'}
                </div>
                <div className="deleted-item-date">
                  {new Date(item.deletedAt).toLocaleString()}
                </div>
              </div>
              <button 
                className="restore-btn"
                onClick={() => restoreFromBin(item.id)}
              >
                Restaurar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecycleBinWindow;
