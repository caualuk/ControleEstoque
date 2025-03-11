import React, { useState } from "react";

const ProductFormModal = ({ barcode, onClose, onSubmit }) => {
    const [productData, setProductData] = useState({
        productName: '',
        stock: '',
        category: '',
        quantity: 0,
        unit: 'unid',
        supplier: '',
        purchasePrice: 0,
        salePrice: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(productData); // Passa os dados do formulário para a função de submissão
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Adicionar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="productName">Nome do Produto:</label>
                    <input type="text" id="productName" name="productName" value={productData.productName} onChange={handleChange} required />

                    <label htmlFor="stock">Estoque:</label>
                    <input type="text" id="stock" name="stock" value={productData.stock} onChange={handleChange} required />

                    <label htmlFor="category">Categoria:</label>
                    <input type="text" id="category" name="category" value={productData.category} onChange={handleChange} required />

                    <label htmlFor="quantity">Quantidade:</label>
                    <input type="number" id="quantity" name="quantity" value={productData.quantity} onChange={handleChange} required />

                    <label htmlFor="unit">Unidade:</label>
                    <select id="unit" name="unit" value={productData.unit} onChange={handleChange}>
                        <option value="unid">Unidade</option>
                        <option value="kg">Quilograma</option>
                        <option value="litro">Litro</option>
                    </select>

                    <label htmlFor="supplier">Fornecedor:</label>
                    <input type="text" id="supplier" name="supplier" value={productData.supplier} onChange={handleChange} required />

                    <label htmlFor="purchasePrice">Preço de Compra:</label>
                    <input type="number" id="purchasePrice" name="purchasePrice" value={productData.purchasePrice} onChange={handleChange} step="0.01" required />

                    <label htmlFor="salePrice">Preço de Venda:</label>
                    <input type="number" id="salePrice" name="salePrice" value={productData.salePrice} onChange={handleChange} step="0.01" required />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;