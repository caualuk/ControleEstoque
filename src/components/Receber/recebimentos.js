import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { RecebimentosContext } from './recebimentosContext.js';
import { ValorTotalContext } from '../ClientesProvider/valorTotalContext.js';
import styled from 'styled-components';
import './styledrcb.css';

// Estilos com styled-components
const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const Content = styled.div`
    margin-left: 170px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Line = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    margin: 20px 0;
`;

const Card = styled.div`
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
    background: ${({ color }) => {
        switch (color) {
            case "green":
                return "linear-gradient(135deg, #28a745, #218838)";
            case "red":
                return "linear-gradient(135deg, #dc3545, #c82333)";
            case "blue":
                return "linear-gradient(135deg, #007bff, #0056b3)";
            case "teal":
                return "linear-gradient(135deg, #20c997, #17a2b8)";
            default:
                return "#333";
        }
    }};

    &:hover {
        transform: translateY(-5px);
        cursor: pointer;
    }
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const Value = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

// Componente principal
const Recebimentos = () => {
  const [recebimentos, setRecebimentos] = useState([]);
  const [novoRecebimento, setNovoRecebimento] = useState({ tipo: '', descricao: '', valor: '' });
  const { valorTotalRecebimentos, setValorTotalRecebimentos } = useContext(RecebimentosContext);
  const { valorTotalGeral, setValorTotalGeral } = useContext(ValorTotalContext) || { valorTotalGeral: 0, setValorTotalGeral: () => {} }; // Verificação para evitar erros
  const navigate = useNavigate();

  const recebimentosCollectionRef = collection(db, 'recebimentos');

  // Carrega os recebimentos do Firestore
  const carregarRecebimentos = async () => {
    const data = await getDocs(recebimentosCollectionRef);
    const recebimentosData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setRecebimentos(recebimentosData);
    calcularValorTotal(recebimentosData);
  };

  // Calcula o valor total dos recebimentos
  const calcularValorTotal = (recebimentos) => {
    const total = recebimentos.reduce((acc, recebimento) => acc + parseFloat(recebimento.valor), 0);
    setValorTotalRecebimentos(total);
    setValorTotalGeral(total); // Atualiza o valorTotalGeral no contexto
  };

  // Carrega os recebimentos ao montar o componente
  useEffect(() => {
    carregarRecebimentos();
  }, []);

  // Atualiza o estado novoRecebimento conforme o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoRecebimento({ ...novoRecebimento, [name]: value });
  };

  // Adiciona um cliente à coleção de clientes no Firestore
  const adicionarCliente = async (nomeCliente) => {
    const clientesCollectionRef = collection(db, 'clientes');

    // Verifica se o cliente já existe
    const querySnapshot = await getDocs(query(clientesCollectionRef, where('nome', '==', nomeCliente)));
    if (querySnapshot.empty) {
      // Se o cliente não existir, adiciona à coleção
      await addDoc(clientesCollectionRef, { nome: nomeCliente });
      console.log('Cliente adicionado com sucesso!');
    } else {
      console.log('Cliente já existe na lista.');
    }
  };

  // Adiciona um novo recebimento ao Firestore
  const adicionarRecebimento = async () => {
    if (novoRecebimento.tipo && novoRecebimento.descricao && novoRecebimento.valor) {
      // Adiciona o recebimento
      await addDoc(recebimentosCollectionRef, novoRecebimento);

      // Adiciona o cliente à coleção de clientes
      await adicionarCliente(novoRecebimento.descricao);

      // Limpa o formulário e recarrega os dados
      setNovoRecebimento({ tipo: '', descricao: '', valor: '' });
      carregarRecebimentos();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  // Remove um recebimento do Firestore
  const removerRecebimento = async (id) => {
    const recebimentoDoc = doc(db, 'recebimentos', id);
    await deleteDoc(recebimentoDoc);
    carregarRecebimentos();
  };

  return (
    <Container>
        <Content>
            <Line>
                <Card color="blue">
                    <Title>Para Receber</Title>
                    <Value>R$ {valorTotalRecebimentos.toFixed(2)}</Value> {/* Exibe o valor total dos recebimentos */}
                </Card>
            </Line>

            <div className="container">
                <h1>Lista de Recebimentos Mensais</h1>
                <div className="formulario">
                    <input
                        type="text"
                        name="tipo"
                        placeholder="Tipo de recebimento"
                        value={novoRecebimento.tipo}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Cliente"
                        value={novoRecebimento.descricao}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="valor"
                        placeholder="Valor"
                        value={novoRecebimento.valor}
                        onChange={handleInputChange}
                        required
                    />
                    <button onClick={adicionarRecebimento}>Adicionar Recebimento</button>
                </div>
                <button onClick={() => navigate('/clientes')}>Ver Lista de Clientes</button>
                <table className="tabela-recebimentos">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recebimentos.map(recebimento => (
                            <tr key={recebimento.id}>
                                <td>{recebimento.tipo}</td>
                                <td>{recebimento.descricao}</td>
                                <td>R$ {recebimento.valor}</td>
                                <td>
                                    <button onClick={() => removerRecebimento(recebimento.id)}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Content>
    </Container>
  );
};

export default Recebimentos;