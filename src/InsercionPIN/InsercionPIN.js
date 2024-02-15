import React from 'react';
import { Links, useLocation, useNavigate } from "react-router-dom";
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

    const handleEnviarPIN = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/cards/validate-pin', {cardNumber: cardNumber, type: cardType, pin: PIN})
        .then((response) => {
            if(response.data.success) {
                const data = response.data.data;
                //console.log(response.data.data);
                if (data.type < 3) {
                    console.log('Tarjeta en InsercionPIN');
                    console.log(cardNumber);
                    navigate('/main-consulta', { state: { data: cardNumber } })
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
        <div className='paginaPIN'>
            <div className="atm-menu-wrapper">
                    <h2 className='Titulo'>Digite su PIN</h2>
                    <br></br>
                    <br></br>
                    <Form className='FormPIN'>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password"
                            maxLength={4}
                            value={PIN}
                            placeholder="----"
                            onChange={handlePINChange}/>
                        </Form.Group>
                        <p>{details}</p>
                        <Button variant="primary" type="submit" onClick={handleEnviarPIN}>
                            Continuar
                        </Button>
                    </Form>
                </div>
        </div>
    )
}
export default InsercionPIN