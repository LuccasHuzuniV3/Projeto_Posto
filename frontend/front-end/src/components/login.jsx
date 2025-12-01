import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Fuel } from 'lucide-react'; // Importando o ícone
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro no login. Verifique suas credenciais.');
      }

      // Salva o usuário no contexto global
      login(data.usuario);

      // Faz o redirecionamento inteligente baseado no 'role'
      if (data.usuario.role === 'Admin') {
        navigate('/dashboard');
      } else if (data.usuario.role === 'Fornecedor') {
        navigate('/meu-preco');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err.message || 'Erro ao conectar com o servidor.');
      console.error('Erro de login:', err);
    }
  };

  return (
    <section className="gradient-form">
      <div className="card">
        {/* Lado esquerdo */}
        <div className="card-body">
          
          {/* Container para Ícone e Título */}
          <div className="brand-container">
            <Fuel size={40} color="#38B2AC" strokeWidth={2.5} />
            <h2>Posto Mercado</h2>
          </div>
          
          <p>Entre na sua conta</p>

          <form onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}

            <input 
              type="email" 
              className="form-control" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              className="form-control" 
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit" className="btn-login">LOGAR</button>
          </form>
        </div>

        {/* Lado direito */}
        <div className="gradient-side">
          <img 
            src="/imagem.jpeg" 
            alt="Login visual"
            className="side-image"
          />
        </div>

      </div>
    </section>
  );
};

export default Login;