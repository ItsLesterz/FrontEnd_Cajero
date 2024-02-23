// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RetiroTarjeta.css';
import axios from 'axios';
import Layout from '../Layout/Layout';

const ATMMenu = ({ onSelectOption }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [trays, setTrays] = useState([]);
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (location.state) {
      setCardNumber(location.state.data);
      handleGetTrays();
    } else {
      navigate('/pin-number');
    }
  }, []);

  const handleGetTrays = () => {
    axios.post('http://localhost:4000/trays/get-trays', {atmId: 'CJ001'})
    .then((response) => {
      const traysCount = response.data.data.length;
      if (traysCount === 0) {
        navigate('/sin-servicio');
      } else {
        setTrays(response.data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleExit = () => {
    navigate('/main-menu');
  }

  const handleOtherTransactions = () => {
    navigate('/otras-transacciones', { state: { data: cardNumber } })
  }

  const handleSetValue = (value) => {
    setAmount(value);
  }

  const handleWithdraw = () => {
    if (amount <= 0) {
      setDetails('Ingrese un monto válido.');
      setTimeout(() => {
        setDetails('');
      }, 2000);
    } else {
      axios.post('http://localhost:4000/cards/retiro-con-tarjeta', {monto: amount, codigoCajero: 'CJ001', numeroTarjeta: cardNumber})
    .then((response) => {
      if (response.data.success) {
        handleCreateReport('Se realizó un retiro de ' + amount, amount);
        navigate('/pantalla-retiro');
      } else {
        handleCreateReport('Retiro rechazado de  ' + amount, 0.00);
        setDetails(response.data.details);
        setTimeout(() => {
          setDetails('');
        }, 2000);
      }
    })
    .catch((error) => {
      handleCreateReport('Retiro rechazado de  ' + amount, 0.00);
      setDetails(error.response.data.details);
      setTimeout(() => {
        setDetails('');
      }, 2000);
    })
    }
    
  }

  const handleCreateReport = (details, amount) => {
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
    <div className="card-withdrawal-container">
      <div className="card-withdrawal-wrapper">
        <h2>Digite el monto en múltiplos de 100 lempiras o seleccione un monto fijo.</h2>
        <h3>Monto máximo a retirar : L. 5000</h3>
        <div className='amount-input-container'>
            <input
                value={amount}
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
                onChange={(e) => setAmount(e.target.value)}
            />
            <p className='error-message'>{details}</p>
        </div>
        <div className='options-container'>
            <ul className='options'>
                <li className='option' onClick={() => handleSetValue(100)}>L. 100</li>
                <li className='option' onClick={() => handleSetValue(1000)}>L. 1000</li>
                <li className='negative-button' onClick={handleExit}>Salir</li>
            </ul>
            <ul className='options'>
                <li className='option' onClick={() => handleSetValue(500)}>L. 500</li>
                <li className='option' onClick={handleOtherTransactions}>Otras transacciones</li>
                <li className='positive-button' onClick={handleWithdraw}>Continuar</li>
            </ul>
        </div>
      </div>
     </div>
     </Layout>
  );
};
  
export default ATMMenu;