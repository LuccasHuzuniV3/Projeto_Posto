// src/pages/PaginaHistoricoPrecos.jsx - VERSÃO FINAL COM GRÁFICO DE LINHAS CORRETO

import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select'; 

// Suas importações de API
import { getCombustivel } from '../services/apiCombustivel';
import { getFornecedores } from '../services/apifornecedores';
import { getHistoricoPrecos } from '../services/apiPreco';

// --- CORREÇÃO 1: IMPORTAÇÕES DO CHART.JS PARA LINHAS ---
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// --- CORREÇÃO 2: REGISTRO DO GRÁFICO DE LINHAS ---
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PaginaHistoricoPrecos = () => {
  const [historicoCompleto, setHistoricoCompleto] = useState([]);
  const [todosCombustiveis, setTodosCombustiveis] = useState([]);
  const [todosFornecedores, setTodosFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros de seleção única
  const [combustivelSelecionado, setCombustivelSelecionado] = useState(null);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const [historicoData, combustiveisData, fornecedoresData] = await Promise.all([
          getHistoricoPrecos(),
          getCombustivel(),
          getFornecedores()
        ]);
        setHistoricoCompleto(historicoData);
        setTodosCombustiveis(combustiveisData);
        setTodosFornecedores(fornecedoresData);
      } catch (error) {
        toast.error('Não foi possível carregar os dados da página.');
      } finally {
        setLoading(false);
      }
    };
    carregarDadosIniciais();
  }, []);
  
  const optionsCombustivel = useMemo(() => 
    todosCombustiveis.map(c => ({ value: c.id, label: c.tipo })),
    [todosCombustiveis]
  );

  const optionsFornecedor = useMemo(() => 
    todosFornecedores.map(f => ({ value: f.id, label: f.nome })),
    [todosFornecedores]
  );

  const { chartData, tabelaDados } = useMemo(() => {
    if (!combustivelSelecionado || !fornecedorSelecionado || historicoCompleto.length === 0) {
      return { chartData: { labels: [], datasets: [] }, tabelaDados: [] };
    }

    const dadosFiltrados = historicoCompleto.filter(preco => 
        preco.combustivel.id === combustivelSelecionado.value &&
        preco.fornecedor.id === fornecedorSelecionado.value
    );

    if (dadosFiltrados.length === 0) {
      return { chartData: { labels: [], datasets: [] }, tabelaDados: [] };
    }
    
    dadosFiltrados.sort((a, b) => new Date(a.dataCadastro) - new Date(b.dataCadastro));

    const labelsDoGrafico = dadosFiltrados.map(p => new Date(p.dataCadastro).toLocaleDateString('pt-BR'));
    const valoresDoGrafico = dadosFiltrados.map(p => p.valor);

    const datasets = [{
      label: 'Preço (R$)',
      data: valoresDoGrafico,
      borderColor: 'rgba(56, 178, 172, 1)',
      backgroundColor: 'rgba(56, 178, 172, 0.2)',
      tension: 0.1,
      fill: true, // Preenche a área abaixo da linha
    }];
    
    return { chartData: { labels: labelsDoGrafico, datasets }, tabelaDados: dadosFiltrados };
  }, [historicoCompleto, combustivelSelecionado, fornecedorSelecionado]);


  const optionsDoGrafico = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { 
            display: true, 
            text: `Histórico de Preços: ${combustivelSelecionado?.label || ''} - ${fornecedorSelecionado?.label || ''}`,
            font: { size: 18, family: 'Montserrat, sans-serif' },
            color: '#2D3748'
        },
    },
    scales: { 
      y: { 
        beginAtZero: false,
        title: {
            display: true,
            text: 'Preço (R$)',
            font: { size: 14, family: 'Montserrat, sans-serif' },
            color: '#4A5568'
        },
        ticks: { 
            callback: value => `R$ ${Number(value).toFixed(2)}`,
            color: '#718096',
            font: { family: 'Montserrat, sans-serif' }
        }
      },
      x: { 
        title: {
            display: true,
            text: 'Data de Cadastro',
            font: { size: 14, family: 'Montserrat, sans-serif' },
            color: '#4A5568'
        },
        ticks: {
            color: '#718096',
            font: { family: 'Montserrat, sans-serif' }
        }
      }
    }
  };
  
  const formatarDataHora = (dataISO) => new Date(dataISO).toLocaleString('pt-BR');

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="container-fornecedores">
      <header className="page-header">
        <div>
          <h1 className="page-title">Análise de Preços</h1>
          <p className="page-subtitle">Acompanhe o histórico de preços por combustível e fornecedor.</p>
        </div>
      </header>
      
      <main>
        <div className="form-section filtros-container">
          <div className="filtro-item">
            <label>Selecione um Combustível:</label>
            <Select
              options={optionsCombustivel}
              value={combustivelSelecionado}
              onChange={setCombustivelSelecionado}
              placeholder="Ex: Gasolina"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          <div className="filtro-item">
            <label>Selecione um Fornecedor:</label>
            <Select
              options={optionsFornecedor}
              value={fornecedorSelecionado}
              onChange={setFornecedorSelecionado}
              placeholder="Ex: CiaPetro"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="form-section">
          {tabelaDados.length > 0 ? (
            <div className="grafico-container">
                {/* --- CORREÇÃO 3: RENDERIZAÇÃO DO GRÁFICO DE LINHAS --- */}
                <Line data={chartData} options={optionsDoGrafico} />
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#a0aec0' }}>
              Selecione um combustível e um fornecedor para visualizar o histórico de preços.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaginaHistoricoPrecos;