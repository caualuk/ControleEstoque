import { useState } from "react"
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

function TabelaProdutos(){
    const [products, setProducts] = useState([
        { id: 1, notaFiscal: "123456", nome: "Produto A", precoComprado: 50, precoVendido: 80 },
        { id: 2, notaFiscal: "789012", nome: "Produto B", precoComprado: 30, precoVendido: 55 },
      ]);

    return(
        <Container>
      <Title>Controle de Estoque</Title>
      <Table>
        <Thead>
          <tr>
            <Th>Nota Fiscal</Th>
            <Th>Nome</Th>
            <Th>Preço Comprado</Th>
            <Th>Preço Vendido</Th>
            <Th>Lucro</Th>
          </tr>
        </Thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <Td>{product.notaFiscal}</Td>
              <Td>{product.nome}</Td>
              <Td>R$ {product.precoComprado.toFixed(2)}</Td>
              <Td>R$ {product.precoVendido.toFixed(2)}</Td>
              <ProfitTd>R$ {(product.precoVendido - product.precoComprado).toFixed(2)}</ProfitTd>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    )
}

export default TabelaProdutos;