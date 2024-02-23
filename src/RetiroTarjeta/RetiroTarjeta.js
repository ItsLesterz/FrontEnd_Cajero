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
  const [stringAmount, setStringAmount] = useState('');

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
    console.log(amount);
    if (amount <= 0 || amount > 5000) {
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
        handleCreateReport('Retiro rechazado de  ' + amount, amount);
        setDetails(response.data.details);
        setTimeout(() => {
          setDetails('');
        }, 2000);
      }
    })
    .catch((error) => {
      handleCreateReport('Retiro rechazado de  ' + amount, amount);
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

  const handleMiles = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Eliminar cualquier carácter que no sea un dígito
    let formattedValue = "";
    const numberOfDigits = inputValue.length; 
    for (let i = numberOfDigits - 1; i >= 0; i--) {
        formattedValue = inputValue[i] + formattedValue;
        if ((numberOfDigits - i) % 3 === 0 && i !== 0) {
            formattedValue = "," + formattedValue;
        }
    }
    setStringAmount(formattedValue)
    setAmount(e.target.value); 
};




  return (
    <Layout>
    <div className="card-withdrawal-container">
      <div className="card-withdrawal-wrapper">
      <h2>
  Digite el monto en múltiplos de {
    trays.length > 0 ? (
      <>
        {trays.map((tray, index) => (
          <span key={index}>
            {tray.Denominacion_Billete}
            {index !== trays.length - 1 && ", "} {/* Agrega una coma después de cada elemento excepto el último */}
          </span>
        ))}
      </>  
    ) : (
      "lempiras"
    )} 
    o seleccione un monto fijo.
</h2>
        <h3>Monto máximo a retirar : L. 5,000</h3>
        <div className='amount-input-container'>
        <input
                value={stringAmount}
                onChange={handleMiles}
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