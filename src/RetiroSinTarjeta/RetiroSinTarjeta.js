// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RetiroSinTarjeta.css';
import axios from 'axios';

const ATMMenu = ({ onSelectOption }) => {

  const navigate = useNavigate();

  const [trays, setTrays] = useState([]);

  const handleGetTrays = () => {
    axios.post('http://localhost:4000/trays/get-trays', {atmId: 'CJ001'})
    .then((response) => {
      setTrays(response.data.data);
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const handleExit = () => {
    navigate('/main-menu');
  }

  const handleCheckBalance = () => {
        //navigate('/main-consulta', { state: { data: cardNumber } })
  }

  useEffect(() => {
    handleGetTrays();
  },[]);

  return (
    <div className="no-card-withdrawal-container">
      <div className="no-card-withdrawal-wrapper">
        <h2>Retiro de efectivo sin tarjeta.</h2>
        <h3>Digite el código de retiro.</h3>
        <div className='denominations'>
            {trays.length > 0 ? (
               trays.map((tray, index) => (
                <div className='denomination'>
                    <p>MONEDA LOCAL</p>
                    <p>{tray.Denominacion_Billete}</p>
                </div>

              ))
            ):(
                <p>No hay denominaciones disponibles.</p>
            )}
        </div>
        <div className='input-container'>
            <input
                type="number"
                id="inputAmount"
                name="inputAmount"
                class="form-control"
            />
        </div>
        <div className='options-container'>
            <ul className='options'>
                <li className='negative-button' onClick={handleExit}>Salir</li>
            </ul>
            <ul className='options'>
                <li className='positive-button'>Continuar</li>
            </ul>
        </div>
      </div>
     </div>
  );
};
  
export default ATMMenu;