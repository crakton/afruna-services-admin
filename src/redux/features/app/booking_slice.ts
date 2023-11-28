import { T_Bookings } from "@/types/bookings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    bookings: [] as T_Bookings[],
    recentBookings: [] as T_Bookings[],
}

const booking_slice = createSlice({
    name: 'Booking_Slice',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.bookings = action.payload
        },
        setRecentBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.recentBookings = action.payload
        }
    }
})

export const { setBookings, setRecentBookings } = booking_slice.actions
export default booking_slice.reducer
