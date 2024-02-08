// ATMMenu.js

import React from 'react';
import './ATMMenu.css';
import { useNavigate } from 'react-router-dom';

const ATMMenu = ({ onSelectOption }) => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  const handleNavigate = (option) => {
    if (option === 0) {
      navigate('card-number');
    }
    if (option === 1) {
      navigate('pin-number');
    }
    if (option === 2) {
      navigate('/')
    }
  }

  return (
    <div className="overlay">
    <div className="atm-menu-container">
        
      <div className="atm-menu-wrapper">
        <h2>Menú Principal</h2>
        <ul>
          <li onClick={() => handleNavigate(0)}>Retiro con Tarjeta</li>
          <li onClick={() => handleNavigate(1)}>Retiro sin Tarjeta</li>
          <li onClick={() =>handleNavigate(2)}>Salir</li>
        </ul>
      </div>
     </div>
    </div>
  );
};
  
export default ATMMenu;
