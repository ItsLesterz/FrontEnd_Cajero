import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReportesTarjeta.css';
import axios from 'axios';
import Layout from '../Layout/Layout';

const ATMMenu = ({ onSelectOption }) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [details, setDetails] = useState('');
    const [reports, setReports] = useState([]);
    const location = useLocation();
    const cardNumber = location.state.data;

    const handleExit = () => {
        navigate('/main-menu');
    }

    const handleGetReports= () => {
            axios.post('http://localhost:4000/reports/obtener-reportes', { cardNumber: cardNumber})
            .then((response) => {
                setReports(response.data.data);

            })
            .catch((error) => {
                setDetails(error.response.data.details);
            })            
    }

    const handleGetPastReports= () => {
        axios.post('http://localhost:4000/reports/obtener-reportes-pasado', { cardNumber: cardNumber})
        .then((response) => {
            setReports(response.data.data);

        })
        .catch((error) => {
            setDetails(error.response.data.details);
        })    
        
        
}

const handleMiles = (monto) => {
    const inputValue = monto.toString().replace(/\D/g, ""); // Convertir a cadena de texto y luego eliminar caracteres no numéricos
    let formattedValue = "";
    const numberOfDigits = inputValue.length; 
    for (let i = numberOfDigits - 1; i >= 0; i--) {
        formattedValue = inputValue[i] + formattedValue;
        if ((numberOfDigits - i) % 3 === 0 && i !== 0) {
            formattedValue = "," + formattedValue;
        }
    }
    return formattedValue;
};

const dateFormat = (dateStr) => {
    const dateObj = new Date(dateStr);
    const formattedDate = `${("0" + dateObj.getUTCDate()).slice(-2)}-${("0" + (dateObj.getUTCMonth() + 1)).slice(-2)}-${dateObj.getUTCFullYear().toString()}`;
    return formattedDate;
}

    return (
    <Layout>
    <div className="reports-container">
        <div className="reports-wrapper">
            <h1>Reportes</h1>
            <div className='options-container'>
                <button onClick={handleGetPastReports}>Mes Anterior</button>
                <button onClick={handleGetReports}>Mes Actual</button>
            </div>
            <p className='error-message'>{details}</p>
            <div className='reports-header'>
                <p className='trans-id-header'>Número Tarjeta</p>
                <p className='trans-card-number-header'>Detalles</p>
                <p className='monto-header'>Monto</p>
                <p className='trans-report-details-header'>Fecha</p>
            </div>
            <div className='reports'>
                {reports.length > 0 ? (
                    reports.map((report, index) => (
                        <div key={index} className='report'>
                            <p className='trans-card-number'>{report.Numero_Tarjeta}</p>
                            <p className='trans-report-details'>{report.Detalles}</p>
                            <p className='monto-header'>{handleMiles(report.Monto)}</p>
                            <p className='trans-id'>{dateFormat(report.Fecha_Transaccion)}</p>
                        </div>
                    ))
                ):(
                    <p>No se encontraron transacciones en la fecha especificada.</p>
                )}
            </div>
            <ul>
                <li className='negative-button' onClick={handleExit}>Salir</li>
            </ul>
        </div>
    </div>
    </Layout>
  );
};
  
export default ATMMenu;