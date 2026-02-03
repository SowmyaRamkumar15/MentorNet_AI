import React from 'react';
import { FaFire } from 'react-icons/fa';
import './StreakBadge.css';

const StreakBadge = ({ streak, size = 'medium', showTooltip = true }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return '1.5rem';
      case 'medium': return '2rem';
      case 'large': return '3rem';
      default: return '2rem';
    }
  };

  const getFireColor = () => {
    if (streak >= 30) return '#FF6B00';
    if (streak >= 7) return '#FFA500';
    return '#FFD700';
  };

  const getLevel = () => {
    if (streak >= 30) return 'Legend';
    if (streak >= 7) return 'Pro';
    return 'Beginner';
  };

  const getTooltipText = () => {
    if (streak === 0) return 'Start your streak today!';
    if (streak === 1) return 'You started your streak!';
    return `You've been active for ${streak} days in a row! Keep it up!`;
  };

  return (
    <div className="streak-badge-container">
      <div 
        className="streak-badge"
        style={{ 
          width: getSize(), 
          height: getSize(),
          borderColor: getFireColor()
        }}
      >
        <FaFire 
          className="fire-icon" 
          style={{ color: getFireColor() }}
        />
        <span className="streak-count">{streak}</span>
      </div>
      
      <div className="streak-info">
        <span className="streak-level">{getLevel()}</span>
        <span className="streak-days">{streak} day{streak !== 1 ? 's' : ''}</span>
      </div>
      
      {showTooltip && (
        <div className="streak-tooltip">
          {getTooltipText()}
          <div className="streak-tip">Visit daily to maintain your streak!</div>
        </div>
      )}
    </div>
  );
};

export default StreakBadge;