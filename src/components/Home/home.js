import React, { useContext } from "react";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header.js";
import Dashboard from "../DashBoard/dashboard.js";
import Graphic from "../DashBoard/graphics.js";
import styled from "styled-components";
import { useUser } from "../LoginPage/UserContext.js";
import './home.css';

const Container = styled.div`
    display: flex;
    height: 100vh; /* Ocupa toda a altura da tela */
`;

const Content = styled.div`
    margin-left: 170px; /* Largura da navbar */
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    padding: 20px;
    font-size: 30px;

    .welcome {
        margin-left: 30px;
    }
`;

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

const MainDashboard = styled.div`
    display: flex;
    gap: 20px;
`

const DashboardContent = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
`

const GraphicDashboard = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Home() {
    const { user } = useUser();

    return (
        <Container>
            <NavbarLeft /> {/* Navbar à esquerda */}
            <Content>
                <Header /> {/* Header no topo */}
                <MainContent>
                    <div className="welcome">
                        Olá, {user}!
                    </div>

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
                </MainContent>
                <MainDashboard>
                <GraphicDashboard>
                    <Graphic />
                </GraphicDashboard>
                <DashboardContent>
                    <Dashboard />
                </DashboardContent>
                </MainDashboard>
            </Content>
        </Container>
    );
}

export default Home;