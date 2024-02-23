// ATMMenu.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Reportes.css';
import axios from 'axios';

const ATMMenu = ({ onSelectOption }) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [details, setDetails] = useState('');
    const [reports, setReports] = useState([]);
    const handleExit = () => {
        navigate('/main-menu');
    }

    const handleGetReports= () => {
        axios.post('http://localhost:4000/reports/get-reports', { startDate: startDate, endDate: endDate})
            .then((response) => {
                setReports(response.data.data);
                console.log(response.data.data);
                console.log(response.data.data[0].Detalles);
            })
            .catch((error) => {
                setDetails(error.response.data.details);
            })
            console.log(startDate);
    }

    const handleGetMobthReports= () => {
        axios.post('http://localhost:4000/reports/get-last-month', { startDate: startDate, endDate: endDate})
            .then((response) => {
                setReports(response.data.data);
                console.log(response.data.data);
                console.log(response.data.data[0].Detalles);
            })
            .catch((error) => {
                setDetails(error.response.data.details);
            })
            console.log(startDate);
    }

    const dateFormat = (dateStr) => {
        const dateObj = new Date(dateStr);
        const formattedDate = `${("0" + dateObj.getUTCDate()).slice(-2)}-${("0" + (dateObj.getUTCMonth() + 1)).slice(-2)}-${dateObj.getUTCFullYear().toString()}`;
        return formattedDate;
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
    

    return (
    <div className="reports-container">
        <div className="reports-wrapper">
            <h1>Reportes</h1>
            <div className='options-container'>
                <button onClick={handleGetMobthReports}>Mes Anterior</button>
                <button onClick={handleGetReports}>Mes Actual</button>
            </div>
            
            <p className='error-message'>{details}</p>
            <div className='reports-header'>
                <p className='id-header'>Id</p>
                <p className='card-number-header'>Numero Tarjeta</p>
                <p className='report-details-header'>Detalles</p>
                <p className='monto-header'>Monto</p>
                <p className='fecha-header'>Fecha del proceso</p>
            </div>
            <div className='reports'>
                {reports.length > 0 ? (
                    reports.map((report, index) => (
                        <div key={index} className='report'>
                            <p className='id'>{report.Id_Reportes}</p>
                            <p className='card-number'>{report.Numero_Tarjeta}</p>
                            <p className='report-details'>{report.Detalles}</p>
                            <p className='monto'>{handleMiles(report.Monto)}</p>
                            <p className='fecha-container'>{dateFormat(report.Fecha_Transaccion)}</p>
                        </div>
                    ))
                ):(
                    <p>No se encontraron reportes dentro de esas fechas.</p>
                )}
            </div>
            <ul>
                <li className='negative-button' onClick={handleExit}>Salir</li>
            </ul>
        </div>
    </div>
  );
};
  
export default ATMMenu;