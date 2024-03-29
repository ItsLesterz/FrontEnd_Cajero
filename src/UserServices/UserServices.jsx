// ATMMenu.js

import React from 'react';
import '../PaginaPrincipal/PaginaPrincipal.css';
import { useNavigate } from 'react-router-dom';

const PaginaPrincipal = ({ onSelectOption }) => {

  const navigate = useNavigate();
  
  return (
    <div className="overlay">
    <div className="atm-menu-container">
      <div className="atm-menu-wrapper">
        <h2>Retirar Dinero</h2>
      </div>
     </div>
    </div>
  );
};
  
export default PaginaPrincipal;
