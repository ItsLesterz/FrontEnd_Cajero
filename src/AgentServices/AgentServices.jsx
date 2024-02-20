// ATMMenu.js

import React, { useEffect, useState } from 'react';
import './AgentServices.css';
import '../PaginaPrincipal/PaginaPrincipal.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaginaPrincipal = ({ onSelectOption }) => {

  const navigate = useNavigate();

  const [trays, setTrays] = useState([]);
  const [newTrays, setNewTrays] = useState([]);
  const [message, setMessage] = useState('');

  const [hasExistingTrays,setHasExistingTrays] = useState(false);
  const [hasNewTrays,setHasNewTrays] = useState(false);

  //Tray Data
  const [position, setPosition] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [denomination, setDenomination] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [showTrayPopup, setShowTrayPopup] = useState(false);
  const [showRemoveTrayPopup, setShowRemoveTrayPopup] = useState(false);
  const [popupCounter, setPopupCounter] = useState(1);

  const [currentTray, setCurrentTray] = useState('');

  const [showTrayRemovingPopup, setShowTrayRemovingPopup] = useState(false);

  const location = useLocation();
  const cardNumber = location.state.cardNumber;
  
  const handleGetTrays = () => {
    axios.post('http://localhost:4000/trays/get-trays', {atmId: 'CJ001'})
    .then((response) => {
      if(response.data.data.length > 0) {
        setHasExistingTrays(true);
      }
      setTrays(response.data.data);
      setCurrentTray(response.data.data[0]);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleRemoveTrays = () => {
    if(trays.length > 0) {
      setShowRemoveTrayPopup(true);
    } else {
      setMessage('No hay bandejas que retirar.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }

  const handleConfirmRemoval = () => {
    handleRemoveTrays();
    setShowTrayRemovingPopup(false);
  }

  const handleRemoveTray = () => {
    setShowRemoveTrayPopup(false);
    axios.post('http://localhost:4000/trays/retirar-bandeja', {idCajero: 'CJ001', idBandeja: currentTray.Id_Bandeja})
      .then((response) => {
        setTimeout(() => {
          handleGetTrays();
        }, 2000);
        setTimeout(() => {
          setShowTrayRemovingPopup(true);
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
      setPosition(popupCounter);
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
      Posicion_Bandeja: position,
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
      setHasExistingTrays(false);
      setHasNewTrays(true);
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
    <div className="agent-services-container">
        <div className="agent-services-wrapper">
          <h2>Servicios de Agente</h2>
          <h4>Bandejas Disponibles</h4>
          <ul className='trays-container'>
              {trays.length > 0 ? (
                trays.map((tray, index) => (
                  <div key={index} className='tray'>
                    <p>Bandeja: {tray.Id_Bandeja_Varchar}</p>
                    <p>Posicion: {tray.Posicion_Bandeja}</p>
                    <p>Cantidad: {tray.Cantidad_Billete}</p>
                    <p>Denominacion: L. {tray.Denominacion_Billete}</p>
                  </div>
                ))
              ) : (
                <p className='message'>El cajero está vacío.</p>
              )}
              
          </ul>
          <ul className='trays-options'>
            <li onClick={handleInsertNewTrays}>Cargar Bandejas</li>
            {hasExistingTrays && (
              <li onClick={handleRemoveTrays}>Retirar Bandejas</li>
            )} 
            {hasNewTrays && (
              <li onClick={handleSendTrayData}>Confirmar</li>
            )}
          </ul>
          <div className='message-container'>
            <p className='message'>{message}</p>
          </div>
          {showPopup && (
            <div className='popup'>
              <div className='popup-content'>
                <p>Desea cargar la bandeja en la posición {popupCounter}?</p>
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
                <h2>Posición {popupCounter - 1}</h2>
                <p>Ingrese la cantidad de billetes.</p>
                <input type='number' placeholder='Cantidad' onChange={(e) => setQuantity(e.target.value)}/>
                <p>Ingrese la denominación.</p>
                <input type='number' placeholder='Denominación' onChange={(e) => setDenomination(e.target.value)}/>
                <button onClick={handleAccept}>Aceptar</button>
              </div>
            </div>
          )} 
          {showRemoveTrayPopup && (
            <div className='popup'>
              <div className='popup-content'>
                <p>Retire la bandeja en la posición {currentTray.Posicion_Bandeja} y muestrela la cámara.</p>
                <button onClick={handleRemoveTray}>Aceptar</button>
              </div>
            </div>
          )} 
          {showTrayRemovingPopup && (
            <div className='popup'>
              <div className='popup-content'>
                <p>Bandeja retirada exitosamente.</p>
                <button onClick={handleConfirmRemoval}>Aceptar</button>
              </div>
            </div>
          )} 
        </div>
      </div>
  );
};
  
export default PaginaPrincipal;
