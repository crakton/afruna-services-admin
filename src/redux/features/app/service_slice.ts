import { IService } from "@/interfaces/IService"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    services: [] as IService[],
    service: {} as IService,
    serviceCategories: [] as any[]
}

const serviceSlice = createSlice({
    name: 'Service_Slice',
    initialState,
    reducers: {
        setServices: (state, action: PayloadAction<IService[]>) => {
            state.services = action.payload
        }
    }
})

export const { setServices } = serviceSlice.actions
export default serviceSlice.reducer
