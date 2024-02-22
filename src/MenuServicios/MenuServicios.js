import { useLocation, useNavigate } from 'react-router-dom';
import './MenuServicios.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Servicios = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardNumber = location.state.data;

    const [details, setDetails] = useState('');

    const [cardData, setCardData] = useState('');

    const handleGetCardData = (tarjetaNumber) => {
        axios.post('http://localhost:4000/cards/validate-card', {cardNumber: tarjetaNumber})
        .then((response) => {
            if(response.data.success) {
                setCardData(response.data.data);
                console.log(response.data.data);
                setDetails('');
            } else {
                setDetails(response.data.details);
                setTimeout(() => {
                    setDetails('');
                }, 2000);
            }
        })
        .catch((error) => {
            setDetails('Hubo un error al momento de tratar de obtener los datos.');
            setTimeout(() => {
            setDetails('');
            }, 2000);
            console.log(error);
        })
    };

    useEffect(() => {
        console.log('Probando');;
        if (location.state) {
            console.log(location.state.data);
            handleGetCardData(location.state.data);
        } else {
            navigate('/main-menu');
        }
    }, []);

    const handleRedirect = (option) => {
        if (option === 1) {
            navigate('/reportes', { state: {data: cardNumber }});
        }
        if (option === 2) {
            navigate('/agent-services', { state: {data: cardNumber }});
        }
        if (option === 3) {
            navigate('/main-menu');
        }
    }

    return(
        <div className="other-transactions-container">
            <div className="other-transactions-wrapper">
                <ul className='options-list'>
                    <li className='' onClick={() => handleRedirect(2)}>Cambio de Bandejas</li>
                    {cardData.type === 4 && (
                        <li className='' onClick={() => handleRedirect(1)}>Reportes</li>
                    )}
                    <li className='negative-button' onClick={() => handleRedirect(3)}>Salir</li>
                </ul>
            </div>
        </div>
    )
}

export default Servicios;