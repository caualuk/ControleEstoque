import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/LoginPage/UserContext';
import Login from './components/LoginPage/login.js';
import Home from './components/Home/home.js';
import Produtos from './components/Produtos/produtos.js';
import Caixa from './components/Caixa/caixa.js';
import Entrada from './components/Entrada/entradaVendas.js';
import NavbarLeft from './components/NavbarLeft/navbarleft.js';
import './index.css'

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/caixa" element={<Caixa />} />
                    <Route path="/entrada" element={<Entrada />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;