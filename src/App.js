import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/LoginPage/UserContext';
import { AlertProvider } from './components/Alerta/AlertContext'; // Importe o AlertProvider
import Login from './components/LoginPage/login.js';
import Home from './components/Home/home.js';
import Produtos from './components/Produtos/produtos.js';
import Caixa from './components/Caixa/caixa.js';
import Pagamentos from './components/Pagamentos/pagamentos.js';
import NavbarLeft from './components/NavbarLeft/navbarleft.js';
import Recebimentos from './components/Receber/recebimentos.js';
import Header from './components/Header/header.js'; 
import Fornecedores from './components/Fornecedores/fornecedores.js';
import Entregas from './components/Entregas/entregas.js';
import AlertaEstoque from "./components/Alerta/alerta.js";
import GlobalAlert from "./components/Alerta/GlobalAlert.js"; // Importe o GlobalAlert
import './index.css';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <NavbarLeft />
            <div className="main-content">
                <Header />
                {children}
            </div>
        </div>
    );
};

function App() {
    return (
        <AlertProvider> {/* Envolva tudo com o AlertProvider */}
            <UserProvider>
                <Router>
                    <GlobalAlert /> {/* Renderize o GlobalAlert aqui (fora das rotas) */}
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Layout><Home /></Layout>} />
                        <Route path="/produtos" element={<Layout><Produtos /></Layout>} />
                        <Route path="/caixa" element={<Layout><Caixa /></Layout>} />
                        <Route path="/entregas" element={<Layout><Entregas /></Layout>} />
                        <Route path="/entrada" element={<Layout><Recebimentos /></Layout>} />
                        <Route path="/saida" element={<Layout><Pagamentos /></Layout>} />
                        <Route path="/fornecedores" element={<Layout><Fornecedores /></Layout>} />
                        <Route path="/alerta" element={<Layout><AlertaEstoque /></Layout>} />
                    </Routes>
                </Router>
            </UserProvider>
        </AlertProvider>
    );
}

export default App;