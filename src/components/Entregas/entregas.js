import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { query, collection, where, getDocs, updateDoc, doc, setDoc, onSnapshot } from "firebase/firestore";

// Estilos
const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const Content = styled.div`
    margin-left: 170px;
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
    margin: 0;
`;

const DeliveryButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;

    &:hover {
        background-color: #218838;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
`;

const SearchButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    width: 100%;

    &:hover {
        background-color: #0056b3;
    }
`;

const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
`;

const TableHeader = styled.th`
    background-color: #007bff;
    color: white;
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
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
    border: 1px solid #ddd;
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

const FinalizeDeliveryButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    width: 100%;

    &:hover {
        background-color: #218838;
    }
`;

const DeliveryList = styled.div`
    margin-top: 20px;
`;

const DeliveryItem = styled.div`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const DeliveryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DeliveryInfo = styled.div`
    flex: 1;
`;

const DeliveryValue = styled.div`
    font-weight: bold;
    color: #333;
`;

const ProductList = styled.div`
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const ProductItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 14px;
`;

const Entregas = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [deliveryProducts, setDeliveryProducts] = useState([]);
    const [clientName, setClientName] = useState("");
    const [clientStreet, setClientStreet] = useState("");
    const [deliveries, setDeliveries] = useState([]);
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null); // Estado para controlar o pedido expandido

    // Abrir modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Fechar modal
    const closeModal = () => {
        setIsModalOpen(false);
        setProductName("");
        setDeliveryProducts([]);
        setClientName("");
        setClientStreet("");
    };

    // Buscar produto pelo nome
    const handleSearchProduct = async () => {
        try {
            const q = query(collection(db, "products"), where("productName", "==", productName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const productDoc = querySnapshot.docs[0];
                const productData = productDoc.data();
                setDeliveryProducts([...deliveryProducts, { ...productData, quantity: 1 }]);
            } else {
                alert("Produto não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            alert("Erro ao buscar produto.");
        }
    };

    // Atualizar quantidade do produto
    const handleQuantityChange = (index, newQuantity) => {
        const updatedProducts = [...deliveryProducts];
        updatedProducts[index].quantity = newQuantity;
        setDeliveryProducts(updatedProducts);
    };

    // Finalizar entrega
    const handleFinalizeDelivery = async () => {
        try {
            if (deliveryProducts.length === 0) {
                alert("Nenhum produto na lista de entrega!");
                return;
            }

            if (!clientName || !clientStreet) {
                alert("Por favor, insira o nome e a rua do cliente.");
                return;
            }

            // Atualizar estoque no Firestore
            for (const product of deliveryProducts) {
                const q = query(collection(db, "products"), where("productName", "==", product.productName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const productDoc = querySnapshot.docs[0];
                    const productData = productDoc.data();
                    const newStock = productData.stock - product.quantity;

                    await updateDoc(productDoc.ref, {
                        stock: newStock,
                    });
                }
            }

            // Registrar entrega no Firestore
            const deliveryData = {
                clientName,
                clientStreet,
                products: deliveryProducts,
                total: totalDelivery,
                date: new Date().toISOString(),
            };

            await setDoc(doc(db, "deliveries", new Date().toISOString()), deliveryData);

            alert("Entrega finalizada com sucesso!");
            closeModal();
        } catch (error) {
            console.error("Erro ao finalizar entrega:", error);
            alert("Erro ao finalizar entrega.");
        }
    };

    // Calcular total da entrega
    const totalDelivery = deliveryProducts.reduce(
        (total, product) => total + (Number(product.salePrice) || 0) * (product.quantity || 1),
        0
    );

    // Recuperar entregas do Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "deliveries"), (snapshot) => {
            const deliveriesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDeliveries(deliveriesList);
        });

        return () => unsubscribe();
    }, []);

    // Alternar a exibição dos detalhes do pedido
    const toggleDeliveryDetails = (deliveryId) => {
        if (expandedDeliveryId === deliveryId) {
            setExpandedDeliveryId(null); // Fechar se já estiver aberto
        } else {
            setExpandedDeliveryId(deliveryId); // Abrir o pedido clicado
        }
    };

    return (
        <Container>
            <Content>
                <ContentContainer>
                    <Title>Entregas</Title>
                    <DeliveryButton onClick={openModal}>Nova Entrega</DeliveryButton>

                    {/* Lista de entregas */}
                    <DeliveryList>
                        {deliveries.map((delivery) => (
                            <DeliveryItem
                                key={delivery.id}
                                onClick={() => toggleDeliveryDetails(delivery.id)} // Alternar detalhes ao clicar
                            >
                                <DeliveryHeader>
                                    <DeliveryInfo>
                                        <div><strong>Cliente:</strong> {delivery.clientName}</div>
                                        <div><strong>Rua:</strong> {delivery.clientStreet}</div>
                                    </DeliveryInfo>
                                    <DeliveryValue>R$ {delivery.total.toFixed(2)}</DeliveryValue>
                                </DeliveryHeader>

                                {/* Exibir detalhes do pedido se estiver expandido */}
                                {expandedDeliveryId === delivery.id && (
                                    <ProductList>
                                        {delivery.products.map((product, index) => (
                                            <ProductItem key={index}>
                                                <div>{product.productName}</div>
                                                <div>
                                                    {product.quantity}x R$ {Number(product.salePrice || 0).toFixed(2)}
                                                </div>
                                            </ProductItem>
                                        ))}
                                    </ProductList>
                                )}
                            </DeliveryItem>
                        ))}
                    </DeliveryList>

                    {/* Modal de entrega */}
                    {isModalOpen && (
                        <ModalOverlay>
                            <ModalContent>
                                <h2>Nova Entrega</h2>

                                {/* Campos para o cliente */}
                                <InputField
                                    type="text"
                                    placeholder="Nome do Cliente"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                />
                                <InputField
                                    type="text"
                                    placeholder="Rua"
                                    value={clientStreet}
                                    onChange={(e) => setClientStreet(e.target.value)}
                                />

                                {/* Campo para buscar o produto pelo nome */}
                                <InputField
                                    type="text"
                                    placeholder="Nome do Produto"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                                <SearchButton onClick={handleSearchProduct}>Buscar Produto</SearchButton>

                                {/* Lista de produtos na entrega */}
                                <h3>Produtos na Entrega</h3>
                                <ProductTable>
                                    <thead>
                                        <tr>
                                            <TableHeader>Nome</TableHeader>
                                            <TableHeader>Preço (R$)</TableHeader>
                                            <TableHeader>Quantidade</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deliveryProducts.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{product.productName}</TableCell>
                                                <TableCell>
                                                    {product.salePrice ? Number(product.salePrice).toFixed(2) : "Preço não disponível"}
                                                </TableCell>
                                                <TableCell>
                                                    <QuantityInput
                                                        type="number"
                                                        min="1"
                                                        max={product.stock}
                                                        value={product.quantity || 1}
                                                        onChange={(e) =>
                                                            handleQuantityChange(index, parseInt(e.target.value))
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </tbody>
                                </ProductTable>

                                {/* Total da entrega */}
                                <h3>Total da Entrega: R$ {totalDelivery.toFixed(2)}</h3>

                                {/* Botão para finalizar a entrega */}
                                <FinalizeDeliveryButton onClick={handleFinalizeDelivery}>
                                    Finalizar Entrega
                                </FinalizeDeliveryButton>

                                {/* Botão para fechar o modal */}
                                <button onClick={closeModal}>Fechar</button>
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </ContentContainer>
            </Content>
        </Container>
    );
};

export default Entregas;