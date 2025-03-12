import React, { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import styled from "styled-components";

// Estilos com styled-components
const Main = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SupplierList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  max-width: 600px;
`;

const SupplierItem = styled.li`
  background-color: #fff;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  font-size: 1.1rem;
  color: #555;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const NoSuppliersMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFornecedores = () => {
      try {
        const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
          const fornecedoresList = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.supplier) {
              const suppliers = Array.isArray(data.supplier)
                ? data.supplier
                : [data.supplier];
              fornecedoresList.push(...suppliers);
            }
          });

          const uniqueFornecedores = [...new Set(fornecedoresList)];
          setFornecedores(uniqueFornecedores);
          setLoading(false); // Dados carregados
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        setLoading(false); // Parar o carregamento em caso de erro
      }
    };

    fetchFornecedores();
  }, []);

  return (
    <Main>
      <Title>Lista de Fornecedores</Title>
      {loading ? (
        <LoadingMessage>Carregando...</LoadingMessage>
      ) : fornecedores.length > 0 ? (
        <SupplierList>
          {fornecedores.map((fornecedor, index) => (
            <SupplierItem key={index}>{fornecedor}</SupplierItem>
          ))}
        </SupplierList>
      ) : (
        <NoSuppliersMessage>Nenhum fornecedor encontrado.</NoSuppliersMessage>
      )}
    </Main>
  );
}

export default Fornecedores;