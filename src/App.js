import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/LoginPage/UserContext';
import Login from './components/LoginPage/login.js';
import Home from './components/Home/home.js';

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;