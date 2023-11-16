import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false
}

const loading_slice = createSlice({
    name: 'loading_Slice',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { setLoading } = loading_slice.actions
export default loading_slice.reducer
