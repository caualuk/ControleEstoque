import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase'; // Importe o Firebase
import { collection, doc, updateDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore'; // Importe as funções do Firestore
import { useClientes } from '../ClientesProvider/ClientesProvider';
import styled from 'styled-components';

// Estilos
const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const Content = styled.div`
    margin-left: 170px;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    background-color: #007bff;
    color: white;
    padding: 10px;
    text-align: left;
`;

const Td = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
    background-color: ${({ status }) => (status === 'Pago' ? '#28a745' : '#dc3545')};
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${({ status }) => (status === 'Pago' ? '#218838' : '#c82333')};
    }
`;

const Clientes = () => {
  const { clientes, atualizarStatusCliente } = useClientes(); 

  return (
    <Container>
        <Content>
        <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nome}</td>
              <td>R$ {cliente.valor.toFixed(2)}</td>
              <td>{cliente.status}</td>
              <td>
                <button onClick={() => atualizarStatusCliente(cliente.nome, 'pago')}>Marcar como Pago</button>
                <button onClick={() => atualizarStatusCliente(cliente.nome, 'pendente')}>Marcar como Pendente</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </Content>
    </Container>
  );
};

export default Clientes;