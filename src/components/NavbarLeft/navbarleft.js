import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faBoxesStacked, faMoneyBill, faMoneyBillTrendUp, faUserGroup, faBuilding, faCartShopping } from "@fortawesome/free-solid-svg-icons"

const NavigationBar = styled.div`
    background-color: gray;
    width: 150px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

    .nav-options {
        width: 130px;
        padding: 7px;
        display: flex;
        align-items: center;
        color: white;
        margin: 10px 0;
        gap: 10px;
        cursor: pointer;
        transition: all .4s ease;
        border-radius: 8px;
    }

    .nav-options:hover{
        background-color: black;
    }
`

function NavbarLeft() {
    return (
        <>
            <NavigationBar>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faChartSimple} />
                    Dashboard
                </div>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faBoxesStacked} />
                    Produtos
                </div>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faCartShopping} />
                    Caixa
                </div>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                    Entrada
                </div>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faMoneyBill} />
                    Saída
                </div>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faUserGroup} />
                    Clientes
                </div>
                <div className="nav-options">
                    <FontAwesomeIcon icon={faBuilding} />
                    Fornecedores
                </div>
            </NavigationBar>
        </>
    );
}

export default NavbarLeft;