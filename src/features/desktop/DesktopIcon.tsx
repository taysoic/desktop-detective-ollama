import React from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div className="desktop-icon" onClick={onClick}>
      <div className="icon">
        <img src={icon} alt={label} />
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

export default DesktopIcon;
