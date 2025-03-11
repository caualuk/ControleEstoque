const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./deposito-f5485-firebase-adminsdk-fbsvc-7185f7ab3e.json");
const bcrypt = require("bcrypt");

// Inicialize o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Permite requisições do frontend
    credentials: true,
  })
);
app.use(express.json());

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validação de entrada
  if (!username || !password) {
    return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios!" });
  }

  try {
    // Busca o usuário no Firestore
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("username", "==", username).get();

    if (snapshot.empty) {
      console.log("Usuário não encontrado");
      return res.status(401).json({ message: "Nome de usuário ou senha incorretos!" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Logs para depuração
    console.log("Usuário encontrado:", userData.username);
    console.log("Senha fornecida:", password);
    console.log("Hash armazenado:", userData.password);

    // Verifica a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    console.log("Resultado da comparação:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Senha incorreta");
      return res.status(401).json({ message: "Nome de usuário ou senha incorretos!" });
    }

    console.log("Login bem-sucedido para o usuário:", userData.username);
    res.status(200).json({ message: "Login bem-sucedido!", username: userData.username });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para registrar vendas diárias
app.post("/registrar-venda-diaria", async (req, res) => {
  const { valorVenda } = req.body;

  // Validação de entrada
  if (!valorVenda || isNaN(valorVenda)) {
    return res.status(400).json({ error: "Valor da venda é obrigatório e deve ser um número." });
  }

  try {
    // Obtém a data atual no formato YYYY-MM-DD
    const dataAtual = new Date().toISOString().split('T')[0];

    // Referência ao documento do dia atual na coleção "vendas_diarias"
    const docRef = db.collection("vendas_diarias").doc(dataAtual);

    // Atualiza o total do dia (incrementa o valor da venda)
    await docRef.set({
      total: admin.firestore.FieldValue.increment(Number(valorVenda)),
      data: dataAtual,
    }, { merge: true });

    res.status(200).json({ message: "Venda registrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar venda diária:", error);
    res.status(500).json({ error: "Erro ao registrar venda diária." });
  }
});

// Rota para consultar vendas diárias
app.get("/entrada", async (req, res) => {
  const { data } = req.query;

  // Validação de entrada
  if (!data) {
    return res.status(400).json({ error: "A data é obrigatória." });
  }

  try {
    // Referência ao documento da data especificada na coleção "vendas_diarias"
    const docRef = db.collection("vendas_diarias").doc(data);
    const docSnap = await docRef.get();

    if (docSnap.exists()) {
      res.status(200).json({ total: docSnap.data().total });
    } else {
      res.status(200).json({ total: 0 }); // Retorna 0 se não houver vendas na data
    }
  } catch (error) {
    console.error("Erro ao consultar vendas diárias:", error);
    res.status(500).json({ error: "Erro ao consultar vendas diárias." });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});