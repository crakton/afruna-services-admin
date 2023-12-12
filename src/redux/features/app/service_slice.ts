import {
  IService,
  IServiceCategory,
  IServiceSubCategory,
} from "@/interfaces/IService";
import { ExtFile } from "@files-ui/react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
  topServices: [] as IService[],
  services: [] as IService[],
  pendingServices: [] as IService[],
  blockedServices: [] as IService[],
  unpublishedServices: [] as IService[],
  verifiedServices: [] as IService[],
  service: {} as IService,
  serviceCategories: [] as IServiceCategory[],
  subCategories: [] as IServiceSubCategory[],
  catId: "" as string,
  catName: "" as string,
  catIcon: [] as any[] | [],
};

const serviceSlice = createSlice({
  name: "Service_Slice",
  initialState,
  reducers: {
    setCatId: (state, action: PayloadAction<string>) => {
      state.catId = action.payload;
    },
    setCatName: (state, action: PayloadAction<string>) => {
      state.catName = action.payload;
    },
    setCatIcon: (state, action: PayloadAction<ExtFile[] | []>) => {
      state.catIcon = action.payload;
    },
    setTopServices: (state, action: PayloadAction<IService[]>) => {
      state.topServices = action.payload;
    },
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
  setCatId,
  setCatIcon,
  setCatName,
  setServices,
  setTopServices,
  setCategories,
  setSubCategories,
  createService,
  setPendingServices,
  setBlockedServices,
  setUnpublishedServices,
  setVerifiedServices,
} = serviceSlice.actions;
export default serviceSlice.reducer;
