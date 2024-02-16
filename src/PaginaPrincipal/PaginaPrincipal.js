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
    <div className="overlay">
    <div className="atm-menu-container">
        <video style={{position:"fixed",width:"80%",height:"81%",top:"9%",right:"25%"}} onClick={handleScreenClick} src={videobackground} autoPlay muted loop/>
     </div>
    </div>
  );
};

export default PaginaPrincipal;