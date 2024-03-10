import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginService} from "../../services/auth.js"; // Assuming you have an API module

export const login = createAsyncThunk(
    'users/login',
    async (userData) => {
        const {user, password} = userData
        const {data} = await loginService(user, password);
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user)

        return data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, loading: 'idle', error: null },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;