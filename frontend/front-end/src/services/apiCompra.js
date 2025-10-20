const BASE_URL = 'http://localhost:5000';


//Busca um compras específico pelo ID.
export const getComprasById = async (id) => {
  const response = await fetch(`${BASE_URL}/compras/${id}`,{
     credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('compras não encontrado.');
  }

  return await response.json();
};

//Cria um fornecedor
export const createCompra = async(comprasData) => {

    const response = await fetch(`${BASE_URL}/compras`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comprasData),
      });
    
    if (!response.ok) {
    throw new Error('Erro ao criar compras');
    }

    return await response.json();
}

//Atualiza o compras
export const updateCompras = async(id,comprasData) => {
    const response = await fetch(`${BASE_URL}/compras/${id}`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(comprasData)
    });

    if (!response.ok) {
    throw new Error('Erro ao editar compras');
    }

    return await response.json()
}

//Deleta o compras
export const deleteCompras = async(id) => {

     const response = await fetch(`${BASE_URL}/compras/${id}`,{
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
    throw new Error('Erro ao excluir compras');
    }

    return true
}

//Busca a lista de compras com dados.
export const getComprasCompleto = async () => {
  const response = await fetch(`${BASE_URL}/compras`,{ 
      credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar compras do fornecedor.');
  }
  return await response.json();

};
