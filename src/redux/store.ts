"use client"

import { configureStore } from "@reduxjs/toolkit"
import serviceReducer from './features/app/service_slice'
import authReducer from './features/auth/auth_slice'
import tableStatusReducer from './features/app/table_status_slice'
import bookingReducer from './features/app/booking_slice'
import providerReducer from './features/app/provider_slice'
import customerReducer from "./features/app/customer_slice";
import reviewReeducer from "./features/app/review_slice";
import loadingReeducer from "./features/app/loading_slice";
import abuseReportsReducer from "./features/app/abuseReport_slice";
import chatReducer from "./features/app/chat_slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer,
        booking: bookingReducer,
        tableStatus: tableStatusReducer,
        provider: providerReducer,
        customer: customerReducer,
        reviews: reviewReeducer,
        loading: loadingReeducer,
        abuseReports: abuseReportsReducer,
        chat: chatReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type TStore = typeof store
