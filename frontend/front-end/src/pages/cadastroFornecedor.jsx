import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFornecedor } from '../services/apiFornecedor'; // Importamos a função da API
import FornecedorForm from '../components/FornecedorForm';
import '../css/app.css';

const CadastroFornecedor = () => {
  const navigate = useNavigate();

  // Esta função define O QUE FAZER com os dados quando o form for enviado
  const handleCreate = async (formData) => {
    try {
      // Preparamos os dados para o envio, incluindo o Status
      const dataToSend = { ...formData, Status: true };
  
      await createFornecedor(dataToSend); // Chamamos a função centralizada da API

      toast.success('Fornecedor cadastrado com sucesso!');

      navigate('/fornecedor/listar');
    } catch (error) {
      console.error('Falha no cadastro:', error);
      toast.error(`Não foi possível cadastrar: ${error.message}`);
    }
  };

  return (
    <div className="container-cadastro">
      <header className="page-header">
        <div>
          <h1 className="page-title">CADASTRAR FORNECEDOR</h1>
        </div>
      </header>
      <FornecedorForm onSubmit={handleCreate} />
    </div>
  );
};

export default CadastroFornecedor;