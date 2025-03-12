import React, { createContext, useState } from 'react';

// Cria o contexto
export const GastosContext = createContext();

// Cria o provedor do contexto
export const GastosProvider = ({ children }) => {
  const [valorTotalDespesas, setValorTotalDespesas] = useState(0);

  return (
    <GastosContext.Provider value={{ valorTotalDespesas, setValorTotalDespesas }}>
      {children}
    </GastosContext.Provider>
  );
};