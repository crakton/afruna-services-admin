import {
  IService,
  IServiceCategory,
  IServiceSubCategory,
} from "@/interfaces/IService";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [] as IService[],
  pendingServices: [] as IService[],
  blockedServices: [] as IService[],
  unpublishedServices: [] as IService[],
  verifiedServices: [] as IService[],
  service: {} as IService,
  serviceCategories: [] as IServiceCategory[],
  subCategories: [] as IServiceSubCategory[],
};

const serviceSlice = createSlice({
  name: "Service_Slice",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
    },
    setBlockedServices: (state, action: PayloadAction<IService[]>) => {
      state.blockedServices = action.payload;
    },
    setUnpublishedServices: (state, action: PayloadAction<IService[]>) => {
      state.unpublishedServices = action.payload;
    },
    setPendingServices: (state, action: PayloadAction<IService[]>) => {
      state.pendingServices = action.payload;
    },
    setVerifiedServices: (state, action: PayloadAction<IService[]>) => {
      state.verifiedServices = action.payload;
    },
    setCategories: (state, action: PayloadAction<IServiceCategory[]>) => {
      state.serviceCategories = action.payload;
    },
    setSubCategories: (state, action: PayloadAction<IServiceSubCategory[]>) => {
      state.subCategories = action.payload;
    },
    createService: (state, action: PayloadAction<IService>) => {
      state.services = [action.payload, ...state.services];
    },
  },
});

export const {
  setServices,
  setCategories,
  setSubCategories,
  createService,
  setPendingServices,
  setBlockedServices,
  setUnpublishedServices,
  setVerifiedServices,
} = serviceSlice.actions;
export default serviceSlice.reducer;
