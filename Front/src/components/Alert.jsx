// Alert.js
import React, { useEffect } from 'react';
import './Alert.css'; 
const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="alert">{message}</div>;
};

export default Alert;
