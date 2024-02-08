import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InsercionPIN.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect} from "react";
import axios from "axios";
function InsercionPIN() {
    const [PIN, setPIN] = useState("");
    const [details, setDetails] = useState('');

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
        const cardNumber = '2281234567890123'
        const type = 2;
        axios.post('http://localhost:4000/cards/validate-pin', {cardNumber: cardNumber, type: type, pin: PIN})
        .then((response) => {
            if(response.data.success) {
                console.log(response.data.data);
                setDetails('');
            } else {
                console.log(response.data.details);
                setDetails(response.data.details);
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