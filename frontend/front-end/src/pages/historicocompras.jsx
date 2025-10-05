// src/pages/HistoricoCompras.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const HistoricoCompras = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fornecedores"> {/* Reutilizando o estilo do container */}
      <header className="page-header">
        <div>
          <h1 className="page-title">HISTÓRICO DE COMPRAS</h1>
          <p className="page-subtitle">
            Visualize as compras já registradas.
          </p>
        </div>
        <button className="add-button" onClick={() => navigate('/simulador/compra')}>
          <FaPlus />
          Simular Nova Compra
        </button>
      </header>

      <main>
        <p>Carregando histórico...</p>
        {/* Aqui entrarão os cards das compras */}
      </main>
    </div>
  );
};

export default HistoricoCompras;