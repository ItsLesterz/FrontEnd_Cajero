

import React from 'react';
import './MenuAgenteBancario.css';

const MenuAgenteBancario = ({ onSelectOption }) => {
  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  return (
    <div className="overlay">
    <div className="atm-menu-container">
        
      <div className="atm-menu-wrapper">
        <h2>Menú Agente Bancario</h2>
        <ul>
          <li onClick={() => handleOptionClick('retiroConTarjeta')}>Retirar Bandeja</li>
          <li onClick={() => handleOptionClick('retiroSinTarjeta')}>Cargar Bandeja</li>
          <li onClick={() => handleOptionClick('salir')}>Salir</li>
        </ul>
      </div>
     </div>
    </div>
  );
};
  
export default MenuAgenteBancario;
