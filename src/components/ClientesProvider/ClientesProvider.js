import React, { createContext, useState, useContext } from 'react';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  const adicionarCliente = (nome, valor) => {
    setClientes([...clientes, { nome, valor, status: 'pendente' }]);
  };

  const atualizarStatusCliente = (nome, status) => {
    setClientes(clientes.map(cliente => 
      cliente.nome === nome ? { ...cliente, status } : cliente
    ));
  };

  return (
    <ClientesContext.Provider value={{ clientes, adicionarCliente, atualizarStatusCliente }}>
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => useContext(ClientesContext);