import { ICustomerBio } from "@/types/customer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [] as ICustomerBio[],
  customer: {} as ICustomerBio,
  customerBookings: [] as any[],
  customerStatus: "all",
};

const customer_slice = createSlice({
  name: "Customer_Slice",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<ICustomerBio[]>) => {
      state.customers = action.payload;
    },
    setCustomer: (state, action: PayloadAction<ICustomerBio>) => {
      state.customer = action.payload;
    },
    setCustomerBookings: (state, action: PayloadAction<any[]>) => {
      state.customerBookings = action.payload;
    },
    setCustomerStatus: (state, action: PayloadAction<string>) => {
      state.customerStatus = action.payload;
    },
  },
});

export const { setCustomers, setCustomer, setCustomerBookings, setCustomerStatus } =
  customer_slice.actions;
export default customer_slice.reducer
