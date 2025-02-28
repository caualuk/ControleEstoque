import React from "react"
import styled from "styled-components"

const HeaderContainer = styled.div`
    background-color: blue;
    height: 70px;
`

const Title = styled.div`
    background-color: red;
    width: fit-content;
    margin: 20px;
`

function Header(){
    return(
        <HeaderContainer>
            <Title>EC BEBIDAS E EMBALAGENS</Title>
        </HeaderContainer>
    )
}

export default Header;