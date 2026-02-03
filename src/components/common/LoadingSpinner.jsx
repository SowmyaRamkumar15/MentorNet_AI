import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#4f46e5', text = 'Loading...' }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return '1.5rem';
      case 'medium': return '3rem';
      case 'large': return '5rem';
      default: return '3rem';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return '0.875rem';
      case 'medium': return '1rem';
      case 'large': return '1.25rem';
      default: return '1rem';
    }
  };

  return (
    <div className="loading-spinner-container">
      <div 
        className="spinner"
        style={{ 
          width: getSize(), 
          height: getSize(),
          borderColor: color
        }}
      >
        <div 
          className="spinner-inner"
          style={{ borderColor: `${color} transparent transparent transparent` }}
        ></div>
      </div>
      {text && (
        <p 
          className="loading-text"
          style={{ fontSize: getTextSize() }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;