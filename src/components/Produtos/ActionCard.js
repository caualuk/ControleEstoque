import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ActionCardContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background-color: rgb(218, 218, 218);
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
        background-color: rgb(187, 187, 187);
    }
`;

const ActionCard = ({ icon, label, onClick }) => {
    return (
        <ActionCardContainer onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            {label}
        </ActionCardContainer>
    );
};

export default ActionCard;