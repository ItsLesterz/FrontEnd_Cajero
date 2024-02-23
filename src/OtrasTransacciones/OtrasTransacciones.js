import { useLocation, useNavigate } from 'react-router-dom';
import './OtrasTransacciones.css';
import Layout from '../Layout/Layout';
const OtrasTransacciones = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardNumber = location.state.data;
    const handleOptionSelect = (option) => {
        if (option === 1) {
            navigate('/main-consulta', { state: { data: cardNumber }})
        }
        if (option === 2) {
            navigate('/reportes-tarjeta', { state: { data: cardNumber }});
        }
    }
    return(
        <Layout>
        <div className="other-transactions-container">
            <div className="other-transactions-wrapper">
                <ul className='options-list'>
                    <li className='' onClick={() => handleOptionSelect(1)}>Ver Saldo</li>
                    <li className='' onClick={() => handleOptionSelect(2)}>Transacciones</li>
                    <li className='negative-button'>Salir</li>
                </ul>
            </div>
        </div>
        </Layout>
    )
}

export default OtrasTransacciones;