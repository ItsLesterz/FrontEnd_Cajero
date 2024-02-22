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
        if (startDate === '' || endDate === '') {
            setDetails('Selecciones el rango de fechas a consultar.')
            setTimeout(() => {
                setDetails('');
            }, 2000);
        } else {
            axios.post('http://localhost:4000/reports/get-reports', { startDate: startDate, endDate: endDate})
            .then((response) => {
                setReports(response.data.data);
                console.log(response.data.data[0].Detalles);
            })
            .catch((error) => {
                setDetails(error.response.data.details);
            })
            console.log(startDate);
        }
    }

    return (
    <div className="reports-container">
        <div className="reports-wrapper">
            <h1>Reportes</h1>
            <div className='options-container'>
                <label for="fecha">Inicio:</label>
                <input type="date" id="fecha" name="fecha" onChange={(e) => setStartDate(e.target.value)}/>
                <label for="fecha">Fin:</label>
                <input type="date" id="fecha" name="fecha" onChange={(e) => setEndDate(e.target.value)}/>
                <button onClick={handleGetReports}>Consultar</button>
            </div>
            <p className='error-message'>{details}</p>
            <div className='reports-header'>
                <p className='id-header'>Id</p>
                <p className='card-number-header'>Numero Tarjeta</p>
                <p className='report-details-header'>Detalles</p>
                <p>Monto</p>
            </div>
            <div className='reports'>
                {reports.length > 0 ? (
                    reports.map((report, index) => (
                        <div key={index} className='report'>
                            <p className='id'>{report.Id_Reportes}</p>
                            <p className='card-number'>{report.Numero_Tarjeta}</p>
                            <p className='report-details'>{report.Detalles}</p>
                            <p className='amount'>{report.Monto}</p>
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