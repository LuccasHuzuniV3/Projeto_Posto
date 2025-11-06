
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';



//Busca Usuarios
export const getUsers = async() =>{
    const response = await fetch(`${BASE_URL}/users`,{
        credentials: 'include'
    })

    if(!response.ok){
        throw new Error("Não foi possivel buscar usuarios!")
    }

    return await response.json()
}

//Busca um usuario
export const getOneUser = async(id) =>{
    const response = await fetch(`${BASE_URL}/user/${id}`,{
        credentials: 'include'
    })

    if(!response.ok){
        throw new Error("Nao foi possivel acha este usuario!")
    }

    return await response.json()
}

export const createUser = async (userData) => {
    // A rota correta é /user, protegida pelo admin
    console.log('Dados do usuário a serem enviados:', userData); // Log para depuração
    const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Não foi possível criar o usuário!");
    return await response.json();
}



//Atualizando um usuario
export const updateUser = async(id,userData) =>{
       const response = await fetch(`${BASE_URL}/user/${id}`,{
        method:'PUT',
        credentials: 'include',
        headers:{
             'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    if(!response.ok){
        throw new Error("Nao foi possivel atualizar um usuario!")
    }
    return await response.json()

}

//Deletar
export const deleteUser = async(id) => {

     const response = await fetch(`${BASE_URL}/user/${id}`,{
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
    throw new Error('Erro ao excluir usuario');
    }

    return true
}