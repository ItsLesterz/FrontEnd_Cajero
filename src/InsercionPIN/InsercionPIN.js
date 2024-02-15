import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InsercionPIN.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
    const salir=()=>{
        navigate("/main-menu")
      }
    const handleEnviarPIN = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/cards/validate-pin', {cardNumber: cardNumber, type: cardType, pin: PIN})
        .then((response) => {
            if(response.data.success) {
                const data = response.data.data;
                //console.log(response.data.data);
                if (data.type < 3) {
                    console.log('Es tarjeta');
                    navigate('/user-services')
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
        <div className='atm-menu-container'>
                    <h2 className='titulo'>Digite su PIN</h2>
                    <br></br>
                    <br></br>
                    <button className='opciones' variant="primary" type="submit" onClick={handleEnviarPIN}>Continuar</button>
                            <input type="password"
                            maxLength={4}
                            value={PIN}
                            placeholder="----"
                            onChange={handlePINChange}
                            style={{position:"fixed",top:"55%",left:"30%"}}/>
        <p style={{position:"fixed",top:"61%",left:"32%",color:"#f00524",fontSize:"20px"}}>{details}</p>                    <br/>
                    <button className='salir'onClick={salir}>Salir</button>
        </div>
    )
}
export default InsercionPIN