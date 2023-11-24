import { ICustomerBio, ICustomerCard } from "@/types/customer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [] as ICustomerBio[],
  customer: {} as ICustomerBio,
  customerCard: {} as ICustomerCard,
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
    setCustomerCard: (state, action: PayloadAction<ICustomerCard>) => {
      state.customerCard = action.payload;
    },
    setCustomerBookings: (state, action: PayloadAction<any[]>) => {
      state.customerBookings = action.payload;
    },
    setCustomerStatus: (state, action: PayloadAction<string>) => {
      state.customerStatus = action.payload;
    },
  },
});

export const { setCustomers, setCustomer,setCustomerCard, setCustomerBookings, setCustomerStatus } =
  customer_slice.actions;
export default customer_slice.reducer
