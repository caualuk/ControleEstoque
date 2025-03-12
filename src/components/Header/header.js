import React from "react"
import styled from "styled-components"

const HeaderContainer = styled.div`
    background-color: #E0E0E0;
    border-bottom: 2px solid grey;
    height: 70px;
`

const Title = styled.div`
    width: fit-content;
    margin: 20px;
    font-size: 27px;
    margin-left: 50%;
`

function Header(){
    return(
        <HeaderContainer>
            <Title>Controle de Estoque</Title>
        </HeaderContainer>
    )
}

export default Header;