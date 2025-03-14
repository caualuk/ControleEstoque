import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import './exc.css'

const DeleteProductModal = ({ isOpen, onClose }) => {
    const [cb, setCB] = useState(''); // Código de barras
    const [quantity, setQuantity] = useState(0); // Quantidade a excluir
    const [currentStock, setCurrentStock] = useState(0); // Estoque atual
    const [product, setProduct] = useState(null); // Dados do produto

    const handleSearch = async () => {
        if (!cb.trim()) {
            alert('Por favor, insira um código de barras válido.');
            return;
        }

        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('cb', '==', cb)); // Busca por cb
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                setProduct(doc.data()); // Define os dados do produto
                setCurrentStock(doc.data().stock); // Define o estoque atual
            });
        } else {
            alert('Produto não encontrado! Verifique o código de barras.');
        }
    };

    const handleDelete = async () => {
        if (quantity > currentStock) {
            alert('Quantidade a ser excluída maior que o estoque atual!');
            return;
        }

        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('cb', '==', cb)); // Busca por cb
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    stock: currentStock - quantity // Atualiza o estoque
                });
                alert('Produto atualizado com sucesso!');
                onClose(); // Fecha o modal
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Botão de fechar o modal */}
                <button className="close" onClick={onClose}>Fechar</button>

                {/* Título do modal */}
                <h2>Excluir Produto</h2>

                {/* Campo de pesquisa */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Código de Barras (cb)"
                        value={cb}
                        onChange={(e) => setCB(e.target.value)}
                    />
                    <button onClick={handleSearch}>Pesquisar</button>
                </div>

                {/* Tabela com os dados do produto */}
                {product && (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Estoque Atual</th>
                                <th>Quantidade a Excluir</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.productName}</td>
                                <td>{currentStock}</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Quantidade"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        min="0"
                                        max={currentStock}
                                    />
                                </td>
                                <td>
                                    <button onClick={handleDelete}>Excluir</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DeleteProductModal;