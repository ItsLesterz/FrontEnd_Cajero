// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RetiroSinTarjeta.css';
import axios from 'axios';

const ATMMenu = ({ onSelectOption }) => {

  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [details, setDetails] = useState('');
  
  const handleExit = () => {
    navigate('/main-menu');
  }

  const handleNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "").substring(0, 66);
    let formattedValue = "";
    for (let i = 0; i < inputValue.length; i += 6) {
        if (i !== 0) {
            formattedValue += "-";
        }
        formattedValue += inputValue.substring(i, i + 6);
    }
    setCode(formattedValue);
  };

  const handleWithdraw = () => {
    setDetails('No hay conexion.');
  }

  return (
    <div className="no-card-withdrawal-container">
      <div className="no-card-withdrawal-wrapper">
        <div className='info'>
            <h2>Retiro de efectivo sin tarjeta.</h2>
            <h3>Digite el código de retiro.</h3>
        </div>
        <input
            type="number"
            maxLength={6}
            value={code}
            placeholder="------"
            onChange={handleNumberChange}
        />
        <div className='details-container'>
          <p className='error-message'>{details}</p>
        </div>
        <div className='options-container'>
            <ul className='options'>
                <li className='negative-button' onClick={handleExit}>Salir</li>
            </ul>
            <ul className='options'>
                <li className='positive-button' onClick={handleWithdraw}>Continuar</li>
            </ul>
        </div>
      </div>
     </div>
  );
};
  
export default ATMMenu;