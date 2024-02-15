import React from 'react';
import './ATMMenu.css';
import { useNavigate } from 'react-router-dom';
const ATMMenu = ({ onSelectOption }) => {
  const navigate = useNavigate();


  const handleNavigate = (option) => {
    if (option === 0) {
      navigate('/card-number');
    }
    if (option === 1) {
      //navigate('/pin-number');
      console.log('Retiro sin tarjeta');
    }
    if (option === 2) {
      navigate('/')
    }
  }

  return (
    <div className="atm-menu-container">
    <h2 className='titulo'>Menú Principal</h2>
          <button className='opciones' onClick={() => handleNavigate(0)}>Retiro Con Tarjeta</button>
          <button style={{ left: '62%' }} className='opciones' onClick={() => handleNavigate(1)}>Retiro Sin Tarjeta</button>
          <br/>
        <button className='salir' onClick={() => handleNavigate(2)}>Salir</button>
     </div>
  );
};
  
export default ATMMenu;