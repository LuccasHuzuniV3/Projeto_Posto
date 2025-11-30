// src/pages/PrecoFornecedor.jsx

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCombustivel } from '../services/apiCombustivel';
import { createPrecoFornecedor } from '../services/apiPreco';

const PrecoFornecedor = () => {
  const [combustiveis, setCombustiveis] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    combustivelId: '',
    valor: ''
  });

  useEffect(() => {
    getCombustivel()
      .then(setCombustiveis)
      .catch(() => toast.error('Não foi possível carregar os combustíveis.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.combustivelId || !formData.valor) {
      toast.warn("Por favor, selecione um combustível e informe o valor.");
      return;
    }

    try {
      const payload = {
        combustivelId: Number(formData.combustivelId),
        valor: parseFloat(formData.valor)
      };

      await createPrecoFornecedor(payload);

      toast.success("Preço cadastrado com sucesso!");

      setFormData({
        combustivelId: '',
        valor: ''
      });

    } catch (error) {
      toast.error("Erro ao cadastrar preço: " + error.message);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container-cadastro">
      <header className="page-header">
        <h1 className="page-title">Cadastrar Preço do Dia</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="form-cadastro">

          <div className="form-section">
            <h2 className="section-title">Informações do Preço</h2>

            <label>Combustível:</label>
            <select
              name="combustivelId"
              value={formData.combustivelId}
              onChange={handleChange}
            >
              <option value="">Selecione o combustível</option>

              {combustiveis.map(c => (
                <option key={c.id} value={c.id}>{c.tipo}</option>
              ))}
            </select>

            <label>Valor (R$):</label>
            <input
              type="number"
              name="valor"
              step="0.0001"
              placeholder="Ex: 5.4321"
              value={formData.valor}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Salvar Preço
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default PrecoFornecedor;
