import React from 'react';
import { useGame } from '../../context/GameContext';
import './RecycleBin.css';

// Importar imagens diretamente
import recycleBinEmptyIcon from '../../assets/images/Nova pasta/recycle_bin_empty_cool-0.png';
import recycleBinFullIcon from '../../assets/images/Nova pasta/recycle_bin_full_cool-0.png';

interface RecycleBinProps {
  onOpen: () => void;
}

const RecycleBin: React.FC<RecycleBinProps> = ({ onOpen }) => {
  const { deletedItems } = useGame();
  const isEmpty = deletedItems.length === 0;

  return (
    <div className="recycle-bin-icon" onClick={onOpen}>
      <div className="icon-image">
        <img 
          src={isEmpty ? recycleBinEmptyIcon : recycleBinFullIcon} 
          alt="Lixeira" 
        />
      </div>
      <div className="icon-label">Lixeira</div>
    </div>
  );
};

export default RecycleBin;
