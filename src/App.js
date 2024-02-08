// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal/PaginaPrincipal';
import ATMMenu from './MenuPrincipal/ATMMenu'; 

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<PaginaPrincipal/>}/>
            <Route path='/main-menu' element={<ATMMenu/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
