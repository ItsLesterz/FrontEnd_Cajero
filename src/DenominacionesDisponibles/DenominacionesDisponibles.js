// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DenominacionesDisponibles.css';
import axios from 'axios';

const ATMMenu = () => {

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
  
  const handleNavigate = (option) => {
    if (option === 1) {
        navigate('/main-menu');
    }
    if (option === 2) {
        navigate('/sin-tarjeta');
    }
  }

  useEffect(() => {
    handleGetTrays();
  },[]);

  return (
    <div className="available-denominations-container">
      <div className="available-denominations-wrapper">
        <h2>Estimado cliente:</h2>
        <h3>Las denominaciones disponibles para retiro en este ATM son:</h3>
        <div className='denominations'>
            {trays.length > 0 ? (
               trays.map((tray, index) => (
                <div className='denomination'>
                    <p>MONEDA LOCAL:</p>
                    <p>{tray.Denominacion_Billete}</p>
                </div>

              ))
            ):(
                <p>No hay denominaciones disponibles.</p>
            )}
        </div>
        <div className='options-container'>
            <ul className='options'>
                <li className='negative-button' onClick={() => handleNavigate(1)}>Salir</li>
            </ul>
            <ul className='options'>
                <li className='positive-button' onClick={() => handleNavigate(2)}>Continuar</li>
            </ul>
        </div>
      </div>
     </div>
  );
};
  
export default ATMMenu;