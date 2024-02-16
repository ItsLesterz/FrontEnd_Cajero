// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal/PaginaPrincipal';
import ATMMenu from './MenuPrincipal/ATMMenu'; 
import CardNumber from './InsercionTarjeta/InsercionTarjeta';
import PinNumber from './InsercionPIN/InsercionPIN';
import AgentServices from './AgentServices/AgentServices';
import UserServices from './UserServices/UserServices';
import RetiroTarjeta from './RetiroTarjeta/RetiroTarjeta';
import MainConsulta from './ConsultaSaldo/ConsultaSaldo';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<PaginaPrincipal/>}/>
            <Route path='/main-menu' element={<ATMMenu/>}/>
            <Route path='/card-number' element={<CardNumber/>}/>
            <Route path='/pin-number' element={<PinNumber/>}/>
            <Route path='/agent-services' element={<AgentServices/>}/>
            <Route path='/user-services' element={<UserServices/>}/>
            <Route path='/retiro-tarjeta' element={<RetiroTarjeta/>}/>
            <Route path='/main-consulta' element={<MainConsulta/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
