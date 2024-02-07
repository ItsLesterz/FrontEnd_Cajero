// ATMMenu.js

import React from 'react';
import './PaginaPrincipal.css';

const PaginaPrincipal = ({ onSelectOption }) => {
  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  return (
    <div className="overlay">
    <div className="atm-menu-container">
        
      <div className="atm-menu-wrapper">
        
        
      </div>
     </div>
    </div>
  );
};
  
export default PaginaPrincipal;
