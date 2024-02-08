// ATMMenu.js

import React from 'react';
import './PaginaPrincipal.css';
import { useNavigate } from 'react-router-dom';

const PaginaPrincipal = ({ onSelectOption }) => {

  const navigate = useNavigate();

  const handleScreenClick = () => {
    console.log('Probando');
    navigate('/main-menu')
  }
  
  return (
    <div className="overlay">
    <div className="atm-menu-container">
      <div className="atm-menu-wrapper">
        <div onClick={handleScreenClick} className='homescreen-container'>

        </div>
      </div>
     </div>
    </div>
  );
};
  
export default PaginaPrincipal;
