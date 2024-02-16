// ATMMenu.js

import React, { useEffect, useState } from 'react';
import './AgentServices.css';
import '../PaginaPrincipal/PaginaPrincipal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaginaPrincipal = ({ onSelectOption }) => {

  const navigate = useNavigate();

  const [trays, setTrays] = useState([]);
  const [message, setMessage] = useState('');

  const [newTrays,setNewTrays] = useState(false);

  //Tray Data
  const [quantity, setQuantity] = useState(1);
  const [denomination, setDenomination] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [showTrayPopup, setShowTrayPopup] = useState(false);
  const [popupCounter, setPopupCounter] = useState(1);

  const handleGetTrays = () => {
    axios.post('http://localhost:4000/trays/get-trays', {atmId: 'CJ001'})
    .then((response) => {
      console.log(response.data.data);
      setTrays(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleRemoveTrays = () => {
    axios.post('http://localhost:4000/trays/retirar-bandejas', {idCajero: 'CJ001'})
    .then((response) => {
      setMessage(response.data.message);
      setTimeout(() => {
        handleGetTrays();
        setMessage('');
      }, 2000);
    })
    .catch((error) => {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    })
  }

  const handleInsertTrays = (tray) => {
    if(tray <= 3) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }

  const handleOptionSelect = (option) => {
    if(option === 1) {
      setPopupCounter(popupCounter + 1);
      setShowPopup(false);
      setShowTrayPopup(true);
    } else {
      setPopupCounter(popupCounter + 1);
      setShowTrayPopup(false);
      handleInsertTrays(popupCounter + 1);
    }
  }

  const handleAccept = () => {
    setShowTrayPopup(false);
    handleInsertTrays(popupCounter);
    handleInsertTray();
  }

  const handleInsertTray = () => {
    const newTrays = [...trays];
    const tray = {
      Id_Cajero: 'CJ001',
      Denominacion_Billete: denomination,
      Cantidad_Billete: quantity,
      activo: 0
    };
    newTrays.push(tray);
    setTrays(newTrays);
  }


  const handleSendTrayData = () => {
    axios.post('http://localhost:4000/trays/insertar-bandejas', {trays: trays})
    .then((response) => {
      setMessage(response.data.details);
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 2000);
    })
    .catch((error) => {
      setMessage(error.response.data.details);
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 2000);
    })
  }

  const handleInsertNewTrays = () => {
    if (trays.length === 0) {
      setShowPopup(true);
      setNewTrays(true);
    } else {
      setMessage('Retire las bandejas antes de insertar nuevas.')
      setTimeout(() => {
        setMessage('')
      }, 2000);
    }
    
  }

  useEffect(() => {
    handleGetTrays();
  }, []);
  
  return (
    <div className="overlay">
      <div className="agent-services-container">
        <div className="atm-menu-wrapper">
          <h2>Servicios de Agente</h2>
          <h4>Bandejas Disponibles</h4>
          <ul className='trays-container'>
              {trays.length > 0 ? (
                trays.map((tray, index) => (
                  <div key={index} className='tray'>
                    <p>Bandeja: {tray.Id_Bandeja_Varchar}</p>
                    <p>Cantidad: {tray.Cantidad_Billete}</p>
                    <p>Denominacion: L. {tray.Denominacion_Billete}</p>
                  </div>
                ))
              ) : (
                <p>El cajero está vacío.</p>
              )}
              
          </ul>
          <ul>
            <li onClick={handleInsertNewTrays}>Cargar Bandejas</li>
            <li onClick={handleRemoveTrays}>Retirar Bandejas</li>
            {newTrays && (
              <li onClick={handleSendTrayData}>Confirmar</li>
            )}
          </ul>
          <p>{message}</p>
        </div>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <p>Desea cargar bandeja {popupCounter} ?</p>
            <div className='popup-options'>
              <button onClick={() => handleOptionSelect(1)}>Si</button>
              <button onClick={() => handleOptionSelect(2)}>No</button>
            </div>
          </div>
        </div>
      )}
      {showTrayPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <p>Cantidad</p>
            <input type='number' placeholder='Cantidad' onChange={(e) => setQuantity(e.target.value)}/>
            <p>Denominación</p>
            <div>
              <button value={100} onClick={(e) => setDenomination(e.target.value)}>100</button>
              <button value={200} onClick={(e) => setDenomination(e.target.value)} >200</button>
              <button value={500} onClick={(e) => setDenomination(e.target.value)}>500</button>
            </div>
            <button onClick={handleAccept}>Aceptar</button>
          </div>
        </div>
      )} 
      
    </div>
  );
};
  
export default PaginaPrincipal;
