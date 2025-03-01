import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";
import styled from "styled-components";

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

function Produtos(){
    return(
        <Container>
            <NavbarLeft />
            <Content>
                <Header />
            </Content>
        </Container>
    );
}

export default Produtos;