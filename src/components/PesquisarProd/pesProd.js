import React, { useRef, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js"; // Importe o Firestore configurado

const BarcodeScannerPesq = ({ barcode, setBarcode, onClose, addProductToSale }) => {
    const barcodeInputRef = useRef(null);
    const [loading, setLoading] = useState(false); // Estado para indicar carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros

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
            setLoading(true); // Inicia o carregamento
            setError(null); // Limpa erros anteriores
            try {
                // Consulta o Firestore para encontrar um produto com o código de barras escaneado
                const productsRef = collection(db, "products");
                const q = query(productsRef, where("cb", "==", barcode)); // Filtra por código de barras
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Se o produto for encontrado, armazena os dados
                    const productData = querySnapshot.docs[0].data();
                    console.log("Produto encontrado:", productData);

                    // Adiciona o produto à lista de venda
                    addProductToSale({
                        ...productData,
                        price: productData.salePrice, // Garante que `price` seja `salePrice`
                    });
                    setBarcode(""); // Limpa o código de barras após adicionar o produto
                } else {
                    // Se nenhum produto for encontrado, exibe uma mensagem
                    setError("Produto não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar produto: ", error);
                setError("Erro ao buscar produto. Tente novamente.");
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
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

                {/* Exibe o resultado da busca */}
                {loading && <p>Carregando...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default BarcodeScannerPesq;