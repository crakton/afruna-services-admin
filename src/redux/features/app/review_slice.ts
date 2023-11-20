import { T_Service_Review } from "@/types/review"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    reviews: [] as T_Service_Review[]
}

const review_slice = createSlice({
    name: 'Reviews_Slice',
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<T_Service_Review[]>) => {
            state.reviews = action.payload
        }
    }
})

export const { setReviews } = review_slice.actions
export default review_slice.reducer
