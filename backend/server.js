const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
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

app.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    const foundUser = users.find((u) => u.username === username && u.password === password);

    if (foundUser) {
        res.status(200).json({ message: 'Login bem sucedido!', username });
    } else {
        res.status(401).json({ message: 'Nome de usuário ou senha incorretos!' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
});