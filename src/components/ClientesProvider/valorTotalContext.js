import React, { createContext, useState } from 'react';

export const ValorTotalContext = createContext();

export const ValorTotalProvider = ({ children }) => {
  const [valorTotalGeral, setValorTotalGeral] = useState(0);

  return (
    <ValorTotalContext.Provider value={{ valorTotalGeral, setValorTotalGeral }}>
      {children}
    </ValorTotalContext.Provider>
  );
};