import React, { useState, useEffect } from 'react';
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import './Notification.css';

const Notification = ({ message, type, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheck />;
      case 'error': return <FaTimes />;
      default: return <FaBell />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="notification"
      style={{ backgroundColor: getBgColor() }}
    >
      <div className="notification-icon">
        {getIcon()}
      </div>
      <div className="notification-content">
        <p className="notification-message">{message}</p>
      </div>
      <button 
        className="notification-close"
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;