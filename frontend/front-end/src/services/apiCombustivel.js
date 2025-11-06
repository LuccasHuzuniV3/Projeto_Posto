
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//Busca a lista completa de Combustivel.
export const getCombustivel = async () => {
  const response = await fetch(`${BASE_URL}/combustivel`,{
     credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Erro ao buscar combustivel.');
  }
  
  return await response.json();
};


//Busca um combustivel específico pelo ID.
export const getCombustivelById = async (id) => {
  const response = await fetch(`${BASE_URL}/combustivel/${id}`,{
     credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('combustivel não encontrado.');
  }

  return await response.json();
};

//Cria um fornecedor
export const createCombustivel = async(combusivelData) => {

    const response = await fetch(`${BASE_URL}/combustivel`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combusivelData),
      });
    
    if (!response.ok) {
    throw new Error('Erro ao criar combustivel');
    }

    return await response.json();
}

//Atualiza o combustivel
export const updateCombustivel = async(id,combusivelData) => {
    const response = await fetch(`${BASE_URL}/combustivel/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(combusivelData)
    });

    if (!response.ok) {
    throw new Error('Erro ao editar combustivel');
    }

    return await response.json()
}

//Deleta o combustivel
export const deleteCombustivel = async(id) => {

     const response = await fetch(`${BASE_URL}/combustivel/${id}`,{
        method: 'DELETE',
    });

    if (!response.ok) {
    throw new Error('Erro ao excluir combustivel');
    }

    return true
}