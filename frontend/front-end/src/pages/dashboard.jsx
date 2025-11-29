// src/pages/Dashboard.jsx - VERSÃO FINAL COM ÍCONES DE ORDENAÇÃO

import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getDashboardStats, getMelhoresPrecos, getUltimasCompras, getTotalComprasMes } from '../services/apiDashboard';

import '../css/dashboard.css'; 

// --- NOVAS IMPORTAÇÕES DE ÍCONES ---
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa'; 

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [melhoresPrecos, setMelhoresPrecos] = useState([]);
  const [ultimasCompras, setUltimasCompras] = useState([]);
  const [totalComprasMes, setTotalComprasMes] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para controle da ordenação
  const [sortConfig, setSortConfig] = useState({ key: 'dataCompra', direction: 'descending' });

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

  // Lógica para ordenar a tabela (essa parte permanece igual)
  const ultimasComprasOrdenadas = useMemo(() => {
    let sortableItems = [...ultimasCompras];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        switch (sortConfig.key) {
          case 'combustivel':
            aValue = a.preco.combustivel.tipo;
            bValue = b.preco.combustivel.tipo;
            break;
          case 'fornecedor':
            aValue = a.preco.fornecedor.nome;
            bValue = b.preco.fornecedor.nome;
            break;
          case 'custoTotal':
            aValue = a.custoTotal;
            bValue = b.custoTotal;
            break;
          case 'dataCompra':
            aValue = new Date(a.dataCompra);
            bValue = new Date(b.dataCompra);
            break;
          default: return 0;
        }
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [ultimasCompras, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  // --- NOVA FUNÇÃO PARA RENDERIZAR O ÍCONE ---
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <FaSortUp className="sort-icon active" />;
      } else {
        return <FaSortDown className="sort-icon active" />;
      }
    }
    return <FaSort className="sort-icon" />; // Ícone padrão para colunas não ordenadas
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

        <div className="recent-activity-section">
          <h2 className="section-title">Atividade Recente (Últimas Compras)</h2>
          <div className="table-container">
            <table className="users-table sortable">
              <thead>
                <tr>
                  <th onClick={() => requestSort('combustivel')}>
                    Combustível {renderSortIcon('combustivel')}
                  </th>
                  <th onClick={() => requestSort('fornecedor')}>
                    Fornecedor {renderSortIcon('fornecedor')}
                  </th>
                  <th onClick={() => requestSort('custoTotal')}>
                    Custo Total {renderSortIcon('custoTotal')}
                  </th>
                  <th onClick={() => requestSort('dataCompra')}>
                    Data {renderSortIcon('dataCompra')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ultimasComprasOrdenadas.length > 0 ? (
                  ultimasComprasOrdenadas.map((item) => (
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