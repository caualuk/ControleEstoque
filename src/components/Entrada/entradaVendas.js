import React from "react"
import styled from "styled-components";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";

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


function Entrada(){
    return(
        <Container>
            <NavbarLeft />
            <Content>
            <Header />
            <div>pagina de entrada e captura de vendas</div>
            </Content>
        </Container>
    );
}

export default Entrada;