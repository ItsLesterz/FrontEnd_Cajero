

import React, { useEffect } from 'react';
import './MenuAgenteBancario.css';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuAgenteBancario = ({ onSelectOption }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
