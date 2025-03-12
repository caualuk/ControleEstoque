import React, { createContext, useState } from 'react';

export const RecebimentosContext = createContext();

export const RecebimentosProvider = ({ children }) => {
  const [valorTotalRecebimentos, setValorTotalRecebimentos] = useState(0);

  return (
    <RecebimentosContext.Provider value={{ valorTotalRecebimentos, setValorTotalRecebimentos }}>
      {children}
    </RecebimentosContext.Provider>
  );
};