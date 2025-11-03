import React from 'react';

const Fornecedor = () => {

  return (
    <div style={{ padding: '20px' }}>
      <h2>Relatório Ranking Fornecedores</h2>
      <p>Abaixo está o relatório interativo do Power BI.</p>

      <iframe
        title="Calendario - rankingFornecedor"
        width="100%"
        height="800"
        src={`https://app.powerbi.com/view?r=eyJrIjoiMzllZWJmZjYtNTJkMC00ZTFmLTgzODctMWYyMmJlNDk1NGVmIiwidCI6IjRiMTVjMDUzLWE3YjUtNGE4Yi1hOTc4LWFkYzFhZjlmMzExMyJ9`} // Usando o link corrigido
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Fornecedor;

