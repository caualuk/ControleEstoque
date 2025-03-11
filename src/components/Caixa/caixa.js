import React, { useState } from "react";
import BarcodeScannerPesq from "../PesquisarProd/pesProd"; 
import styled from "styled-components";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";
import { db } from "../../firebase"; 
import { query, collection, where, getDocs, updateDoc } from "firebase/firestore"; 

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

const Title = styled.h1`
    font-size: 28px;
    color: #333;
    margin: 0; /* Remove a margem padrão */
`;

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

const QuantityInput = styled.input`
    width: 60px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const TotalSale = styled.h3`
    font-size: 20px;
    color: #333;
    margin-top: 20px;
    text-align: left;
    padding-right: 20px;
`;

const FinalizeSaleButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const Caixa = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [barcode, setBarcode] = useState("");
    const [saleProducts, setSaleProducts] = useState([]);

    // Função para abrir o modal
    const handleStartSale = () => {
        setIsModalOpen(true);
        setBarcode("");
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Função para adicionar um produto à lista de venda
    const addProductToSale = (product) => {
        setSaleProducts([...saleProducts, { ...product, quantity: 1 }]); 
    };

    // Função para atualizar a quantidade de um produto na lista de venda
    const handleQuantityChange = (index, newQuantity) => {
        const updatedProducts = [...saleProducts];
        updatedProducts[index].quantity = newQuantity;
        setSaleProducts(updatedProducts);
    };

    // Função para finalizar a venda e atualizar o estoque no Firestore
    const handleFinalizeSale = async () => {
        try {
            console.log("Iniciando finalização da venda...");
    
            // Verifica se há produtos na lista de venda
            if (saleProducts.length === 0) {
                alert("Nenhum produto na lista de venda!");
                return;
            }
    
            for (const product of saleProducts) {
                console.log("Verificando produto:", product);
    
                // Verifica se o produto tem um código de barras válido
                if (!product.cb) {
                    console.error("Produto sem código de barras válido:", product);
                    alert(`Produto "${product.productName}" não tem um código de barras válido!`);
                    return;
                }
    
                // Verifica se a quantidade solicitada é maior que o estoque
                if (product.quantity > product.stock) {
                    alert(`Produto "${product.productName}" insuficiente no estoque!`);
                    return;
                }
            }
    
            console.log("Todos os produtos têm estoque suficiente. Atualizando estoque no Firestore...");
    
            // Atualiza o estoque no Firestore para cada produto
            for (const product of saleProducts) {
                console.log("Atualizando produto:", product);
    
                // Busca o produto no Firestore pelo código de barras (cb)
                const q = query(collection(db, "products"), where("cb", "==", product.cb));
                const querySnapshot = await getDocs(q);
    
                if (!querySnapshot.empty) {
                    // Pega o primeiro documento encontrado (assumindo que o código de barras é único)
                    const productDoc = querySnapshot.docs[0];
                    const productData = productDoc.data();
                    console.log("Documento do produto encontrado:", productData);
    
                    const currentStock = productData.stock; // Obtém o estoque atual
                    console.log("Estoque atual:", currentStock);
    
                    const newStock = currentStock - product.quantity; // Calcula o novo estoque
                    console.log("Novo estoque:", newStock);
    
                    // Atualiza o estoque no Firestore
                    await updateDoc(productDoc.ref, {
                        stock: newStock,
                    });
                    console.log("Estoque atualizado com sucesso!");
                } else {
                    console.error(`Produto com código de barras ${product.cb} não encontrado no Firestore.`);
                    alert(`Produto "${product.productName}" não encontrado no banco de dados!`);
                    return;
                }
            }
    
            alert("Venda finalizada e estoque atualizado com sucesso!");
            setSaleProducts([]); // Limpa a lista de produtos da venda
        } catch (error) {
            console.error("Erro ao finalizar a venda:", error);
            alert("Erro ao finalizar a venda.");
        }
    };

    // Calcula o total da venda
    const totalSale = saleProducts.reduce(
        (total, product) => total + (Number(product.salePrice) || 0) * (product.quantity || 1),
        0
    );

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
                                <TableHeader>Quantidade</TableHeader>
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
                                    <TableCell>
                                        <QuantityInput
                                            type="number"
                                            min="1"
                                            max={product.stock} // Define o valor máximo como o estoque disponível
                                            value={product.quantity || 1}
                                            onChange={(e) =>
                                                handleQuantityChange(index, parseInt(e.target.value))
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{product.cb}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </ProductTable>

                    {/* Exibe o total da venda */}
                    <TotalSale>Total da Venda: R$ {totalSale.toFixed(2)}</TotalSale>

                    {/* Botão para finalizar a venda */}
                    <FinalizeSaleButton onClick={handleFinalizeSale}>
                        Finalizar Venda
                    </FinalizeSaleButton>
                </ContentContainer>
            </Content>
        </Container>
    );
};

export default Caixa;