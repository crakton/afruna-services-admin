import { IService } from "@/interfaces/IService"
import { T_Providers } from "@/types/providers"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    topProviders: [] as T_Providers[],
    providers: [] as T_Providers[],
    provider: {} as any,
    providerService: [] as IService[],
    providerBookings: [] as any[]
}

const provider_slice = createSlice({
    name: 'Provider_Slice',
    initialState,
    reducers: {
        setTopProviders: (state, action: PayloadAction<T_Providers[]>) => {
            state.topProviders = action.payload
        },
        setProviders: (state, action: PayloadAction<any[]>) => {
            state.providers = action.payload
        },
        setProvider: (state, action: PayloadAction<any>) => {
            state.provider = action.payload
        },
        setProviderServices: (state, action: PayloadAction<IService[]>) => {
            state.providerService = action.payload
        },
        setProviderBookings: (state, action: PayloadAction<any[]>) => {
            state.providerBookings = action.payload
        },
    }
})

export const { setProviders, setProvider,setTopProviders, setProviderServices, setProviderBookings } = provider_slice.actions
export default provider_slice.reducer
