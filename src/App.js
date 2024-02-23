// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal/PaginaPrincipal';
import ATMMenu from './MenuPrincipal/ATMMenu'; 
import CardNumber from './InsercionTarjeta/InsercionTarjeta';
import PinNumber from './InsercionPIN/InsercionPIN';
import CambioBandejas from './CambioBandejas/CambioBandejas';
import UserServices from './UserServices/UserServices';
import RetiroTarjeta from './RetiroTarjeta/RetiroTarjeta';
import MainConsulta from './ConsultaSaldo/ConsultaSaldo';
import RetiroSinTarjeta from './RetiroSinTarjeta/RetiroSinTarjeta';
import OtrasTransacciones from './OtrasTransacciones/OtrasTransacciones';
import SinServicio from './FueraDeServicio/FueraServicio';
import FueraServicio from './FueraDeServicio/FueraServicio';
import DenominacionesDisponibles from './DenominacionesDisponibles/DenominacionesDisponibles';
import MenuServicios from './MenuServicios/MenuServicios';
import Reports from './Reportes/Reportes';
import Anterior from './AnterioresTrans/AnterioresTrans';
function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<PaginaPrincipal/>}/>
            <Route path='/main-menu' element={<ATMMenu/>}/>
            <Route path='/card-number' element={<CardNumber/>}/>
            <Route path='/pin-number' element={<PinNumber/>}/>
            <Route path='/agent-services' element={<CambioBandejas/>}/>
            <Route path='/user-services' element={<UserServices/>}/>
            <Route path='/retiro-tarjeta' element={<RetiroTarjeta/>}/>
            <Route path='/main-consulta' element={<MainConsulta/>}/>
            <Route path='/sin-tarjeta' element={<RetiroSinTarjeta/>}/>
            <Route path='/otras-transacciones' element={<OtrasTransacciones/>}/>
            <Route path='/sin-servicio' element={<FueraServicio/>}/>;
            <Route path='/denominaciones-disponibles' element={<DenominacionesDisponibles/>}/>;
            <Route path='/menu-servicios' element={<MenuServicios/>}/>;
            <Route path='/reportes' element={<Reports/>}/>
            <Route path='/reportes-anteriores' element={<Anterior/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
