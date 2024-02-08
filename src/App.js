// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal/PaginaPrincipal';
import ATMMenu from './MenuPrincipal/ATMMenu'; 
import CardNumber from './InsercionTarjeta/InsercionTarjeta';
import PinNumber from './InsercionPIN/InsercionPIN';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<PaginaPrincipal/>}/>
            <Route path='/main-menu' element={<ATMMenu/>}/>
            <Route path='/card-number' element={<CardNumber/>}/>
            <Route path='/pin-number' element={<PinNumber/>}/>

          </Routes>
        </Router>
    </div>
  );
}

export default App;
