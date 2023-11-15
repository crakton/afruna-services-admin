import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: 'all'
}

const tableStatusSlice = createSlice({
    name: 'Table_Status_Slice',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        }
    }
})

export const { setStatus } = tableStatusSlice.actions
export default tableStatusSlice.reducer