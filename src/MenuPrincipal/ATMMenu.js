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
      <div className='atm-menu-wrapper'>
      <h2 className='titulo'>Menú Principal</h2>
      <div className='options-container'>
        <ul className='options'>
          <li className='option' onClick={() => handleNavigate(0)}>Retiro con Tarjeta</li>
          <li className='negative-button' onClick={() => handleNavigate(2)}>Salir</li>
        </ul>
        <ul className='options'>
          <li className='option'>Retiro sin Tarjeta</li>
          <li className='empty'></li>
        </ul>
      </div>
      </div>
     </div>
  );
};
  
export default ATMMenu;