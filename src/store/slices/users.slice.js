import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUser, deleteUser, getUsers, editUser } from "../../services/users.js";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (token) => {
        const { data } = await getUsers(token);
        return data;
    }
)

export const removeUser = createAsyncThunk(
    'users/deleteUser',
    async (values) => {
        const { data } = await deleteUser(values.id, values.token)

        return data
    })

export const createUser = createAsyncThunk(
    'users/createUser',
    async (values) => {
        const { name, email, roles, token } = values

        return await addUser(
            name,
            email,
            roles,
            token
        )
    })

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (values) => {
        const { name, email, roles, id, token } = values;

        return await editUser(
            id,
            name,
            email,
            roles,
            token
        );
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: { entities: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = state.entities.filter((user) => user.id !== action.payload.id);
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = [...state.entities, action.payload.data]
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.entities.findIndex((user) => user.id === action.payload.data.id);
                if (index !== -1) {
                    state.entities[index] = action.payload.data;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = "there's an error";
            });
    },
});

export default usersSlice.reducer;