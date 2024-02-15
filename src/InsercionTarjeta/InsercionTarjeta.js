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
        console.log(error);
    })
  };
  const salir=()=>{
    navigate("/main-menu")
  }

  return (
      <div className="atm-menu-container">
      <h2 className='titulo'>Retiro con Tarjeta</h2>
        <input
          type="text"
          value={tarjetaNumber}
          onChange={(e) => setTarjetaNumber(e.target.value)}
          placeholder="Número de tarjeta"
          style={{position:"fixed",top:"55%",left:"30%"}}
        />
       
       <p style={{position:"fixed",top:"61%",left:"32%",color:"#f00524",fontSize:"20px"}}>{details}</p>      <button className='salir'onClick={salir}>Salir</button>
      <br/>
      <button className='opciones'onClick={handleContinuar}>Continuar</button>
       </div>
  );
};

export default RetiroConTarjetaScreen;