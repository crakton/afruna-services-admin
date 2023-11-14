"use client"

import { configureStore } from "@reduxjs/toolkit"
import serviceReducer from './features/app/service_slice'
import authReducer from './features/auth/auth_slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type TStore = typeof store
