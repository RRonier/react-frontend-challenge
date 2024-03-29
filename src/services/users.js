import { API } from "../API.js";

export const getUsers = async (token) => await API.get('/users', {
    headers: { 'x-access-token': token }
})

export const deleteUser = async (id, token) => await API.delete(`/users/${id}`, {
    headers: { 'x-access-token': token }
})

export const addUser = async (name, email, roles, token) => await API.post('/users', {
    name,
    email,
    roles
}, { headers: { 'x-access-token': token } })

export const editUser = async (id, name, email, roles, token) => await API.put(`/users/${id}`, {
    id,
    name,
    email,
    roles
}, { headers: { 'x-access-token': token } })