import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './ConsultaSaldo.css';

function Saldo() {
    const location = useLocation();
    const navigate = useNavigate();
    const cardNumber = location.state.data;
    const [saldo, setSaldo] = useState('Cargando saldo...');

    useEffect(() => {
        if (cardNumber) {
            async function fetchSaldo() {
                try {
                    console.log('Tarjeta en ConsultaSaldo');
                    console.log(cardNumber);
                    const response = await axios.post('http://localhost:4000/cards/obtener-saldo', { numeroTarjeta: cardNumber } );
                    setSaldo(`Saldo: $${response.data.saldo.Saldo}`);
                } catch (error) {
                    console.error('Error al cargar el saldo:', error);
                    setSaldo('Error al cargar el saldo.');
                }
            }
    
            fetchSaldo();
        }
    }, [cardNumber]);

    const handleNavigate = (option) => {
        if (option === 0) {
          navigate('/main-menu');
        }
      }
    

    return (
        <div className="atm-menu-container">
            <div className='atm-menu-wrapper'>
                <h2 className='titulo'>Saldo Actual
                <h1 style={{ left: '50%', top: '50%' }}>{saldo}</h1></h2>
                <ul>
                    <li className='negative-button' onClick={() => handleNavigate(0)}>Salir</li>
                </ul>
            </div>
        </div>        
    );
}

export default Saldo;