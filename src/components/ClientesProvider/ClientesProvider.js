import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../../firebase.js'; // Importe o Firebase
import { collection, getDocs } from 'firebase/firestore'; // Importe as funções do Firestore

// Cria o contexto
export const ClientesContext = createContext();

// Provedor de clientes
export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  // Função para carregar os clientes do Firestore
  const carregarClientes = async () => {
    const clientesCollectionRef = collection(db, 'clientes');
    const querySnapshot = await getDocs(clientesCollectionRef);
    const clientesData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.nome,
        valor: data.valor || 0, // Garante que o valor seja um número
        status: data.status || 'pendente' // Garante que o status tenha um valor padrão
      };
    });
    setClientes(clientesData); // Atualiza o estado com os dados do Firestore
  };

  // Carrega os clientes quando o componente é montado
  useEffect(() => {
    carregarClientes();
  }, []);

  // Função para adicionar um cliente
  const adicionarCliente = (nome, valor, status = 'pendente') => {
    setClientes([...clientes, { nome, valor, status }]);
  };

  // Função para atualizar o status de um cliente
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

// Hook personalizado para usar o contexto de clientes
export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error('useClientes deve ser usado dentro de um ClientesProvider');
  }
  return context;
};