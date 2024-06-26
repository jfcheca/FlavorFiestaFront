import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [personalData, setPersonalData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    apartamento: '',
    ciudad: '',
    codigoPostal: ''
  });

  return (
    <AppContext.Provider value={{ total, setTotal, personalData, setPersonalData }}>
      {children}
    </AppContext.Provider>
  );
};
