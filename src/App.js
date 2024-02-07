// App.js

import React, { useState } from 'react';
import ATMMenu from './MenuPrincipal/ATMMenu'; 

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Aquí podrías agregar la lógica para navegar a otras páginas o realizar acciones asociadas a cada opción.
  };

  return (
    <div className="app">
      {selectedOption ? (
        <p>Implementa la lógica correspondiente para la opción: {selectedOption}</p>
      ) : (
        <ATMMenu onSelectOption={handleOptionSelect} />
      )}
    </div>
  );
};

export default App;
