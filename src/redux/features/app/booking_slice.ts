import { T_Bookings } from "@/types/bookings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    bookings: [] as T_Bookings[],
    pendingBookings: [] as T_Bookings[],
    inProgreessBookings: [] as T_Bookings[],
    completedBookings: [] as T_Bookings[],
    canceledBookings: [] as T_Bookings[],
    recentBookings: [] as T_Bookings[],
}

const booking_slice = createSlice({
    name: 'Booking_Slice',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.bookings = action.payload
        },
        setPendingBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.pendingBookings = action.payload
        },
        setInProgreessBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.inProgreessBookings = action.payload
        },
        setCanceledBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.canceledBookings = action.payload
        },
        setCompletedBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.completedBookings = action.payload
        },
        setRecentBookings: (state, action: PayloadAction<T_Bookings[]>) => {
            state.recentBookings = action.payload
        }
    }
})

export const { setBookings, setRecentBookings,setPendingBookings,setCompletedBookings, setCanceledBookings,setInProgreessBookings } = booking_slice.actions
export default booking_slice.reducer
