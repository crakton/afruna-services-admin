import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    abuseReports: [] as any
}

const abuseReports_Slice = createSlice({
    name: 'AbuseReports_Slice',
    initialState,
    reducers: {
        setAbuseReports: (state, action: PayloadAction<any[]>) => {
            state.abuseReports = action.payload
        }
    }
})

export const { setAbuseReports } = abuseReports_Slice.actions
export default abuseReports_Slice.reducer
