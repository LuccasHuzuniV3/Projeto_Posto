// src/layout/FornecedorLayout.jsx

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// 1. IMPORTAÇÕES NECESSÁRIAS PARA O POPUP
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../css/fornecedorlayout.css';

const FornecedorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
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

      {/* 2. ADICIONE O COMPONENTE QUE MOSTRA OS POPUPS AQUI */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default FornecedorLayout;