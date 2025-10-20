// src/components/CompraCard.jsx

import React from 'react';
import '../css/compracard.css'; // Vamos criar este CSS

const CompraCard = ({ compra }) => {
  // Função para formatar a data
  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="compra-card">
      <div className="card-header">
        <h3 className="compra-titulo">
          {compra.preco.combustivel.tipo} - <span>{compra.preco.fornecedor.nome}</span>
        </h3>
        <span className="compra-data">{formatarData(compra.dataCompra)}</span>
      </div>
      <div className="card-body">
        <div className="detalhe-item">
          <span>Quantidade:</span>
          <strong>{compra.quantidade.toLocaleString('pt-BR')} L</strong>
        </div>
        <div className="detalhe-item">
          <span>Preço Unitário:</span>
          <strong>R$ {compra.preco.valor.toFixed(4)}</strong>
        </div>
        <div className="detalhe-item total">
          <span>Custo Total:</span>
          <strong>R$ {compra.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
      </div>
    </div>
  );
};

export default CompraCard;