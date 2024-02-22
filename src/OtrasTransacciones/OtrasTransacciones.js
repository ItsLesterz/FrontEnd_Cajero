import { useLocation, useNavigate } from 'react-router-dom';
import './OtrasTransacciones.css';
const OtrasTransacciones = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardNumber = location.state.data;
    const handleOptionSelect = (option) => {
        if (option === 1) {
            navigate('/main-consulta', { state: { data: cardNumber } })
        }
    }
    return(
        <div className="other-transactions-container">
            <div className="other-transactions-wrapper">
                <ul className='options-list'>
                    <li className='' onClick={() => handleOptionSelect(1)}>Ver Saldo</li>
                    <li className=''>Reportes</li>
                    <li className='negative-button'>Salir</li>
                </ul>
            </div>
        </div>
    )
}

export default OtrasTransacciones;