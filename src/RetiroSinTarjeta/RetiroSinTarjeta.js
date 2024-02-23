// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RetiroSinTarjeta.css';
import axios from 'axios';
import Layout from '../Layout/Layout';

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
    axios.post('http://localhost:4000/cards/retiro-sin-tarjeta', {codigo: code, codigoCajero: 'CJ001'})
    .then((response) => {
        const numeroTarjeta = response.data.data;
        const amount = response.data.monto;
        if (response.data.success) {
            handleCreateReport('Se realizó un retiro de ' + amount, amount, numeroTarjeta);
            navigate('/pantalla-retiro');
            
        } else {
            handleCreateReport('Retiro rechazado de ' + amount, amount, numeroTarjeta);
            setDetails(response.data.details);
        }
    })
    .catch((error) => {
        if (error.response.data.data) {
            const numeroTarjeta = error.response.data.data;
            console.log(numeroTarjeta);
            const amount = error.response.data.monto;
            handleCreateReport('Retiro rechazado de ' + amount, amount, numeroTarjeta);
        }
        setDetails(error.response.data.details);
        setTimeout(() => {
            setDetails('');
        }, 2000);
    })
  }

  const handleCreateReport = (details, amount, cardNumber) => {
    const fecha = new Date; 
    const dia = fecha.getDate().toString().padStart(2, '0'); 
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();

    const fechaFormateada = `${anio}-${mes}-${dia}`;

    const reportData = {
      numeroTarjeta: cardNumber,
      fechaTransaccion: fechaFormateada,
      detalles: details,
      monto: amount
    }
    axios.post('http://localhost:4000/reports/create-report', { reportData: reportData})
    .then((response) => {
      console.log(response.data.details);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Layout>
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
     </Layout>
  );
};
  
export default ATMMenu;