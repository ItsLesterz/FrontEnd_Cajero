import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MenuConsultas.css';

const ConsultaScreen = () => {
  const location = useLocation();
  const cardNumber = location.state.data;
    const navigate = useNavigate();

    const handleNavigate = (option) => {
        if (option === 0) {
          navigate('/card-number');
        }
        if (option === 1) {
          //navigate('/pin-number');
          console.log('Tarjeta en MenuConsultas');
          console.log(cardNumber);
          navigate('/consulta-saldo', { state: { data: cardNumber } })
          
        }
        if (option === 2) {
          console.log('');
        }
        if (option === 3) {
          navigate('/main-menu')
        }
    }
    return(
        <div className="overlay">
            <div className="atm-menu-container">
            <div className="atm-menu-wrapper">
            <h2>Probando</h2>
        <ul>
          <li onClick={() => handleNavigate(0)}>Reportes del Mes Actual</li>
          <li onClick={() => handleNavigate(1)}>Consultar Saldo</li>
          
        </ul>
        <ul>
        <li onClick={() =>handleNavigate(2)}>Reportes del Mes Anterior</li>
        <li onClick={() =>handleNavigate(3)}>Salir</li>
        </ul>
            </div>
            </div>

        </div>

    );

};

export default ConsultaScreen;
