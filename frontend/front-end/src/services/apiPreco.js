const BASE_URL = 'http://localhost:5000';


//Busca a lista completa de precos.
export const getPreco = async () => {
  const response = await fetch(`${BASE_URL}/preco`,{
     credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Erro ao buscar precos.');
  }
  
  return await response.json();
};


//Busca um preco específico pelo ID.
export const getPrecoById = async (id) => {
  const response = await fetch(`${BASE_URL}/preco/${id}`,{
     credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Preco não encontrado.');
  }

  return await response.json();
};

//Cria um preco
export const createPreco = async(precoData) => {

    const response = await fetch(`${BASE_URL}/preco`,{
       credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(precoData),
      });
    
    if (!response.ok) {
    throw new Error('Erro ao criar preco');
    }

    return await response.json();
}

//Atualiza o preco
export const updatePreco = async(id,precoData) => {
    const response = await fetch(`${BASE_URL}/preco/${id}`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(precoData)
    });

    if (!response.ok) {
    throw new Error('Erro ao editar preco');
    }

    return await response.json()
}

//Deleta o preco
export const deletePreco = async(id) => {

     const response = await fetch(`${BASE_URL}/preco/${id}`,{
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
    throw new Error('Erro ao excluir preco');
    }

    return true
}

//Pegando o preco mais recente
export const getPrecoAtual = async (fornecedorId, combustivelId) => {
  const response = await fetch(`${BASE_URL}/preco/atual?fornecedorId=${fornecedorId}&combustivelId=${combustivelId}`,{
     credentials: 'include'
  });
  
  if (response.status === 404) {
    return null; // Retorna nulo se não houver um preço cadastrado
  }

  if (!response.ok) {
    throw new Error('Erro ao buscar o preço atual.');
  }
  
  return await response.json();
};