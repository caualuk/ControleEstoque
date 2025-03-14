import React, { useState } from "react";
import TabelaProdutos from "./tabelaProdutos";
import ActionCard from "./ActionCard";
import AddProduto from "../AdicionarProduto/addProd.js";
import ProductFormModal from "../FormsModalProd/ModalForm";
import DeleteProductModal from "../ExcluirProduto/excluirProd.js";
import SearchProductModal from "../PesqPP/pesquisarPP.js";
import styled from "styled-components";
import './produtos.css';

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

const LineActions = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px;
`;

function Produtos() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [step, setStep] = useState(1); 
    const [barcode, setBarcode] = useState('');

    // Abrir modal de adicionar produto
    const openAddModal = () => {
        setIsAddModalOpen(true);
        setStep(1); 
        setBarcode(''); 
    };

    // Abrir modal de excluir produto
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    // Abrir modal de pesquisar produto
    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    // Fechar todos os modais
    const closeModal = () => {
        setIsAddModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsSearchModalOpen(false);
    };

    // Função para capturar o código de barras
    const handleBarcodeScan = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (barcode.trim() !== '') { 
                setStep(2); 
            }
        }
    };

    // Função para salvar os dados do produto
    const handleProductSubmit = (event) => {
        event.preventDefault();
        alert(`Produto salvo! Código de barras: ${barcode}`);
        closeModal();
    };

    return (
        <Container>
            <Content>
                {/* Botões de ação */}
                <LineActions>
                    <ActionCard icon="plus" label="Adicionar produtos" onClick={openAddModal} />
                    <ActionCard icon="trash" label="Excluir Produtos" onClick={openDeleteModal} />
                    <ActionCard icon="magnifying-glass" label="Pesquisar produtos" onClick={openSearchModal} />
                </LineActions>

                {/* Modal de Adicionar Produto */}
                {isAddModalOpen && (
                    step === 1 ? (
                        <AddProduto
                            barcode={barcode}
                            setBarcode={setBarcode}
                            onClose={closeModal}
                            onScan={handleBarcodeScan}
                        />
                    ) : (
                        <ProductFormModal
                            barcode={barcode}
                            onClose={closeModal}
                            onSubmit={handleProductSubmit}
                        />
                    )
                )}

                {/* Modal de Excluir Produto */}
                {isDeleteModalOpen && (
                    <DeleteProductModal isOpen={isDeleteModalOpen} onClose={closeModal} />
                )}

                {/* Modal de Pesquisar Produto */}
                {isSearchModalOpen && (
                    <SearchProductModal isOpen={isSearchModalOpen} onClose={closeModal} />
                )}

                {/* Tabela de Produtos */}
                <TabelaProdutos />
            </Content>
        </Container>
    );
}

export default Produtos;