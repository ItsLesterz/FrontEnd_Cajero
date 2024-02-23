import React from 'react';
import './Popup.css';

const Popup = ({ showPopup, handleContinue, handleExit }) => {
  return (
    showPopup && (
      <div className="popup">
        <div className='popup-content'>
            <h1>¿Desea más tiempo?</h1>
            <ul>
                <li className='negative-button' onClick={handleExit}>Salir</li>
                <li className='positive-button' onClick={handleContinue}>Continuar</li>
            </ul>
        </div>

      </div>
    )
  );
};

export default Popup;