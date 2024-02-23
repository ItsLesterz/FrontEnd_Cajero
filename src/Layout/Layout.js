import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    
    let timer;
  
    useEffect(() => {
      timer = setTimeout(() => {
        setShowPopup(true);
      }, 20000);

      // Limpiar el temporizador cuando el componente se desmonte
      return () => {
        clearTimeout(timer);
      };
    }, []); // Dependencia vacía para que solo se ejecute una vez al montar el componente
  
    const handleInteraction = () => {
      setShowPopup(false); 
      clearTimeout(timer); 
      timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);
    };
  
    const handleContinue = () => {
      setShowPopup(false);
      handleInteraction();
    };
  
    const handleExit = () => {
      navigate('/'); // Llevar al usuario a la página principal
    };
  
    return (
      <div className="layout">
          <Popup showPopup={showPopup} handleContinue={handleContinue} handleExit={handleExit} /> {/* Usar el componente Popup */}
          <div className="content">
              {/* Contenido de la aplicación */}
              {children}
          </div>
      </div>
    );
};

export default Layout;
