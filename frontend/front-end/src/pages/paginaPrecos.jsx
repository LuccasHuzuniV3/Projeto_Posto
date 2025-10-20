// src/pages/PaginaPrecos.jsx - VERSÃO FINAL COM ORDENAÇÃO E SEM DESTAQUE

import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getCombustivel } from '../services/apiCombustivel';
import { getComparativoPrecos } from '../services/apiPreco';

import '../css/paginaprecos.css';

const PaginaPrecos = () => {
  const [combustiveis, setCombustiveis] = useState([]);
  const [abaAtivaId, setAbaAtivaId] = useState(null);
  const [precosComparativos, setPrecosComparativos] = useState([]);
  const [loading, setLoading] = useState(false); // Inicia como false

  // --- NOVO ESTADO PARA CONTROLE DA ORDENAÇÃO ---
  const [sortConfig, setSortConfig] = useState({ key: 'valor', direction: 'ascending' });

  useEffect(() => {
    const carregarCombustiveis = async () => {
      try {
        const data = await getCombustivel();
        setCombustiveis(data);
        if (data.length > 0) {
          setAbaAtivaId(data[0].id);
        }
      } catch (error) {
        toast.error('Não foi possível carregar os tipos de combustível.');
      }
    };
    carregarCombustiveis();
  }, []);

  useEffect(() => {
    if (!abaAtivaId) return;

    const carregarComparativo = async () => {
      setLoading(true);
      try {
        const data = await getComparativoPrecos(abaAtivaId);
        setPrecosComparativos(data);
      } catch (error) {
        toast.error('Não foi possível carregar o comparativo de preços.');
      } finally {
        setLoading(false);
      }
    };

    carregarComparativo();
  }, [abaAtivaId]);

  // --- NOVA LÓGICA PARA ORDENAR OS DADOS DA TABELA ---
  const tabelaDadosOrdenados = useMemo(() => {
    let sortableItems = [...precosComparativos];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [precosComparativos, sortConfig]);

  // Função que é chamada ao clicar no cabeçalho para mudar a ordenação
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container-fornecedores">
      <header className="page-header">
        <div>
          <h1 className="page-title">Painel Comparativo de Preços</h1>
          <p className="page-subtitle">Veja o preço mais recente de cada fornecedor.</p>
        </div>
      </header>

      <main>
        <div className="tabs-container">
          {combustiveis.map(comb => (
            <button
              key={comb.id}
              className={`tab-button ${abaAtivaId === comb.id ? 'active' : ''}`}
              onClick={() => setAbaAtivaId(comb.id)}
            >
              {comb.tipo}
            </button>
          ))}
        </div>

        <div className="table-container">
          {loading ? (
            <div className="feedback-container"><div className="loading-spinner"></div></div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  {/* --- CABEÇALHOS AGORA SÃO CLICÁVEIS --- */}
                  <th onClick={() => requestSort('fornecedor')}>Fornecedor</th>
                  <th onClick={() => requestSort('valor')}>Preço Atual</th>
                  <th onClick={() => requestSort('dataAtualizacao')}>Data da Atualização</th>
                </tr>
              </thead>
              <tbody>
                {/* A tabela agora usa 'tabelaDadosOrdenados' */}
                {tabelaDadosOrdenados.map((preco, index) => (
                  // --- REMOVIDA A CLASSE 'destaque' ---
                  <tr key={index}>
                    <td>{preco.fornecedor}</td>
                    <td>R$ {preco.valor.toFixed(2)}</td>
                    <td>{new Date(preco.dataAtualizacao).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaginaPrecos;