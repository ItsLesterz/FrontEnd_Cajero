import { useLocation, useNavigate } from 'react-router-dom';
import './OtrasTransacciones.css';
const OtrasTransacciones = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardNumber = location.state.data;
    const handleOptionSelect = (option) => {
        if (option === 1) {
            navigate('/main-consulta', { state: { data: cardNumber } })
        }else if(option ==2){
            navigate('/reportes-anteriores', { state: { data: cardNumber } })
        }else if(option ==3){
            navigate('/main-consulta', { state: { data: cardNumber } })
        }

    }
    return(
        <div className="other-transactions-container">
            <div className="other-transactions-wrapper">
                <ul className='options-list'>
                    <li className='' onClick={() => handleOptionSelect(1)}>Ver Saldo</li>
                    <li className='' onClick={() => handleOptionSelect(2)}>Reportes</li>
                    <li className='negative-button'>Salir</li>
                </ul>
            </div>
        </div>
    )
}

export default OtrasTransacciones;