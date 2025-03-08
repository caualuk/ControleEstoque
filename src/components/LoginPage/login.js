import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useUser } from './UserContext';

const LoginContainer = styled.div`
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-color: #f5f5f5;
    }

    .login-box {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }

    .login-box h2 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        color: #333;
        text-align: center;
    }

    .input-group {
        margin-bottom: 1rem;
    }

    .input-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #555;
        font-weight: bold;
    }

    .input-group input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }

    .input-group input:focus {
        border-color: #007bff;
        outline: none;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 1rem;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    .error-message {
        color: red;
        margin-top: 1rem;
        text-align: center;
        font-size: 0.9rem;
    }
`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!username || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
    
        setIsLoading(true);
        setError('');
    
        try {
            console.log("Enviando requisição para /login com:", { username, password }); // Log dos dados enviados
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            console.log("Resposta recebida:", response); // Log da resposta
    
            const data = await response.json();
            console.log("Dados da resposta:", data); // Log dos dados da resposta
    
            if (response.ok) {
                const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
                setUser(formattedUsername);
                navigate('/home');
            } else {
                setError(data.message || 'Nome de usuário ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
            setError('Erro ao conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginContainer>
            <div className="login-page">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Nome de Usuário</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Carregando...' : 'Entrar'}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </LoginContainer>
    );
}

export default Login;