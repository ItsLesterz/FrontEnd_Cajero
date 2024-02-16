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
    const cardNumber = location.state.cardData.cardNumber;
    const cardType = location.state.cardData.type;

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

    const handleExit = () => {
        navigate("/main-menu")
    }

    const handleEnviarPIN = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/cards/validate-pin', {cardNumber: cardNumber, type: cardType, pin: PIN})
        .then((response) => {
            if(response.data.success) {
                const data = response.data.data;
                if (data.type < 3) {
                    console.log('Tarjeta en InsercionPIN');
                    console.log(cardNumber);
                    //navigate('/main-consulta', { state: { data: cardNumber } })
                    navigate('/retiro-tarjeta', { state: { data: cardNumber } })
                } else {
                    console.log('Es agente');
                    navigate('/agent-services');
                }
                setDetails('');
            } else {
                setDetails(response.data.details);
                setTimeout(() => {
                    setDetails('');
                }, 2000);
            }
            setPIN('');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return(
        <div className='insert-pin-container'>
            <div className='insert-pin-wrapper'>
                <h2 className='title'>Digite su PIN</h2>
                <input 
                    type="password"
                    maxLength={4}
                    value={PIN}
                    placeholder="----"
                    onChange={handlePINChange}
                />
                <ul>
                    <li className='negative-button' onClick={handleExit}>Salir</li>
                    <li className='positive-button' onClick={handleEnviarPIN}>Continuar</li>
                </ul>
                <div className='details-container'>
                    <p className='error-message'>{details}</p>                    <br/>
                </div>
            </div>
        </div>
    )
}
export default InsercionPIN