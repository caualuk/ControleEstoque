import React, { useState } from "react";
import NavbarLeft from "../NavbarLeft/navbarleft";
import Header from "../Header/header";
import TabelaProdutos from "./tabelaProdutos";
import ActionCard from "./ActionCard";
import BarcodeScannerModal from "../ScannerCB/ScannerCB";
import ProductFormModal from "../FormsModalProd/ModalForm";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1); // 1 = Escanear código de barras, 2 = Preencher dados
    const [barcode, setBarcode] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
        setStep(1); // Sempre começa no passo 1 (escanear código de barras)
        setBarcode(''); // Limpa o código de barras ao abrir o modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Função para capturar o código de barras
    const handleBarcodeScan = (event) => {
        if (event.key === 'Enter') { // Quando a máquina envia o "Enter"
            event.preventDefault();
            if (barcode.trim() !== '') { // Verifica se o código de barras não está vazio
                setStep(2); // Avança para o próximo passo
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
            <NavbarLeft />
            <Content>
                <Header />
                <LineActions>
                    <ActionCard icon="plus" label="Adicionar produtos" onClick={openModal} />
                    <ActionCard icon="eye" label="Ver produtos" />
                    <ActionCard icon="trash" label="Excluir Produtos" />
                    <ActionCard icon="magnifying-glass" label="Pesquisar produtos" />
                </LineActions>

                {isModalOpen && (
                    step === 1 ? (
                        <BarcodeScannerModal
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

                <TabelaProdutos />
            </Content>
        </Container>
    );
}

export default Produtos;