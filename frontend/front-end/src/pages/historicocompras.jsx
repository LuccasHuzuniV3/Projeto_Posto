// src/pages/historicocompras.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
// Importamos a função de deletar e a de buscar (corrigida para getCompras)
import { getComprasCompleto, deleteCompras } from '../services/apiCompra';
import CompraCard from '../components/compraCard'

const HistoricoCompras = () => {
  const navigate = useNavigate();

  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const data = await getComprasCompleto(); 
        setCompras(data);
      } catch (error) {
        toast.error('Não foi possível carregar o histórico de compras.');
      } finally {
        setLoading(false);
      }
    };
    carregarHistorico();
  }, []);

  // --- NOVA FUNÇÃO DE EXCLUIR ---
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta compra?')) {
      try {
        await deleteCompras(id); // Chama o back-end
        toast.success('Compra excluída com sucesso!');
        // Atualiza a lista na tela removendo o item excluído sem precisar recarregar
        setCompras(compras.filter(compra => compra.id !== id));
      } catch (error) {
        toast.error('Erro ao excluir a compra.');
      }
    }
  };

  return (
    <div className="container-fornecedores">
      <header className="page-header">
        <div>
          <h1 className="page-title">HISTÓRICO DE COMPRAS</h1>
          <p className="page-subtitle">Visualize as compras já registradas.</p>
        </div>
        <button className="add-button" onClick={() => navigate('/compras/simular')}>
          <FaPlus />
          Simular Nova Compra
        </button>
      </header>
      
      <main> 
        {loading ? (
          <div className="feedback-container">
            <div className="loading-spinner"></div>
          </div>
        ) : compras.length === 0 ? (
          <p>Nenhuma compra registrada ainda.</p>
        ) : (
          <div className="grid-container">
            {compras.map(compra => (
              <CompraCard 
                key={compra.id} 
                compra={compra} 
                // Passamos a função de deletar para o card
                onDelete={() => handleDelete(compra.id)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoricoCompras;