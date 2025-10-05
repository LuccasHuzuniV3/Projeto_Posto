
import React, { useState, useEffect } from 'react';
import FornecedorCard from '../components/fornecedorcard';
import { FaPlus } from 'react-icons/fa';
import '../css/app.css';
import { useNavigate } from 'react-router-dom';
import { getFornecedores } from '../services/apiFornecedor'; 

const ListaFornecedores = () => {

  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const data = await getFornecedores();
        setFornecedores(data);
      } catch (err) {
        console.error("Erro ao buscar fornecedores:", err);
        setError("Não foi possível carregar os fornecedores.");
      } finally {
        setLoading(false);
      }
    };
    fetchFornecedores();
  }, []);

 const handleNovoFornecedor = () => {
    navigate('/fornecedores/cadastrar');
  }
  // Se estiver carregando, exibe o novo spinner
  if (loading) {
    return (
      <div className="feedback-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Se houver um erro, exibe a mensagem de erro
  if (error) {
    return <div className="feedback-container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="container-fornecedores">
      <header className="page-header">
        <div>
          <h1 className="page-title">LISTA DE FORNECEDORES</h1>
          <p className="page-subtitle">
            Atualmente temos {fornecedores.length} fornecedores cadastrados.
          </p>
        </div>
        <button className="add-button" onClick={handleNovoFornecedor}>
          <FaPlus />
          Novo Fornecedor
        </button>
      </header>
      
      <main>
        {/* Se não houver fornecedores, exibe uma mensagem amigável */}
        {fornecedores.length === 0 ? (
          <p>Nenhum fornecedor cadastrado ainda.</p>
        ) : (
          <div className="grid-container">
            {fornecedores.map((fornecedor) => (
              <FornecedorCard key={fornecedor.id} fornecedor={fornecedor} />
            ))}
          </div>
        )}
      </main>
    </div>
  );

};

export default ListaFornecedores;