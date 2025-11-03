// src/pages/EditarUsuario.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importando os serviços de API necessários
import { getOneUser, updateUser } from '../services/apiConfiguracao';
import { getFornecedores } from '../services/apifornecedores';

const EditarUsuario = () => {
  const { id } = useParams(); // Pega o ID da URL (ex: /usuarios/editar/3)
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    // Não carregamos a senha por segurança
    role: 'Admin',
    fornecedorId: ''
  });
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efeito para buscar os dados do usuário e a lista de fornecedores
  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Faz as duas buscas em paralelo para mais eficiência
        const [userData, fornecedoresData] = await Promise.all([
          getOneUser(id),
          getFornecedores()
        ]);

        // Preenche o formulário com os dados do usuário que vieram da API
        setFormData({
          nome: userData.nome,
          email: userData.email,
          role: userData.role,
          // Garante que o fornecedorId seja uma string para o <select>
          fornecedorId: userData.fornecedorId ? String(userData.fornecedorId) : ''
        });

        setFornecedores(fornecedoresData);

      } catch (error) {
        toast.error('Não foi possível carregar os dados para edição.');
        navigate('/configuracao'); // Se der erro, volta para a lista
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, [id, navigate]); // Roda sempre que o ID na URL mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepara os dados para o envio (sem a senha, a não ser que seja alterada)
      const userData = {
        nome: formData.nome,
        email: formData.email,
        role: formData.role,
        fornecedorId: formData.role === 'Fornecedor' ? Number(formData.fornecedorId) : null,
      };

      await updateUser(id, userData); // Chama a API de atualização
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
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            
            {/* O campo de senha pode ser adicionado aqui, mas geralmente é separado */}
            
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