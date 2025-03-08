const express = require("express");
const cors = require("cors");

var admin = require("firebase-admin");

var serviceAccount = require("./deposito-f5485-firebase-adminsdk-fbsvc-7185f7ab3e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:3000", // Permite requisições do frontend
    credentials: true,
}));
app.use(express.json());

// Array de usuários corrigido
const users = [
    {
        id: 1,
        username: "caua",
        password: "1412",
    },
    {
        id: 2,
        username: "clesia",
        password: "1412",
    },
    {
        id: 3,
        username: "edjair",
        password: "1412",
    },
    {
        id: 4,
        username: "beatriz",
        password: "1412",
    }
];

app.post('/login', async (req, res) => {
    console.log("Dados recebidos:", req.body); // Log dos dados recebidos
    const { username, password } = req.body;

    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('username', '==', username).where('password', '==', password).get();

        if (snapshot.empty) {
            console.log("Usuário não encontrado"); // Log se o usuário não for encontrado
            res.status(401).json({ message: 'Nome de usuário ou senha incorretos!' });
        } else {
            console.log("Usuário encontrado:", snapshot.docs[0].data()); // Log do usuário encontrado
            res.status(200).json({ message: 'Login bem sucedido!', username });
        }
    } catch (error) {
        console.error("Erro ao fazer login: ", error); // Log de erro
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
});