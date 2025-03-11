import React, { useState } from "react";
import BarcodeScannerPesq from "../PesquisarProd/pesProd"; // Importa o componente de leitura de código de barras
import styled from "styled-components";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";

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

const ContentContainer = styled.div`
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

// Estilos para o título
const Title = styled.h1`
    font-size: 28px;
    color: #333;
    margin: 0; /* Remove a margem padrão */
`;

// Estilos para o botão
const StartSaleButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-left: 20px; /* Espaçamento entre o título e o botão */

    &:hover {
        background-color: #218838;
    }
`;

const HeaderCaixa = styled.div`
    display: flex;
    gap: 77%;
    align-items: center; /* Centraliza verticalmente */
    margin-bottom: 20px; /* Espaçamento abaixo do header */
`;

// Estilos para a tabela
const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd; /* Adiciona borda à tabela */
`;

const TableHeader = styled.th`
    background-color: #007bff;
    color: white;
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd; /* Adiciona borda ao cabeçalho */
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f8f9fa;
    }

    &:hover {
        background-color: #e9ecef;
    }
`;

const TableCell = styled.td`
    padding: 12px;
    border: 1px solid #ddd; /* Adiciona borda às células */
`;

// Estilos para o total da venda
const TotalSale = styled.h3`
    font-size: 20px;
    color: #333;
    margin-top: 20px;
    text-align: left;
    padding-right: 20px;
`;

const Caixa = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
    const [barcode, setBarcode] = useState(""); // Estado para armazenar o código de barras digitado
    const [saleProducts, setSaleProducts] = useState([]); // Estado para armazenar os produtos da venda

    // Função para abrir o modal
    const handleStartSale = () => {
        setIsModalOpen(true); // Abre o modal
        setBarcode(""); // Limpa o código de barras anterior
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // Fecha o modal
    };

    // Função para adicionar um produto à lista de venda
    const addProductToSale = (product) => {
        setSaleProducts([...saleProducts, product]); // Adiciona o produto à lista
    };

    // Calcula o total da venda
    const totalSale = saleProducts.reduce((total, product) => total + (Number(product.salePrice) || 0), 0);

    return (
        <Container>
            <NavbarLeft />
            <Content>
                <Header />
                <ContentContainer>
                    <HeaderCaixa>
                        <Title>Caixa</Title>
                        <StartSaleButton onClick={handleStartSale}>Iniciar Venda</StartSaleButton>
                    </HeaderCaixa>

                    {/* Renderiza o modal de leitura de código de barras se isModalOpen for true */}
                    {isModalOpen && (
                        <BarcodeScannerPesq
                            barcode={barcode}
                            setBarcode={setBarcode}
                            onClose={handleCloseModal}
                            addProductToSale={addProductToSale}
                        />
                    )}

                    {/* Lista de produtos escaneados */}
                    <h2>Produtos na Venda</h2>
                    <ProductTable>
                        <thead>
                            <tr>
                                <TableHeader>Nome</TableHeader>
                                <TableHeader>Preço (R$)</TableHeader>
                                <TableHeader>Código de Barras</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {saleProducts.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>
                                        {product.salePrice ? Number(product.salePrice).toFixed(2) : "Preço não disponível"}
                                    </TableCell>
                                    <TableCell>{product.cb}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </ProductTable>

                    {/* Exibe o total da venda */}
                    <TotalSale>Total da Venda: R$ {totalSale.toFixed(2)}</TotalSale>
                </ContentContainer>
            </Content>
        </Container>
    );
};

export default Caixa;