import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  other_transactions: [] as any,
  bookings_transactions: [] as any,
  transactios_status: "Other Transactions" as string,
};

const transactions_slice = createSlice({
  name: "Transactions_slice",
  initialState,
  reducers: {
    setOtherTransactions: (state, action: PayloadAction<any[]>) => {
      state.other_transactions = action.payload;
    },
    setBookingsTransactions: (state, action: PayloadAction<any[]>) => {
      state.bookings_transactions = action.payload;
    },
    setTransactionsStatus: (state, action: PayloadAction<string>) => {
      state.transactios_status = action.payload;
    },
  },
});

export const { setOtherTransactions, setBookingsTransactions, setTransactionsStatus } =
  transactions_slice.actions;
export default transactions_slice.reducer;
