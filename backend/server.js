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

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});