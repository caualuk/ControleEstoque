import React, { createContext, useState } from "react";

// Cria o contexto
export const AlertContext = createContext();

// Provedor do contexto
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Função para adicionar um alerta
  const addAlert = (message) => {
    setAlerts((prevAlerts) => [...prevAlerts, message]);
  };

  // Função para remover um alerta
  const removeAlert = (index) => {
    setAlerts((prevAlerts) => {
      const newAlerts = [...prevAlerts]; // Cria uma cópia do array
      newAlerts.splice(index, 1); // Remove o alerta no índice especificado
      return newAlerts; // Retorna o novo array sem o alerta
    });
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};