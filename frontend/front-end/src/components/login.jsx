import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
       if (response.ok) { // status 200-299
      const data = await response.json();
      // Aqui você pega os dados do usuário
      const { usuario_id, nome } = data;

      // Você pode salvar no localStorage ou contexto, se quiser
      localStorage.setItem('usuario_id', usuario_id);
      localStorage.setItem('nome', nome);

      setMessage(`Bem-vindo, ${nome}!`);
      console.log('Login bem-sucedido:');
      setError('');

      // Redireciona para outra página
      navigate('/dashboard'); // ou qualquer rota após login
    } else {
      // Caso a API retorne 400, 401 etc.
      const data = await response.json();
      setError(data.message || 'Erro no login');
      setMessage('');
    }
  } catch (err) {
    setError('Erro ao conectar com o servidor');
    console.error('Erro:', err);
  }
};

  return (
    <section className="gradient-form">
      <div className="card">
        {/* Lado esquerdo */}
        <div className="card-body">
    
          <h2>Gontijao Team</h2>
          <p>Entre na sua conta</p>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}


          <input 
          type="email" 
          className="form-control" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          className="form-control" 
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          />

          <button className="btn-login" onClick={handleLogin} >LOGAR</button>
        </div>

        {/* Lado direito */}
        <div className="gradient-side">
         <img
            src="/como-abrir-franquia-do-posto-shell-e1679299922711.jpg"
            alt="Logo"
            style={{ width: "80px", marginBottom: "20px" }}
          />
          <h2>Somos mais que uma empresa</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
