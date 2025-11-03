import React from 'react';

// Este é o seu componente de página "Mensal"
const Mensal = () => {
  // const idDaPaginaMensal = "ReportSection5c9310a2bd8b93b26b97"; // <-- REMOVI ISSO, ESTAVA ERRADO!

  return (
    <div style={{ padding: '20px' }}>
      <h2>Relatório Mensal</h2>
      <p>Abaixo está o relatório interativo do Power BI.</p>

      {/* Mestre, entendi o problema! 
        Sua imagem 'image_a16d04.png' mostra que o "1 de 3" continua.
        O parâmetro 'pageName' que eu adicionei estava errado para esse tipo de link.
        
        TENTE ISSO: Removi o 'pageName' e deixei SÓ o '&navContentPaneEnabled=false'.
        Isso deve carregar a primeira página (Mensal) e ESCONDER a barra "1 de 3".
      */}
      <iframe
        title="Calendario - Mensal"
        width="100%"
        height="800"
        src={`https://app.powerbi.com/view?r=eyJrIjoiZTRlMzBmYzctMjNiMi00ZjdmLWEzMWQtYmNlYmNhZWMxODQ4IiwidCI6IjRiMTVjMDUzLWE3YjUtNGE4Yi1hOTc4LWFkYzFhZjlmMzExMyJ9`}
        frameBorder="0"
        allowFullScreen="true"
      ></iframe>

    </div>
  );
};

export default Mensal;

