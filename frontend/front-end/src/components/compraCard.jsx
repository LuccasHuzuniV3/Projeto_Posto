// src/components/CompraCard.jsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import '../css/compracard.css'; 

const CompraCard = ({ compra, onDelete }) => {
  
  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="compra-card">
      <div className="compra-card-header">
        {/* Lado Esquerdo: Combustível - Fornecedor na mesma linha visual */}
        <div className="header-info">
          <div className="card-title-group">
            <span className="combustivel-destaque">{compra.preco.combustivel.tipo}</span>
            <span className="separator">-</span>
            <span className="fornecedor-light">{compra.preco.fornecedor.nome}</span>
          </div>
        </div>
        
        {/* Lado Direito: Data e Botão de Excluir */}
        <div className="header-actions">
            <span className="compra-data">{formatarData(compra.dataCompra)}</span>
            <button className="delete-icon-btn" onClick={onDelete} title="Excluir Compra">
                <FaTrash />
            </button>
        </div>
      </div>

      <div className="compra-card-body">
        <div className="info-item">
          <span>Quantidade</span>
          <strong>{compra.quantidade.toLocaleString('pt-BR')} L</strong>
        </div>
        
        <div className="info-item">
          <span>Preço Unit.</span>
          <strong>R$ {compra.preco.valor.toFixed(4)}</strong>
        </div>
        
        <div className="info-item total">
          <span>Custo Total</span>
          <strong>R$ {compra.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
      </div>
    </div>
  );
};

export default CompraCard;