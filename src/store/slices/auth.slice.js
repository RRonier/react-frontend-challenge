import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API } from '../../API';

export const login = createAsyncThunk(
    'users/login',
    async (userData) => {
        const { user, password } = userData
        const { data } = await API.post("login", { user, password });

        return data;
    }
);

export const logout = createAction('users/logout');

export const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, loading: null, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.token = null;
                state.user = null;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Access Denied! Invalid Credentials";
                } else {
                    state.error = action.error.message;
                }
            });
    },
});

export default authSlice.reducer;