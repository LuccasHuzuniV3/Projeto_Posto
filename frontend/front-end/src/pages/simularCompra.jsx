// src/pages/CalcularCompra.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importando nossas funções de serviço
import { getFornecedores } from '../services/apiFornecedor';
import { getCombustivel } from '../services/apiCombustivel';
import { getPrecoAtual } from '../services/apiPreco';
import { createCompra } from '../services/apiCompra';

import '../css/simularcompra.css';

const SimularCompra = () => {
  const navigate = useNavigate();

  // Estados para guardar os dados dos dropdowns
  const [fornecedores, setFornecedores] = useState([]);
  const [combustiveis, setCombustiveis] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para controlar as seleções do usuário
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [combustivelSelecionado, setCombustivelSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');

  // Estado para guardar o resultado da busca de preço
  const [precoAtual, setPrecoAtual] = useState(null);
  
  // Carrega dados iniciais dos dropdowns
  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const [fornecedoresData, combustiveisData] = await Promise.all([
          getFornecedores(),
          getCombustivel() // CORREÇÃO 1 (Continuação)
        ]);
        setFornecedores(fornecedoresData);
        setCombustiveis(combustiveisData);
      } catch (error) {
        toast.error("Não foi possível carregar os dados para o simulador.");
      } finally {
        setLoading(false);
      }
    };
    carregarDadosIniciais();
  }, []);

  // Busca o preço sempre que a combinação de fornecedor/combustível mudar
  useEffect(() => {
    const buscarPreco = async () => {
      if (fornecedorSelecionado && combustivelSelecionado) {
        setPrecoAtual(null); // Reseta o preço para indicar uma nova busca
        try {
          const precoData = await getPrecoAtual(fornecedorSelecionado, combustivelSelecionado);
          setPrecoAtual(precoData);
          if (!precoData) {
            toast.warn('Não há preço cadastrado para esta combinação.');
          }
        } catch (error) {
          toast.error("Erro ao buscar o preço para esta combinação.");
          setPrecoAtual(null);
        }
      }
    };
    buscarPreco();
  }, [fornecedorSelecionado, combustivelSelecionado]);

  // O custo total é sempre calculado, não é um estado.
  const custoTotal = (precoAtual && quantidade > 0) ? quantidade * precoAtual.valor : 0;

  // Função para salvar a compra
  const handleSalvarCompra = async () => {
    if (!precoAtual || !quantidade || parseFloat(quantidade) <= 0) {
      toast.warn('Selecione um fornecedor, combustível e quantidade válida.');
      return;
    }
    try {
      const dadosCompra = {
        quantidade: parseFloat(quantidade),
        precoId: precoAtual.id
      };
      await createCompra(dadosCompra);
      toast.success('Compra registrada com sucesso!');
      navigate('/fornecedores/listar'); // Redireciona para a lista de fornecedores
    } catch (error) {
      toast.error(`Não foi possível salvar a compra: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  // CORREÇÃO 2: A estrutura do JSX (return) foi completamente limpa e organizada.
  return (
    <div className="container-cadastro">
      <header className="page-header">
        <h1 className="page-title">CALCULAR COMPRA</h1>
      </header>

      <main className="simulador-container">
        {/* Seção de Entradas */}
        <div className="form-section">
          <h2 className="section-title">Parâmetros da Compra</h2>
          
          <label htmlFor="fornecedor">Fornecedor:</label>
          <select 
            id="fornecedor" 
            value={fornecedorSelecionado} 
            onChange={(e) => setFornecedorSelecionado(e.target.value)}
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>

          <label htmlFor="combustivel">Combustível:</label>
          <select 
            id="combustivel" 
            value={combustivelSelecionado} 
            onChange={(e) => setCombustivelSelecionado(e.target.value)}
          >
            <option value="">Selecione um combustível</option>
            {combustiveis.map(c => (
              <option key={c.id} value={c.id}>{c.tipo}</option>
            ))}
          </select>

          <label htmlFor="quantidade">Quantidade (Litros):</label>
          <input 
            type="number" 
            id="quantidade" 
            value={quantidade} 
            onChange={(e) => setQuantidade(e.target.value)} 
            placeholder="Ex: 1000" 
          />
        </div>

        {/* Seção de Resultados */}
        <div className="resultado-section">
          <div className="resultado-item">
            <span>Preço por Litro</span>
            <strong>R$ {precoAtual ? precoAtual.valor.toFixed(4) : '0,0000'}</strong>
          </div>
          <div className="resultado-item total">
            <span>Custo Final</span>
            <strong>R$ {custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
        </div>
        
        {/* Seção do Botão Salvar */}
        <div className="form-actions">
          <button onClick={handleSalvarCompra} className="submit-button" disabled={!precoAtual || !quantidade || quantidade <= 0}>
            Salvar Compra
          </button>
        </div>
      </main>
    </div>
  );
};

export default SimularCompra;