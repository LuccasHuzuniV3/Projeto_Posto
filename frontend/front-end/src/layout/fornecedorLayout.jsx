// src/layout/FornecedorLayout.jsx

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../css/fornecedorlayout.css'; // Vamos criar este CSS

const FornecedorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para o login após sair
  };

  return (
    <div className="fornecedor-layout">
      <header className="fornecedor-header">
        <div className="logo-fornecedor">
          POSTO <strong>MERCADO</strong>
        </div>
        <div className="user-info">
          <span>Olá, <strong>{user?.nome || 'Fornecedor'}</strong></span>
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </div>
      </header>
      <main className="fornecedor-content">
        <Outlet />
      </main>
    </div>
  );
};

export default FornecedorLayout;