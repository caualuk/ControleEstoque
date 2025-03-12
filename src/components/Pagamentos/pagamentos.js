import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";
import { db } from "../../firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { GastosContext } from "./pagamentosContext.js"
import './stylepay.css'

const Container = styled.div`
    display: flex;
    height: 100vh; /* Ocupa toda a altura da tela */
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


function Pagamentos(){
    const [gastos, setGastos] = useState([]);
    const [novoGasto, setNovoGasto] = useState({ tipo: '', descricao: '', valor: '' });
    const { valorTotalDespesas, setValorTotalDespesas } = useContext(GastosContext); // Use o contexto

    const gastosCollectionRef = collection(db, 'gastos');

    const carregarGastos = async () => {
        const data = await getDocs(gastosCollectionRef);
        const gastosData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setGastos(gastosData);
        calcularValorTotal(gastosData);
    };

    const calcularValorTotal = (gastos) => {
        const total = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0);
        setValorTotalDespesas(total); // Atualiza o valor total no contexto
    };

    useEffect(() => {
        carregarGastos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoGasto({ ...novoGasto, [name]: value });
    };

    const adicionarGasto = async () => {
        if (novoGasto.tipo && novoGasto.descricao && novoGasto.valor) {
        await addDoc(gastosCollectionRef, novoGasto);
        setNovoGasto({ tipo: '', descricao: '', valor: '' });
        carregarGastos();
        } else {
        alert('Preencha todos os campos!');
        }
    };

    const removerGasto = async (id) => {
        const gastoDoc = doc(db, 'gastos', id);
        await deleteDoc(gastoDoc);
        carregarGastos();
    };
    
    return(
        <Container>
            <Content>
            <Line>
                <Card color="red">
                    <Title>Para Pagar</Title>
                    <Value>R$ {valorTotalDespesas.toFixed(4)}</Value>
                </Card>
            </Line>

            <div className="container">
                <h1>Lista de Gastos Mensais</h1>
                <div className="formulario">
                    <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo de gasto (ex: Luz, Água)"
                    value={novoGasto.tipo}
                    onChange={handleInputChange}
                    required
                    />
                    <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={novoGasto.descricao}
                    onChange={handleInputChange}
                    required
                    />
                    <input
                    type="number"
                    name="valor"
                    placeholder="Valor"
                    value={novoGasto.valor}
                    onChange={handleInputChange}
                    required
                    />
                    <button className="button-add" onClick={adicionarGasto}>Adicionar Gasto</button>
                </div>
                <table className="tabela-gastos">
                    <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gastos.map(gasto => (
                        <tr key={gasto.id}>
                        <td>{gasto.tipo}</td>
                        <td>{gasto.descricao}</td>
                        <td>R$ {gasto.valor}</td>
                        <td>
                            <button onClick={() => removerGasto(gasto.id)}>Remover</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </Content>
        </Container>
    );
}

export default Pagamentos;