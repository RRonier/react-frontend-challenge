import {API} from "../API.js";

const config = {
    headers: {
        'x-access-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTcwOTgxMDg4NSwiZXhwIjoxNzA5ODE0NDg1fQ.XcoNIAVY1ne-0ObgCqKFFzdbVEpIo2n6XnAa85Uyavo'
    }
}

export const getUsers = async () => await API.get('/users', config)

export const deleteUser = async (id) => await API.delete(`/users/${id}`, config)

export const addUser = async (name, email, roles) => await API.put('/users', {
    name,
    email,
    roles
}, config)