const BASE_URL = 'http://localhost:5000'



//Busca Usuarios
export const getUsers = async() =>{
    const response = await fetch(`${BASE_URL}/user`)

    if(!response.ok){
        throw new Error("Não foi possivel buscar usuarios!")
    }

    return await response.json()
}

//Busca um usuario
export const getOneUser = async(id) =>{
    const response = await fetch(`${BASE_URL}/user/${id}`)

    if(!response.ok){
        throw new Error("Nao foi possivel acha este usuario!")
    }

    return await response.json()
}

//Adicionando um usuario
export const createUser = async(userData) => {
    const response = await fetch(`${BASE_URL}/register`,{
        method:'POST',
        headers:{
             'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    if(!response.ok){
        throw new Error("Nao foi possivel criar um usuario!")
    }

    return await response.json()

}

//Atualizando um usuario
export const updateUser = async(id,userData) =>{
       const response = await fetch(`${BASE_URL}/user/${id}`,{
        method:'PUT',
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
    });

    if (!response.ok) {
    throw new Error('Erro ao excluir usuario');
    }

    return true
}