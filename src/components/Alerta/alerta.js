import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { AlertContext } from "./AlertContext"; // Importe o AlertContext

const AlertaEstoque = () => {
  const [produtos, setProdutos] = useState([]);
  const { alerts, addAlert } = useContext(AlertContext); // Use o contexto de alertas

  useEffect(() => {
    const q = query(collection(db, "products"), where("stock", "<", 20));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const produtosComEstoqueBaixo = [];
      querySnapshot.forEach((doc) => {
        const produto = { id: doc.id, ...doc.data() };
        produtosComEstoqueBaixo.push(produto);

        // Verifica se o alerta já existe antes de adicionar
        const alertaExistente = alerts.find(
          (alert) => alert === `Produto "${produto.productName}" está com estoque baixo: ${produto.stock} unidades.`
        );

        if (!alertaExistente) {
          addAlert(`Produto "${produto.productName}" está com estoque baixo: ${produto.stock} unidades.`);
        }
      });

      setProdutos(produtosComEstoqueBaixo);
    });

    return () => unsubscribe();
  }, [addAlert, alerts]); // Adicione alerts como dependência

  return (
    <div>
      <h1>Alertas de Estoque</h1>
      {produtos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade em Estoque</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.productName}</td>
                <td>{produto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum produto com estoque baixo.</p>
      )}
    </div>
  );
};

export default AlertaEstoque;