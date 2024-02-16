// ATMMenu.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RetiroTarjeta.css';

const ATMMenu = ({ onSelectOption }) => {

    const location = useLocation();
    const cardNumber = location.state.data;
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  const handleExit = () => {
    navigate('/main-menu');
  }

  const handleCheckBalance = () => {
        navigate('/main-consulta', { state: { data: cardNumber } })
  }

  return (
    <div className="card-withdrawal-container">
      <div className="card-withdrawal-wrapper">
        <h2>Digite el monto en múltiplos de 100 lempiras o seleccione un monto fijo.</h2>
        <h3>Monto máximo a retirar : L. 5000</h3>
        <div className='input-container'>
            <input
                type="number"
                id="inputAmount"
                name="inputAmount"
                class="form-control"
                min="0"
                step="100"
                max="5000"
                onInput={(e) => {
                if (e.target.value > 5000) {
                    e.target.value = 5000;
                }
                }}
            />
        </div>
        <div className='options-container'>
            <ul className='options'>
                <li className='option'>L. 100</li>
                <li className='option'>L. 1000</li>
                <li className='negative-button' onClick={handleExit}>Salir</li>
            </ul>
            <ul className='options'>
                <li className='option'>L. 500</li>
                <li className='option' onClick={handleCheckBalance}>Otras transacciones</li>
                <li className='positive-button'>Continuar</li>
            </ul>
        </div>
      </div>
     </div>
  );
};
  
export default ATMMenu;