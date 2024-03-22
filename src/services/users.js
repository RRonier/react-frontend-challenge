import { API } from "../API.js";

export const getUsers = async (token) => await API.get('/users', {
    headers: {
        'x-access-token': `Bearer ${token}`
    }
})

export const deleteUser = async (id, token) => await API.delete(`/users/${id}`, {
    headers: {
        'x-access-token': `Bearer ${token}`
    }
})

export const addUser = async (name, email, roles, token) => await API.post('/users', {
    name,
    email,
    roles
}, {
    headers: {
        'x-access-token': `Bearer ${token}`
    }
})