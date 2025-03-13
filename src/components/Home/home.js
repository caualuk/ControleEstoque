import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate para redirecionamento
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header.js";
import Dashboard from "../DashBoard/dashboard.js";
import Graphic from "../DashBoard/graphics.js";
import styled from "styled-components";
import { useUser } from "../LoginPage/UserContext.js";
import './home.css';
import Infos from "../Infos/Infos.js";

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
`;

const MainDashboard = styled.div`
    display: flex;
    justify-content: space-around;
`;

const DashboardContent = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
`;

const GraphicDashboard = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EntregasContainer = styled.div`
    display: flex;
    justify-content: center;
`

const VerEntregasButton = styled.button`
    background-color: #4CAF50; 
    color: white; 
    padding: 10px 20px; 
    font-size: 16px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 

    &:hover {
        background-color: #45a049; /* Mudar cor ao passar o mouse */
    }
`;

function Home() {
    const { user } = useUser();
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleVerEntregas = () => {
        navigate("/entregas"); // Redireciona para a rota /entregas
    };

    return (
        <Container>
            <Content>
                <MainContent>
                    <Infos />
                    <EntregasContainer>
                        <VerEntregasButton onClick={handleVerEntregas}>
                            Ver Entregas Pendentes
                        </VerEntregasButton>
                    </EntregasContainer>
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