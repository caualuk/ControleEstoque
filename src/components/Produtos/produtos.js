import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";
import TabelaProdutos from "./tabelaProdutos";
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

const LineActions = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px;
`

const ActionCard = styled.div`
        padding: 20px;
        background-color:rgb(218, 218, 218);
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.1);
            background-color:rgb(187, 187, 187);
        }
`;

function Produtos(){
    return(
        <Container>
            <NavbarLeft />
            <Content>
                <Header />
                <LineActions>
                    <ActionCard>Adicionar produtos</ActionCard>
                    <ActionCard>Ver produtos</ActionCard>
                    <ActionCard>Excluir Produtos</ActionCard>
                    <ActionCard>Pesquisar produtos</ActionCard>
                </LineActions>

                <TabelaProdutos />
            </Content>
        </Container>
    );
}

export default Produtos;