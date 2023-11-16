import axios, { AxiosError } from "axios";
import { TStore, store } from "../redux/store";
import { TErrorResponse, TSuccessResponse } from "../types/auth.types";
import { headers } from "../constants/http_config";

import { toast } from "react-toastify";
import { handleAuthErrors } from "../utils/auth.util";
import { T_loading_provider } from "../types/loader.types";
import { ICustomerBio } from "@/types/customer";
import { setCustomer, setCustomers } from "@/redux/features/app/customer_slice";

export default class Customers {
  private store: TStore;

  constructor() {
    this.store = store;
  }

  async getAllCustomers() {
    try {
      const { data } = await axios.get<TSuccessResponse<ICustomerBio[]>>(
        "/api/users",
        headers
      );
      store.dispatch(setCustomers(data.data))
      return data.data
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
  async getCustomer(customerId: string) {
    try {
      const { data } = await axios.get<TSuccessResponse<ICustomerBio>>(
        `/api/users/${customerId}`,
        headers
      );
      store.dispatch(setCustomer(data.data))
      return data.data
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

}
