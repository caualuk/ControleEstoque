import React, { useRef, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"; // Importe o Firestore configurado

const BarcodeScannerModal = ({ barcode, setBarcode, onClose }) => {
    const barcodeInputRef = useRef(null);

    // Foca automaticamente no input invisível quando o modal é aberto
    useEffect(() => {
        if (barcodeInputRef.current) {
            barcodeInputRef.current.focus();
        }
    }, []);

    // Função para salvar o código de barras no Firestore
    const saveBarcodeToFirestore = async (barcode) => {
        try {
            // Adiciona um novo documento na coleção "products"
            const docRef = await addDoc(collection(db, "products"), {
                cb: barcode, // Armazena o código de barras no campo "cb"
                timestamp: new Date(), // Adiciona um timestamp para registro
            });
            console.log("Código de barras salvo com ID: ", docRef.id);
        } catch (error) {
            console.error("Erro ao salvar código de barras: ", error);
        }
    };

    // Função chamada quando o "Enter" é pressionado
    const handleScan = async (e) => {
        if (e.key === 'Enter') {
            console.log('Código de barras lido:', barcode);
            await saveBarcodeToFirestore(barcode); // Salva no Firestore
            onClose(); // Fecha o modal após salvar
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
        </div>
    );
};

export default BarcodeScannerModal;