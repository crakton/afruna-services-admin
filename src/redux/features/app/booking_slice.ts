import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    bookings: [] as any
}

const booking_slice = createSlice({
    name: 'Booking_Slice',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<any[]>) => {
            state.bookings = action.payload
        }
    }
})

export const { setBookings } = booking_slice.actions
export default booking_slice.reducer
