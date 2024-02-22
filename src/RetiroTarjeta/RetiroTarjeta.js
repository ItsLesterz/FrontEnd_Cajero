// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RetiroTarjeta.css';
import axios from 'axios';

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
    console.log(amount);
    setDetails('Hubo un error.');
  }

  return (
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
  );
};
  
export default ATMMenu;