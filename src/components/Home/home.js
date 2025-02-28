import React, { useContext } from "react";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header.js";
import styled from "styled-components";
import { useUser } from "../LoginPage/UserContext.js";
import './home.css'

const Container = styled.div`
    display: flex;
    height: 100vh; /* Ocupa toda a altura da tela */
`;

const Content = styled.div`
    flex: 1; /* Ocupa o espaço restante */
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    margin: 50px;
    font-size: 30px;
`

function Home() {
    const { user } = useUser();

    return (
        <Container>
            <NavbarLeft /> {/* Navbar à esquerda */}
            <Content>
                <Header /> {/* Header no topo */}
                <MainContent>
                    <div>
                        Olá, {user}!
                    </div>
                </MainContent>
            </Content>
        </Container>
    );
}

export default Home;