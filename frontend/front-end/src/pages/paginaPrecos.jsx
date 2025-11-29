// src/pages/PaginaPrecos.jsx - VERSÃO FINAL COM ÍCONES DE ORDENAÇÃO

import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
// --- NOVO: Importando ícones de seta do react-icons/fa ---
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getCombustivel } from '../services/apiCombustivel';
import { getComparativoPrecos } from '../services/apiPreco';

import '../css/paginaprecos.css';

const PaginaPrecos = () => {
  const [combustiveis, setCombustiveis] = useState([]);
  const [abaAtivaId, setAbaAtivaId] = useState(null);
  const [precosComparativos, setPrecosComparativos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estado para controle da ordenação (Inicia ordenado por valor crescente)
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

  // Lógica para ordenar os dados da tabela
  const tabelaDadosOrdenados = useMemo(() => {
    let sortableItems = [...precosComparativos];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Tratamento especial para datas para garantir ordenação correta
        let valA = sortConfig.key === 'dataAtualizacao' ? new Date(a[sortConfig.key]) : a[sortConfig.key];
        let valB = sortConfig.key === 'dataAtualizacao' ? new Date(b[sortConfig.key]) : b[sortConfig.key];

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [precosComparativos, sortConfig]);

  // Função chamada ao clicar no cabeçalho
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // --- NOVO: Função auxiliar para renderizar o ícone correto ---
  const getSortIcon = (columnKey) => {
    // Se a coluna atual não for a que está sendo ordenada, não mostra nada
    // ou mostra um espaçador invisível para manter o alinhamento (opcional)
    if (sortConfig.key !== columnKey) {
      // Usando um span vazio com largura fixa para evitar que o texto "pule" quando o ícone aparecer
      return <span style={{ display: 'inline-block', width: '16px', marginLeft: '8px' }}></span>;
    }

    // Retorna o ícone baseado na direção
    if (sortConfig.direction === 'ascending') {
      return <FaArrowUp size={14} style={{ marginLeft: '8px', color: '#38B2AC' }} />; // Cor destaque (teal)
    } else {
      return <FaArrowDown size={14} style={{ marginLeft: '8px', color: '#E53E3E' }} />; // Cor destaque (red)
    }
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
            <table className="users-table sortable-table"> {/* Adicionei uma classe extra opcional */}
              <thead>
                <tr>
                  {/* --- NOVO: Adicionado a chamada getSortIcon() em cada th --- */}
                  <th onClick={() => requestSort('fornecedor')}>
                    <div className="th-content">
                        Fornecedor {getSortIcon('fornecedor')}
                    </div>
                  </th>
                  <th onClick={() => requestSort('valor')}>
                    <div className="th-content">
                        Preço Atual {getSortIcon('valor')}
                    </div>
                  </th>
                  <th onClick={() => requestSort('dataAtualizacao')}>
                    <div className="th-content">
                        Data da Atualização {getSortIcon('dataAtualizacao')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabelaDadosOrdenados.map((preco, index) => (
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