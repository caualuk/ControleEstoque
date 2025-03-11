import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const Thead = styled.thead`
  background-color: #f4f4f4;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const ProfitTd = styled(Td)`
  font-weight: bold;
  color: green;
`;

function TabelaProdutos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Escuta mudanças na coleção "products" em tempo real
    const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        notaFiscal: doc.data().cb || "N/A",
        nome: doc.data().productName || "N/A",
        estoque: doc.data().stock || "N/A",
        categoria: doc.data().category || "N/A",
        quantidade: doc.data().quantity || 0,
        unidade: doc.data().unit || "N/A",
        fornecedor: doc.data().supplier || "N/A",
        precoComprado: parseFloat(doc.data().purchasePrice) || 0,
        precoVendido: parseFloat(doc.data().salePrice) || 0,
      }));
      setProducts(productsData);
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Title>Controle de Estoque rapaz</Title>
      <Table>
        <Thead>
          <tr>
            <Th>Nota Fiscal</Th>
            <Th>Nome</Th>
            <Th>Estoque</Th>
            <Th>Categoria</Th>
            <Th>Quantidade</Th>
            <Th>Unidade</Th>
            <Th>Fornecedor</Th>
            <Th>Preço Comprado</Th>
            <Th>Preço Vendido</Th>
            <Th>Lucro</Th>
          </tr>
        </Thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <Td>{product.notaFiscal}</Td>
              <Td>{product.nome}</Td>
              <Td>{product.estoque}</Td>
              <Td>{product.categoria}</Td>
              <Td>{product.quantidade}</Td>
              <Td>{product.unidade}</Td>
              <Td>{product.fornecedor}</Td>
              <Td>R$ {product.precoComprado.toFixed(2)}</Td>
              <Td>R$ {product.precoVendido.toFixed(2)}</Td>
              <ProfitTd>
                R$ {(product.precoVendido - product.precoComprado).toFixed(2)}
              </ProfitTd>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TabelaProdutos;