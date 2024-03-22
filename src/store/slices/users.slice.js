import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addUser, deleteUser, getUsers} from "../../services/users.js";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (token) => {
        const {data} = await getUsers(token);
        return data;
    }
)

export const removeUser = createAsyncThunk(
    'users/deleteUser',
    async (id, token) => {
        const {data} = await deleteUser(id, token)
        return data
    })

export const createUser = createAsyncThunk(
    'users/createUser',
    async (values, token) => {
        const {name, email, roles} = values
        return await addUser(
            name,
            email,
            roles,
            token
        )
    })

const usersSlice = createSlice({
    name: 'users',
    initialState: { entities: [], loading: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.entities = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })
            .addCase(removeUser.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.entities = state.entities.filter((user) => user.id !== action.payload.id);
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })
            .addCase(createUser.pending, (state) => {
            state.loading = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.entities = [...state.entities, action.payload.data]
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;