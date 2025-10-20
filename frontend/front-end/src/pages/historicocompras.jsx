// src/pages/historicocompras.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getComprasCompleto } from '../services/apiCompra'; // CORRECTION 1: Use the correct function
import CompraCard from '../components/compraCard'; // CORRECTION 2: Use standard component casing

const HistoricoCompras = () => {
  const navigate = useNavigate();

  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const data = await getComprasCompleto(); // CORRECTION 1 (cont.): Call the correct function
        setCompras(data);
      } catch (error) {
        toast.error('Não foi possível carregar o histórico de compras.');
      } finally {
        setLoading(false);
      }
    };
    carregarHistorico();
  }, []);

  return (
    <div className="container-fornecedores">
      <header className="page-header">
        <div>
          <h1 className="page-title">HISTÓRICO DE COMPRAS</h1>
          <p className="page-subtitle">Visualize as compras já registradas.</p>
        </div>
        <button className="add-button" onClick={() => navigate('/simulador/compra')}>
          <FaPlus />
          Simular Nova Compra
        </button>
      </header>
      
  <main> {/* Remova a classe 'historico-lista' se ela estiver aqui */}
        {loading ? (
          <div className="feedback-container">
            <div className="loading-spinner"></div>
          </div>
        ) : compras.length === 0 ? (
          <p>Nenhuma compra registrada ainda.</p>
        ) : (
          // 👇 ENVOLVA O SEU .map() COM ESTA DIV 👇
          <div className="grid-container"> {/* Esta é a classe que criará o layout de grid */}
            {compras.map(compra => (
              <CompraCard key={compra.id} compra={compra} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoricoCompras;