import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
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
      const response = await fetch('https://projeto-posto.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Essencial para o gerenciamento de cookies
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
          <h2>Posto Mercado</h2>
          <p>Entre na sua conta</p>

          <form onSubmit={handleLogin}>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

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

        {/* --- LADO DIREITO (CONTEÚDO RESTAURADO) --- */}
        <div className="gradient-side">
          <h2>Somos mais que uma empresa</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        {/* --- FIM DO CONTEÚDO RESTAURADO --- */}

      </div>
    </section>
  );
};

export default Login;