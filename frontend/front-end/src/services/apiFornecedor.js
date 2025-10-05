
const BASE_URL = 'http://localhost:5000';


//Busca a lista completa de fornecedores.
export const getFornecedores = async () => {
  const response = await fetch(`${BASE_URL}/fornecedor`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar fornecedores.');
  }
  
  return await response.json();
};


//Busca um fornecedor específico pelo ID.
export const getFornecedorById = async (id) => {
  const response = await fetch(`${BASE_URL}/fornecedor/${id}`);

  if (!response.ok) {
    throw new Error('Fornecedor não encontrado.');
  }

  return await response.json();
};

//Cria um fornecedor
export const createFornecedor = async(fornecedorData) => {

    const response = await fetch(`${BASE_URL}/fornecedor`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedorData),
      });
    
    if (!response.ok) {
    throw new Error('Erro ao criar fornecedor');
    }

    return await response.json();
}

//Atualiza o fornecedor
export const updateFornecedor = async(id,fornecedorData) => {
    const response = await fetch(`${BASE_URL}/fornecedor/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(fornecedorData)
    });

    if (!response.ok) {
    throw new Error('Erro ao editar fornecedor');
    }

    return await response.json()
}

//Deleta o fornecedor
export const deleteFornecedor = async(id) => {

     const response = await fetch(`${BASE_URL}/fornecedor/delete/${id}`,{
        method: 'DELETE',
    });

    if (!response.ok) {
    throw new Error('Erro ao excluir fornecedor');
    }

    return true
}