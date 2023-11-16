import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    reviews: [] as any
}

const review_slice = createSlice({
    name: 'Reviews_Slice',
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<any[]>) => {
            state.reviews = action.payload
        }
    }
})

export const { setReviews } = review_slice.actions
export default review_slice.reducer
