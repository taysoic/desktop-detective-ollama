import React from 'react';
import './Window.css';

interface WindowProps {
  id: string;
  title: string;
  isMinimized: boolean;
  isActive: boolean;
  position: {
    x: number;
    y: number;
  };
  onClose: () => void;
  onMinimize: () => void;
  onActivate: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  title,
  isMinimized,
  isActive,
  position,
  onClose,
  onMinimize,
  onActivate,
  onMove,
  children
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) {
      onActivate();
    }
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      onMove(
        e.clientX - dragOffset.x,
        e.clientY - dragOffset.y
      );
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);
  
  if (isMinimized) {
    return null;
  }
  
  return (
    <div 
      className={`window ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={onActivate}
    >
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button className="window-control minimize" onClick={onMinimize}>_</button>
          <button className="window-control close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;
