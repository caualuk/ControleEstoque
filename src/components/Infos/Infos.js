import React from "react";
import styled from "styled-components";

export const Line = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    margin: 50px 0;
`;

export const Card = styled.div`
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

export const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

export const Value = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

function Infos(){
    return(
        <Line>
            <Card color="green">
                <Title>Vendas de Hoje</Title>
                <Value>R$ 7.896,89</Value>
            </Card>
            <Card color="red">
                <Title>Para Pagar</Title>
                <Value>R$ 3.590,90</Value>
            </Card>
            <Card color="blue">
                <Title>Para Receber</Title>
                <Value>R$ 16.789,35</Value>
            </Card>
            <Card color="teal">
                <Title>Faturamento do Mês</Title>
                <Value>R$ 97.234,90</Value>
            </Card>
        </Line>
    )
}

export default Infos;