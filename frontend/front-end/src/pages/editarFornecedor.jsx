
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFornecedorById, updateFornecedor, deleteFornecedor } from '../services/apifornecedores';
import FornecedorForm from '../components/FornecedorForm';
//import '../css/editarfornecedor.css';
import '../css/app.css';


const EditarFornecedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFornecedorById(id)
      .then(data => setFornecedor(data))
      .catch(() => toast.error('Não foi possível carregar os dados do fornecedor.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateFornecedor(id, formData);
      toast.success('Fornecedor atualizado com sucesso!');
      navigate('/fornecedor/listar');
    } catch (error) {
      toast.error(`Falha na atualização: ${error.message}`);
    }
  };
  
  const handleDelete = async () => {
    const isConfirmed = window.confirm(`Tem certeza que deseja excluir o fornecedor "${fornecedor?.nome}"?`);
    if (isConfirmed) {

      try {
        await deleteFornecedor(id);
        toast.success('Fornecedor excluído com sucesso!');
        navigate('/fornecedor/listar');
      } catch (error) {
        toast.error(`Não foi possível excluir: ${error.message}`);
      }
      
    }
  };

  if (loading) return <div className="feedback-container"><div className="loading-spinner"></div></div>;

  return (
    <div className="container-cadastro">
      <header className="page-header">
        <h1 className="page-title">EDITAR FORNECEDOR</h1>
      </header>
      
      <FornecedorForm 
        onSubmit={handleUpdate} 
        initialData={fornecedor}
        isEditing={true}
        onDelete={handleDelete} // Passamos a função de deletar para o formulário
      />
    </div>
  );
};

export default EditarFornecedor;