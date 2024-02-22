import { useEffect } from 'react';
import './FueraServicio.css';
import { useNavigate } from 'react-router-dom';



const FueraServicio = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/main-menu');
        }, 2000);
    });
    return(
        <div className="no-service-container">
            <div className="no-service-wrapper">
                <h1>Fuera de servicio.</h1>
            </div>
        </div>
    )
}

export default FueraServicio;