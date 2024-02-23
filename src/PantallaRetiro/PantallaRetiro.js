import { useEffect } from 'react';
import '../FueraDeServicio/FueraServicio.css';
import { useNavigate } from 'react-router-dom';
import img from"../IMG-DispensarDinero.png";


const TomarDinero = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/finalizacion');
        }, 2000);
    });
    return(
        <div className="no-service-container">
            <div className="no-service-wrapper">
                <h1 style={{fontSize:"50px",marginTop:"30%"}}>Por favor Toma tu Dinero</h1>
                <img style={{height:"40%",width:"40%"}} src={img}></img>
            </div>
        </div>
    )
}

export default TomarDinero;