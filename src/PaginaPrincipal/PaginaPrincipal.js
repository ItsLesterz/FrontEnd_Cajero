import React from 'react';
import './PaginaPrincipal.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import videobackground from "./imagenes.mp4"
const PaginaPrincipal = ({ onSelectOption }) => {

  const navigate = useNavigate();
  const handleScreenClick = () => {
    console.log('Probando');
    navigate('/main-menu')
  }

  
  return (
    <div className="atm-home-container">
      <div className='atm-home-wrapper'>
        <video  onClick={handleScreenClick} src={videobackground} autoPlay muted loop/>
      </div>
    </div>
  );
};

export default PaginaPrincipal;