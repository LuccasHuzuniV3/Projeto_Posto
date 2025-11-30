// src/pages/EditarUsuario.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importando os serviços de API necessários
import { getOneUser, updateUser } from '../services/apiConfiguracao';
import { getFornecedores } from '../services/apifornecedores';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    role: 'Admin',
    fornecedorId: '',
    password: '' // CORRIGIDO: Nome consistente com o input
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [userData, fornecedoresData] = await Promise.all([
          getOneUser(id),
          getFornecedores()
        ]);

        setFormData({
          nome: userData.nome,
          email: userData.email,
          role: userData.role,
          fornecedorId: userData.fornecedorId ? String(userData.fornecedorId) : '',
          password: '' // CORRIGIDO: Mantemos vazio e com o nome 'password'
        });

        setFornecedores(fornecedoresData);

      } catch (error) {
        toast.error('Não foi possível carregar os dados para edição.');
        navigate('/configuracao');
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepara os dados básicos
      const userData = {
        nome: formData.nome,
        email: formData.email,
        role: formData.role,
        fornecedorId: formData.role === 'Fornecedor' ? Number(formData.fornecedorId) : null,
      };

      // LÓGICA DA SENHA CORRIGIDA:
      // Verifica o estado 'password', mas envia a chave 'senha' para o Back-end
      if (formData.password && formData.password.trim() !== '') {
        userData.senha = formData.password; 
      }

      await updateUser(id, userData);
      toast.success('Usuário atualizado com sucesso!');
      navigate('/configuracao');
    } catch (error) {
      toast.error(`Erro ao atualizar usuário: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="container-cadastro">
      <header className="page-header">
        <h1 className="page-title">EDITAR USUÁRIO</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="form-cadastro">
          <div className="form-section">
            <h2 className="section-title">Dados de Acesso</h2>
            
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required 
            />

            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            
            {/* --- CAMPO DE SENHA --- */}
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <label htmlFor="password" style={{ color: '#2d3748', fontWeight: 'bold' }}>
                    Nova Senha (Opcional):
                </label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" // O nome aqui deve bater com o formData
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Deixe em branco para manter a senha atual"
                  style={{ border: '1px solid #cbd5e0' }} 
                />
                <small style={{ color: '#718096', display: 'block', marginTop: '4px' }}>
                    Preencha apenas se o usuário esqueceu a senha e precisa redefinir.
                </small>
            </div>
            
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
            <button type="button" className="cancel-button" onClick={() => navigate('/configuracao')}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditarUsuario;

//Pop up fornecedor
//Tirar opcao combustivel
//Desmarcar relatorios