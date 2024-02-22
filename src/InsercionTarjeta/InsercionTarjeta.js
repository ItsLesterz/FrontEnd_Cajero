import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InsercionTarjeta.css'
const RetiroConTarjetaScreen = () => {
  const navigate = useNavigate();
  const [tarjetaNumber, setTarjetaNumber] = useState('');
  const [details, setDetails] = useState('');

  const handleContinuar = () => {
    axios.post('http://localhost:4000/cards/validate-card', {cardNumber: tarjetaNumber})
    .then((response) => {
        if(response.data.success) {
            const cardData = response.data.data;
            console.log(response.data.data);
            setDetails('');
            navigate('/pin-number', { state: { cardData: cardData } });
        } else {
            setDetails(response.data.details);
            setTimeout(() => {
                setDetails('');
            }, 2000);
        }
    })
    .catch((error) => {
        setDetails('Hubo un error al momento de tratar de obtener los datos.');
        setTimeout(() => {
          setDetails('');
        }, 2000);
        console.log(error);
    })
  };

  const handleSalir = () => {
    navigate("/main-menu")
  }

  const handleNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "").substring(0, 16);
    let formattedValue = "";
    for (let i = 0; i < inputValue.length; i += 16) {
        if (i !== 0) {
            formattedValue += "-";
        }
        formattedValue += inputValue.substring(i, i + 16);
    }
    setTarjetaNumber(formattedValue);
  };

  return (
    <div className="insert-card-container">
      <div className='insert-card-wrapper'>
        <h2 className='title'>Inserte su tarjeta</h2>
        <input
          className='card-input'
          type="number"
          value={tarjetaNumber}
          onChange={handleNumberChange}
          placeholder="----------------"
          maxLength={16}
        />
        <div className='details-container'>
          <p className='error-message'>{details}</p>
        </div>
        <ul className='options-container'>
            <ul className='options'>
                <li className='negative-button' onClick={handleSalir}>Salir</li>
            </ul>
            <ul className='options'>
                <li className='positive-button' onClick={handleContinuar}>Continuar</li>
            </ul>
        </ul>
      </div>
    </div>
  );
};

export default RetiroConTarjetaScreen;