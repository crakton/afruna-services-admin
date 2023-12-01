import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type T_Cards = {
  totalEarnings: number;
  totalProviders: number;
  totalUsers: number;
  totalServices: number;
};
export type T_Dashboard_Stats = {
  _id: string;
  status: string;
  percentage: number;
};

const initialState = {
  cards: {
    totalEarnings: 0,
    totalProviders: 0,
    totalUsers: 0,
    totalServices: 0,
  } as T_Cards,
  statistics: [] as T_Dashboard_Stats[],
  bookingsSummary: [] as any[],
};

const Dashboard_slice = createSlice({
  name: "Card_Slice",
  initialState,
  reducers: {
    setDashboardCards: (state, action: PayloadAction<T_Cards>) => {
      state.cards = action.payload;
    },
    setBookingsSummary: (state, action: PayloadAction<any[]>) => {
      state.bookingsSummary = action.payload;
    },
    setDashboardStats: (state, action: PayloadAction<T_Dashboard_Stats[]>) => {
      state.statistics = action.payload;
    },
  },
});

export const { setDashboardCards,setDashboardStats,setBookingsSummary } = Dashboard_slice.actions
export default Dashboard_slice.reducer
