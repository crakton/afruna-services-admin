"use client"

import { configureStore } from "@reduxjs/toolkit"
import serviceReducer from './features/app/service_slice'
import authReducer from './features/auth/auth_slice'
import tableStatusReducer from './features/app/table_status_slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer,
        tableStatus: tableStatusReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type TStore = typeof store
