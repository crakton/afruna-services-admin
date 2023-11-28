import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type T_Cards = {
  totalEarnings: number;
  totalProviders: number;
  totalUsers: number;
  totalServices: number;
};

const initialState = {
  cards: {
    totalEarnings: 0,
    totalProviders: 0,
    totalUsers: 0,
    totalServices: 0,
  } as T_Cards,
};

const Card_slice = createSlice({
  name: "Card_Slice",
  initialState,
  reducers: {
    setDashboardCards: (state, action: PayloadAction<T_Cards>) => {
      state.cards = action.payload;
    },
  },
});

export const { setDashboardCards } = Card_slice.actions;
export default Card_slice.reducer;
