import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/dashboard.css';

const Dashboard = () => {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedNome = localStorage.getItem('nome');
    const storedId = localStorage.getItem('usuario_id');
    if (!storedNome || !storedId) {
      navigate('/');
    } else {
      setNome(storedNome);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <header>
          <h1>Olá, {nome}</h1>
          <button onClick={handleLogout}>Logout</button>
        </header>
      </div>
    </div>
  );
};

export default Dashboard;
