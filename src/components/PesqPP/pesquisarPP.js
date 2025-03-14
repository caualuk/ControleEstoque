import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const SearchProductModal = ({ isOpen, onClose }) => {
    const [cb, setCB] = useState(''); // Alterado para cb
    const [product, setProduct] = useState(null);

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
                setProduct(doc.data());
            });
        } else {
            alert('Produto não encontrado! Verifique o código de barras.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-content">
            <h2>Pesquisar Produto</h2>
            
            {/* Campo de pesquisa */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Código de Barras ou Nome do Produto"
                    value={cb}
                    onChange={(e) => setCB(e.target.value)}
                />
                <button onClick={handleSearch}>Pesquisar</button>
            </div>

            {/* Tabela de resultados */}
            {product && (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Estoque</th>
                            <th>Categoria</th>
                            <th>Quantidade</th>
                            <th>Unidade</th>
                            <th>Fornecedor</th>
                            <th>Preço Comprado</th>
                            <th>Preço Vendido</th>
                            <th>Lucro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.stock}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>{product.supplier}</td>
                            <td>R$ {Number(product.purchasePrice).toFixed(2)}</td>
                            <td>R$ {Number(product.salePrice).toFixed(2)}</td>
                            <td>R$ {(Number(product.salePrice) - Number(product.purchasePrice)).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchProductModal;