import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/redux/components/auth"
import tokenReducer from "@/redux/components/token"

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer
    },
})
