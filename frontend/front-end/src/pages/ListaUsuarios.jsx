import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getUsers, deleteUser } from '../services/apiConfiguracao';
import '../css/listauser.css';

const ListaUsuarios = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar lista ao iniciar
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
  }, []);

  // Função para excluir
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deleteUser(id);
      toast.success("Usuário excluído com sucesso!");

      // Remove da lista sem recarregar
      setUsuarios((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      toast.error("Erro ao excluir usuário.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="feedback-container"><div className="loading-spinner"></div></div>;
  }

  if (error) {
    return <div className="feedback-container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="container-fornecedores">
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
                <td className="action-buttons">
                  <button
                    className="edit-button-table"
                    onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="delete-button-table"
                    onClick={() => handleDelete(usuario.id)}
                    style={{ marginLeft: '10px', backgroundColor: '#d9534f', color: '#fff' }}
                  >
                    Excluir
                  </button>
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
