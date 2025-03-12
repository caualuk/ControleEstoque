import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/LoginPage/UserContext';
import Login from './components/LoginPage/login.js';
import Home from './components/Home/home.js';
import Produtos from './components/Produtos/produtos.js';
import Caixa from './components/Caixa/caixa.js';
import Pagamentos from './components/Pagamentos/pagamentos.js';
import NavbarLeft from './components/NavbarLeft/navbarleft.js';
import Recebimentos from './components/Receber/recebimentos.js';
import Header from './components/Header/header.js'; 
import Clientes from './components/Clientes/clientes.js';
import Fornecedores from './components/Fornecedores/fornecedores.js';
import { ClientesProvider } from './components/ClientesProvider/ClientesProvider.js';
import { ValorTotalProvider } from './components/ClientesProvider/valorTotalContext.js'; // Importe o ValorTotalProvider
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
        <UserProvider>
            <ClientesProvider>
                <ValorTotalProvider> 
                    <Router>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<Layout><Home /></Layout>} />
                            <Route path="/produtos" element={<Layout><Produtos /></Layout>} />
                            <Route path="/caixa" element={<Layout><Caixa /></Layout>} />
                            <Route path="/entrada" element={<Layout><Recebimentos /></Layout>} />
                            <Route path="/saida" element={<Layout><Pagamentos /></Layout>} />
                            <Route path="/clientes" element={<Layout><Clientes /></Layout>} />
                            <Route path="/fornecedores" element={<Layout><Fornecedores /></Layout>} />
                        </Routes>
                    </Router>
                </ValorTotalProvider>
            </ClientesProvider>
        </UserProvider>
    );
}

export default App;