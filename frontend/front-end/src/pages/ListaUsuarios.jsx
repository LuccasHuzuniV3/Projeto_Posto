
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getUsers } from '../services/apiConfiguracao'; // Importando a função da API
import '../css/listauser.css'


const ListaUsuarios = () => {
  const navigate = useNavigate();
  
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para buscar os usuários quando a página carregar
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data);
      } catch (err) {
        setError('Não foi possível carregar a lista de usuários.');
        toast.error('Não foi possível carregar a lista de usuários.');
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []); // O array vazio [] garante que a busca seja feita apenas uma vez

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  if (error) {
    return <div className="feedback-container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="container-fornecedores"> {/* Reutilizando o estilo do container */}
      <header className="page-header">
        <div>
          <h1 className="page-title">GERENCIAR USUÁRIOS</h1>
          <p className="page-subtitle">Crie e gerencie os usuários do sistema.</p>
        </div>
        <button className="add-button" onClick={() => navigate('/usuarios/criar')}>
          <FaPlus />
          Novo Usuário
        </button>
      </header>
      
      <main>
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Papel (Role)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.email}</td>
                <td>{usuario.role}</td>
                <td>
                  <button className="edit-button-table" onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListaUsuarios;