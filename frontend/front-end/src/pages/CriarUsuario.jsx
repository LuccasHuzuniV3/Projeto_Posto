// src/pages/CriarUsuario.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../services/apiConfiguracao';
import { getFornecedores } from '../services/apifornecedores';

const CriarUsuario = () => {
  const navigate = useNavigate();
  
  // 1. ADICIONE 'nome' AO ESTADO INICIAL DO FORMULÁRIO
  const [formData, setFormData] = useState({
    nome: '', // <<< O CAMPO QUE FALTAVA
    email: '',
    password: '',
    role: 'Admin',
    fornecedorId: ''
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFornecedores()
      .then(setFornecedores)
      .catch((err) => {
        toast.error('Não foi possível carregar a lista de fornecedores.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = { ...prevState, [name]: value };
      if (name === 'role' && value === 'Admin') {
        newState.fornecedorId = '';
      }
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 3. INCLUA O 'nome' NOS DADOS A SEREM ENVIADOS
      const userData = {
        nome: formData.nome, // <<< O CAMPO QUE FALTAVA
        email: formData.email,
        senha: formData.password,
        role: formData.role,
        fornecedorId: formData.role === 'Fornecedor' && formData.fornecedorId 
                      ? Number(formData.fornecedorId) 
                      : undefined,
      };

      await createUser(userData);
      toast.success('Usuário criado com sucesso!');
      navigate('/configuracao');
    } catch (error) {
      toast.error(`Erro ao criar usuário: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="container-cadastro">
      <header className="page-header">
        <h1 className="page-title">CRIAR NOVO USUÁRIO</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="form-cadastro">
          <div className="form-section">
            <h2 className="section-title">Dados de Acesso</h2>
            
            {/* 2. ADICIONE O CAMPO DE INPUT PARA O NOME */}
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            
            <label htmlFor="role">Papel (Role):</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="Admin">Administrador</option>
              <option value="Fornecedor">Fornecedor</option>
            </select>
          </div>

          {formData.role === 'Fornecedor' && (
            <div className="form-section">
              <h2 className="section-title">Vincular a um Fornecedor</h2>
              <label htmlFor="fornecedorId">Selecione o Fornecedor:</label>
              <select id="fornecedorId" name="fornecedorId" value={formData.fornecedorId} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {fornecedores.map(f => (
                  <option key={f.id} value={f.id}>{f.nome}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/usuarios')}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Criar Usuário
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CriarUsuario;