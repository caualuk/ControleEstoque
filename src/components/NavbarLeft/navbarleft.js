import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faBoxesStacked, faMoneyBill, faMoneyBillTrendUp, faUserGroup, faBuilding, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = styled.div`
    background-color: #E0E0E0;
    width: 170px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    border-right: 2px solid grey;
    position: fixed; /* Fixa a navbar na tela */
    top: 0; /* Alinha no topo da tela */
    left: 0; /* Alinha à esquerda da tela */
    z-index: 1000; /* Garante que a navbar fique acima de outros elementos */

    .nav-options {
        width: 130px;
        padding: 7px;
        display: flex;
        align-items: center;
        color: black;
        margin: 10px 0;
        gap: 10px;
        cursor: pointer;
        transition: all .4s ease;
        border-radius: 8px;
    }

    .nav-options:hover {
        background-color: black;
        color: white;
    }
`;

function NavbarLeft() {
    return (
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
    );
}

export default NavbarLeft;