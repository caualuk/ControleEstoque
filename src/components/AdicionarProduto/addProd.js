import React, { useRef, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.js"; // Importe o Firestore configurado
import ProductFormModal from "../FormsModalProd/ModalForm.js";

const BarcodeScannerModal = ({ barcode, setBarcode, onClose }) => {
    const barcodeInputRef = useRef(null);
    const [showProductForm, setShowProductForm] = useState(false);

    // Foca automaticamente no input invisível quando o modal é aberto
    useEffect(() => {
        if (barcodeInputRef.current) {
            barcodeInputRef.current.focus();
        }
    }, []);

    // Função chamada quando o "Enter" é pressionado
    const handleScan = async (e) => {
        if (e.key === 'Enter') {
            console.log('Código de barras lido:', barcode);
            setShowProductForm(true); // Abre o modal do formulário de produto
        }
    };

    // Função para salvar os dados do formulário no Firestore
    const handleProductFormSubmit = async (productData) => {
        try {
            // Adiciona um novo documento na coleção "products" com todos os dados
            await addDoc(collection(db, "products"), {
                ...productData, // Dados do formulário
                cb: barcode, // Inclui o código de barras
                timestamp: new Date(), // Adiciona um timestamp para registro
            });
            console.log("Produto salvo com sucesso!");
            onClose(); // Fecha o modal após salvar
        } catch (error) {
            console.error("Erro ao salvar produto: ", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Escaneie o Código de Barras</h2>
                <p>Aponte a máquina leitora para escanear o código.</p>
                <input
                    type="text"
                    ref={barcodeInputRef}
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyDown={handleScan} // Chama handleScan quando uma tecla é pressionada
                    style={{ opacity: 0, position: 'absolute', top: '-9999px' }} // Input invisível
                    autoFocus // Foca automaticamente no campo
                />
            </div>

            {showProductForm && (
                <ProductFormModal
                    barcode={barcode}
                    onClose={() => setShowProductForm(false)}
                    onSubmit={handleProductFormSubmit}
                />
            )}
        </div>
    );
};

export default BarcodeScannerModal;