// src/components/FornecedorCard.jsx

import React from 'react';
import '../css/fornecedorcard.css';
import { useNavigate } from 'react-router-dom';

const FornecedorCard = ({ fornecedor }) => {

  const navigate = useNavigate(); // 2. INICIE O HOOK
  
 const handleEdit = () => {
    // Navega para a rota de edição, passando o ID do fornecedor
    navigate(`/fornecedores/editar/${fornecedor.id}`);
  };

  // LÓGICA CORRIGIDA PARA TRATAR O BOOLEANO
  let statusTexto;
  let statusClasse;

  // Verificamos se fornecedor.Status é explicitamente true ou false
  if (fornecedor.Status === true) {
    statusTexto = 'Ativo';
    statusClasse = 'ativo';
  } else if (fornecedor.Status === false) {
    statusTexto = 'Inativo';
    statusClasse = 'inativo';
  } else {
    // Caso o campo não exista (seja undefined ou null)
    statusTexto = 'Indefinido';
    statusClasse = 'indefinido';
  }

  return (
    <div className="fornecedor-card">
      <div className="card-header">
        {/* Usamos fornecedor.nome (minúsculo) conforme a API */}
        <h3 className="fornecedor-nome">{fornecedor.nome}</h3>
        <div className="card-actions">
          <span className={`status ${statusClasse}`}>
            {statusTexto}
          </span>
          <button className="edit-button" onClick={handleEdit}>
            Editar
          </button>
        </div>
      </div>
      <div className="card-body">
        {/* Verifique se os nomes dos campos aqui batem com a sua API */}
        <p><strong>CNPJ:</strong> {fornecedor.cnpj}</p>
        <p><strong>Endereço:</strong> {fornecedor.endereco}</p> {/* Exemplo, adicionei o endereço que vi na API */}
        <p><strong>Telefone:</strong> {fornecedor.telefone}</p>
      </div>
    </div>
  );
};

export default FornecedorCard;