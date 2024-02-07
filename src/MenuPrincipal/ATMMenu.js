// ATMMenu.js

import React from 'react';
import './ATMMenu.css';

const ATMMenu = ({ onSelectOption }) => {
  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  return (
    <div className="overlay">
    <div className="atm-menu-container">
        
      <div className="atm-menu-wrapper">
        <h2>Menú Principal</h2>
        <ul>
          <li onClick={() => handleOptionClick('retiroConTarjeta')}>Retiro con Tarjeta</li>
          <li onClick={() => handleOptionClick('retiroSinTarjeta')}>Retiro sin Tarjeta</li>
          <li onClick={() => handleOptionClick('salir')}>Salir</li>
        </ul>
      </div>
     </div>
    </div>
  );
};
  
export default ATMMenu;
