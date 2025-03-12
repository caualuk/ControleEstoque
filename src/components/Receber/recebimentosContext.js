import React, { createContext, useState } from 'react';

export const RecebimentosContext = createContext();

export const RecebimentosProvider = ({ children }) => {
  const [recebimentos, setRecebimentos] = useState([]);
  const [valorTotalRecebimentos, setValorTotalRecebimentos] = useState(0);

  return (
    <RecebimentosContext.Provider value={{ recebimentos, setRecebimentos, valorTotalRecebimentos, setValorTotalRecebimentos }}>
      {children}
    </RecebimentosContext.Provider>
  );
};