// ATMMenu.js

import React from 'react';
import './ATMMenu.css';
import { useNavigate } from 'react-router-dom';

const ATMMenu = ({ onSelectOption }) => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  const handleExit = () => {
    navigate('/')
  }

  return (
    <div className="overlay">
    <div className="atm-menu-container">
        
      <div className="atm-menu-wrapper">
        <h2>Menú Principal</h2>
        <ul>
          <li onClick={() => handleOptionClick('retiroConTarjeta')}>Retiro con Tarjeta</li>
          <li onClick={() => handleOptionClick('retiroSinTarjeta')}>Retiro sin Tarjeta</li>
          <li onClick={handleExit}>Salir</li>
        </ul>
      </div>
     </div>
    </div>
  );
};
  
export default ATMMenu;
