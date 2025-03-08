import React from "react";

const ProductFormModal = ({ barcode, onClose, onSubmit }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Adicionar Produto</h2>
                <form onSubmit={onSubmit}>
                    <label htmlFor="productName">Nome do Produto:</label>
                    <input type="text" id="productName" name="productName" required />

                    <label htmlFor="category">Categoria:</label>
                    <input type="text" id="category" name="category" required />

                    <label htmlFor="quantity">Quantidade:</label>
                    <input type="number" id="quantity" name="quantity" required />

                    <label htmlFor="unit">Unidade:</label>
                    <select id="unit" name="unit">
                        <option value="unid">Unidade</option>
                        <option value="kg">Quilograma</option>
                        <option value="litro">Litro</option>
                    </select>

                    <label htmlFor="supplier">Fornecedor:</label>
                    <input type="text" id="supplier" name="supplier" required />

                    <label htmlFor="purchasePrice">Preço de Compra:</label>
                    <input type="number" id="purchasePrice" name="purchasePrice" step="0.01" required />

                    <label htmlFor="salePrice">Preço de Venda:</label>
                    <input type="number" id="salePrice" name="salePrice" step="0.01" required />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;