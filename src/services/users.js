import {API} from "../API.js";

const config = {
    headers: {
        'x-access-token': `Bearer ${localStorage.getItem('token')}`
    }
}

export const getUsers = async () => await API.get('/users', config)

export const deleteUser = async (id) => await API.delete(`/users/${id}`, config)

export const addUser = async (name, email, roles) => await API.put('/users', {
    name,
    email,
    roles
}, config)