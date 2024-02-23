import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AnterioresTrans.css';
import axios from 'axios';

const ATMMenu = ({ onSelectOption }) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [details, setDetails] = useState('');
    const [report, setReports] = useState([]);
    const location = useLocation();
    const cardNumber = location.state.data;

    const handleExit = () => {
        navigate('/main-menu');
    }

    const handleGetReports= () => {

        
            axios.post('http://localhost:4000/reports/obtener-reportes', { cardNumber: cardNumber})
            .then((response) => {
                setReports(response.data.report);
                console.log(response.data.report);

            })
            .catch((error) => {
                setDetails(error.response.data.details);
            })
            
            
    }

    return (
    <div className="reports-container">
        <div className="reports-wrapper">
            <h1>Reportes</h1>
            <div className='options-container'>
                
                <button onClick={handleGetReports}>Mes Actual</button>
                <button onClick={handleGetReports}>Mes Anterior</button>
                
            </div>
            <p className='error-message'>{details}</p>
            <div className='reports-header'>
                <p className='trans-id-header'>Fecha</p>
                <p className='trans-card-number-header'>Numero Tarjeta</p>
                <p className='trans-report-details-header'>Detalles</p>
            </div>
            <div className='reports'>
                {report.length > 0 ? (
                    report.map((reports, index) => (
                        <div key={index} className='report'>
                            <p className='trans-id'>{reports.Fecha_Realizado}</p>
                            <p className='trans-card-number'>{reports.Id_Tarjeta}</p>
                            <p className='trans-report-details'>{reports.Descripcion}</p>
                            
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