import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    services: [] as any[],
    service: {} as any,
    serviceCategories: [] as any[]
}

const serviceSlice = createSlice({
    name: 'Service_Slice',
    initialState,
    reducers: {
        setService: (state, action: PayloadAction<any[]>) => {
            state.services = action.payload
        }
    }
})

export const { setService } = serviceSlice.actions
export default serviceSlice.reducer
