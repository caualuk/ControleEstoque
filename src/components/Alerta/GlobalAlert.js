import React, { useContext } from "react";
import styled from "styled-components";
import { AlertContext } from "./AlertContext"; // Importe o AlertContext

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const AlertMessage = styled.div`
  background-color: #ff4444;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const GlobalAlert = () => {
  const { alerts, removeAlert } = useContext(AlertContext); // Use o contexto de alertas

  return (
    <AlertContainer>
      {alerts.map((alert, index) => (
        <AlertMessage key={index}>
          {alert}
          <CloseButton onClick={() => removeAlert(index)}>&times;</CloseButton>
        </AlertMessage>
      ))}
    </AlertContainer>
  );
};

export default GlobalAlert;