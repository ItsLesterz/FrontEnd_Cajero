//RetiroConTarjetaScreen.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            navigate(`/pin-number`, { state: { cardData: cardData } });
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

  return (
    <div className='overlay'>
        <div className='atm-menu-container'>
            <div className='atm-menu-wapper'>
            <h2
       style={{
        alignSelf: 'flex-start',
        textTransform: 'uppercase', // Convertir texto a mayúsculas
        fontFamily: 'Arial Rounded MT, sans-serif', // Cambiar la fuente del texto
        fontSize: '30px', // Tamaño de la fuente
        fontWeight: 'bold', // Peso de la fuente
        marginBottom: '20px',
        color: '#333', 
      }}
      >Retiro con tarjeta</h2>
      <input
        type="text"
        value={tarjetaNumber}
        onChange={(e) => setTarjetaNumber(e.target.value)}
        placeholder="Número de tarjeta"
        style={{
          width: '50%', // Ajusta el ancho según tu preferencia
          height: '40px', // Ajusta la altura según tu preferencia
          fontSize: '20px', // Ajusta el tamaño del texto dentro del input
          padding: '10px', // Ajusta el espacio interno del input
          marginBottom: '30px', // Espacio entre el input y el botón
        }}
      />
      <p>{details}</p>
      <button onClick={handleContinuar}
      style={{
          width: '150px', // Ancho más grande
          height: '40px', // Alto más grande
          fontSize: '18px', // Tamaño de la fuente más grande
          backgroundColor: '#2499c7', // Cambia el color a azul
          color: 'white', // Cambia el color del texto a blanco
          borderRadius: '5px', // Bordes redondeados
          border: 'white', // Quita el borde
          cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
        }}
      >
        Continuar
      </button>
            </div>
        </div>
      
    </div>
  );
};

export default RetiroConTarjetaScreen;