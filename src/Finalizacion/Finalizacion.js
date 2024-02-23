import { useEffect } from 'react';
import './Finalizacion.css';
import { useNavigate } from 'react-router-dom';

const Finalizacion = () => {
    const navigate = useNavigate();
    const Continuar = () => {
        
        navigate("/");
    }
    return(
        <div className="fin-container">
            <div className="fin-wrapper">
                <h1 style={{fontSize:"50px",marginTop:"30%"}}>¡GRACIAS POR PREFERIRNOS!</h1>
                    <ul className='options'>
                        <li style={{marginBottom:"20%"}} className='positive-button' onClick={Continuar}>Continuar</li>
                    </ul>
            </div>
        </div>
    )
}

export default Finalizacion;