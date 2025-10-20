// src/pages/Dashboard.jsx - VERSÃO FINAL COM LAYOUT MELHORADO

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDashboardStats, getMelhoresPrecos, getUltimasCompras, getTotalComprasMes } from '../services/apiDashboard';

import '../css/dashboard.css'; 

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [melhoresPrecos, setMelhoresPrecos] = useState([]);
  const [ultimasCompras, setUltimasCompras] = useState([]);
  const [totalComprasMes, setTotalComprasMes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDashboardData = async () => {
      try {
        const [statsData, melhoresPrecosData, ultimasComprasData, totalComprasData] = await Promise.all([
          getDashboardStats(),
          getMelhoresPrecos(),
          getUltimasCompras(),
          getTotalComprasMes()
        ]);
        setStats(statsData);
        setMelhoresPrecos(melhoresPrecosData);
        setUltimasCompras(ultimasComprasData);
        setTotalComprasMes(totalComprasData);
      } catch (error) {
        toast.error('Não foi possível carregar os dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };
    carregarDashboardData();
  }, []);

  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="container-fornecedores">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Resumo das atividades do sistema.</p>
        </div>
      </header>
      
      <main>
        {/* Grid para os cards superiores */}
        <div className="dashboard-grid">
          <div className="stat-card">
            <p className="stat-card-title">Fornecedores Ativos</p>
            <h2 className="stat-card-number">{stats?.fornecedorCount || '0'}</h2>
          </div>

          <div className="stat-card prices-card">
            <p className="stat-card-title">Melhores Preços Atuais</p>
            <div className="prices-list">
              {melhoresPrecos.length > 0 ? (
                melhoresPrecos.map((item, index) => (
                  <div key={index} className="price-item">
                    <span className="price-item-fuel">{item.combustivel}</span>
                    <span className="price-item-value">R$ {item.valor.toFixed(2)}</span>
                    <span className="price-item-supplier">{item.fornecedor}</span>
                  </div>
                ))
              ) : <p className="no-prices-message">Nenhum preço.</p>}
            </div>
          </div>
          
          <div className="stat-card">
            <p className="stat-card-title">Custo Total (Mês)</p>
            <h2 className="stat-card-number">
              R$ {(totalComprasMes?.custoTotalMes || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
        </div>

        {/* --- NOVA SEÇÃO DE ATIVIDADE RECENTE (O CARD QUE "DESCEU") --- */}
        <div className="recent-activity-section">
          <h2 className="section-title">Atividade Recente (Últimas Compras)</h2>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Combustível</th>
                  <th>Fornecedor</th>
                  <th>Custo Total</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {ultimasCompras.length > 0 ? (
                  ultimasCompras.map((item) => (
                    <tr key={item.id}>
                      <td>{item.preco.combustivel.tipo}</td>
                      <td>{item.preco.fornecedor.nome}</td>
                      <td>R$ {item.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td>{formatarData(item.dataCompra)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Nenhuma compra recente.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;