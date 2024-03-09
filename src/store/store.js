import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth.slice.js"
import usersReducer from "./slices/users.slice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
    },
})