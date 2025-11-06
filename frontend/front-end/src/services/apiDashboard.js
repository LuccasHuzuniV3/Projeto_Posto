
const BASE_URL = 'https://projeto-posto.onrender.com';


export const getDashboardStats = async () => {

  const response = await fetch(`${BASE_URL}/dashboard/fornecedor/count`, {
    credentials: 'include' 
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar os dados do dashboard.');
  }

  return await response.json();
};

export const getMelhoresPrecos = async () => {

  const response = await fetch(`${BASE_URL}/dashboard/melhoresprecos`, {
    credentials: 'include' 
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar os melhores preços do dashboard.');
  }
  
  return await response.json();
}

export const getUltimasCompras = async() => {

  const response = await fetch(`${BASE_URL}/dashboard/ultimascompras`,{
    credentials:'include'
  })

  if(!response.ok){
    throw new Error('Erro ao buscar as ultimas compras dashboard');
  }

  return await response.json();

}

export const getTotalComprasMes = async() => {

  const response = await fetch(`${BASE_URL}/dashboard/custo-total-mes`,{
    credentials:'include'
  })

  if(!response.ok){
    throw new Error('Erro ao buscar o total de compras do mes no dashboard');
  }
  return await response.json();

}