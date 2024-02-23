import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InsercionPIN.css"
import { useState,useEffect} from "react";
import axios from "axios";
function InsercionPIN() {
    const location = useLocation();
    const navigate = useNavigate();
    const [PIN, setPIN] = useState("");
    const [details, setDetails] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');

    
    const handlePINChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, "").substring(0, 4);
        let formattedValue = "";
        for (let i = 0; i < inputValue.length; i += 4) {
            if (i !== 0) {
                formattedValue += "-";
            }
            formattedValue += inputValue.substring(i, i + 4);
        }
        setPIN(formattedValue);
    };
    useEffect(() => {
        if (location.state) {
            setCardNumber(location.state.cardData.cardNumber);
            setCardType(location.state.cardData.type);

        } else {
            navigate('/card-number');
        }
    });

    const handleExit = () => {
        navigate("/main-menu")
    }

    const handleEnviarPIN = (e) => {
        e.preventDefault();
        
        console.log('cardNumber: ', cardNumber);
        axios.post('http://localhost:4000/cards/validate-pin', {cardNumber: cardNumber, type: cardType, pin: PIN})
        .then((response) => {
            if(response.data.success) {
                const data = response.data.data;
                if (data.type < 3) {
                    console.log('Tarjeta en InsercionPIN');
                    navigate('/retiro-tarjeta', { state: { data: cardNumber }})
                } else {
                    console.log('Es agente');
                    navigate('/menu-servicios', {state: { data: cardNumber }});
                }
                setDetails('');
                handleCreateReport('Verificación exitosa.', 0.00)
            } else {
                setDetails(response.data.details);
                setTimeout(() => {
                    setDetails('');
                }, 2000);
                handleCreateReport('Intento fallido al tratar de validar datos.', 0.00)
            }
            setPIN('');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleCreateReport = (details, amount) => {
        const fecha = new Date; 
        const dia = fecha.getDate().toString().padStart(2, '0'); 
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear().toString();
    
        const fechaFormateada = `${anio}-${mes}-${dia}`;
    
        const reportData = {
          numeroTarjeta: cardNumber,
          fechaTransaccion: fechaFormateada,
          detalles: details,
          monto: amount
        }
        axios.post('http://localhost:4000/reports/create-report', { reportData: reportData})
        .then((response) => {
          console.log(response.data.details);
        })
        .catch((error) => {
          console.log(error);
        })
      }

   

    return(
        <div className='insert-pin-container'>
            <div className='insert-pin-wrapper'>
                <h2 className='title'>Digite su PIN</h2>
                <input 
                    className='pin-input'
                    type="password"
                    maxLength={4}
                    value={PIN}
                    placeholder="----"
                    onChange={handlePINChange}
                />
                <div className='details-container'>
                    <p className='error-message'>{details}</p>                    <br/>
                </div>

                <ul className='options-container'>
                    <ul className='options'>
                        <li className='negative-button' onClick={handleExit}>Salir</li>
                    </ul>
                    <ul className='options'>
                        <li className='positive-button' onClick={handleEnviarPIN}>Continuar</li>
                    </ul>
                </ul>

            </div>
        </div>
    )
}
export default InsercionPIN