import { IService, IServiceCategory, IServiceSubCategory } from "@/interfaces/IService"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    services: [] as IService[],
    service: {} as IService,
    serviceCategories: [] as IServiceCategory[],
    subCategories: [] as IServiceSubCategory[]
}

const serviceSlice = createSlice({
    name: 'Service_Slice',
    initialState,
    reducers: {
        setServices: (state, action: PayloadAction<IService[]>) => {
            state.services = action.payload
        },
        setCategories: (state, action: PayloadAction<IServiceCategory[]>) => {
            state.serviceCategories = action.payload
        },
        setSubCategories: (state, action: PayloadAction<IServiceSubCategory[]>) => {
            state.subCategories = action.payload
        }
    }
})

export const { setServices, setCategories, setSubCategories } = serviceSlice.actions
export default serviceSlice.reducer
