
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FornecedorForm = ({ initialData, onSubmit, isEditing = false, onDelete }) => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '', cnpj: '', email: '', telefone: '', endereco: '', Status: true
  });
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Se recebermos dados iniciais, atualizamos o formulário
    if (initialData) {
      // Garantimos que todos os campos esperados existam para evitar erros
      setFormData({
        nome: initialData.nome || '',
        cnpj: initialData.cnpj || '',
        email: initialData.email || '',
        telefone: initialData.telefone || '',
        endereco: initialData.endereco || '',
        Status: initialData.Status === false ? false : true, // Trata o status explicitamente
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleStatusChange = (newStatus) => {
    setFormData(prevState => ({ ...prevState, Status: newStatus }));
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-cadastro">
      <div className="form-grid">
        {/* Coluna da Esquerda */}
        <div className="form-column">
          <div className="form-section">
            <h2 className="section-title">Dados Principais</h2>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            
            <label htmlFor="cnpj">CNPJ:</label>
            <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} required />
          </div>
        </div>
        {/* Coluna da Direita */}
        <div className="form-column">
          <div className="form-section">
            <h2 className="section-title">Contato</h2>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
            
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* --- BOTÕES DE AÇÃO UNIFICADOS AQUI --- */}
      <div className={isEditing ? "form-actions-edit" : "form-actions"}>
        {isEditing && (
          <div className="status-dropdown">
            <button type="button" className={`status-button ${formData.Status ? 'ativo' : 'inativo'}`} onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {formData.Status ? 'Ativo' : 'Inativo'}
              <span>&#9660;</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div onClick={() => handleStatusChange(true)}>Ativar</div>
                <div onClick={() => handleStatusChange(false)}>Inativar</div>
              </div>
            )}
          </div>
        )}

        <div className="action-buttons">
          {isEditing && (
             <button type="button" className="delete-button" onClick={onDelete}>
                Excluir
             </button>
          )}
          <button type="button" className="cancel-button" onClick={() => navigate('/fornecedor/listar')}>
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            {isEditing ? 'Salvar Alterações' : 'Salvar'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FornecedorForm;