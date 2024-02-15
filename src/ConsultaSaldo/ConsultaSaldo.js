import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

function Saldo() {
    const location = useLocation();
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
    

    return (
        <div>
            <h1>Saldo Actual</h1>
            <p>{saldo}</p>
        </div>
    );
}

export default Saldo;