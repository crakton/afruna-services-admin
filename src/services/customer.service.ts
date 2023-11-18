import axios, { AxiosError } from "axios";
import { TStore, store } from "../redux/store";
import { TErrorResponse, TSuccessResponse } from "../types/auth.types";
import { headers } from "../constants/http_config";

import { toast } from "react-toastify";
import { handleAuthErrors } from "../utils/auth.util";
import { T_loading_provider } from "../types/loader.types";
import { ICustomerBio } from "@/types/customer";
import { setCustomer, setCustomerBookings, setCustomers } from "@/redux/features/app/customer_slice";

export default class Customers {
  private store: TStore;

  constructor() {
    this.store = store;
  }

  async getAllCustomers() {
    try {
      const { data } = await axios.get<TSuccessResponse<ICustomerBio[]>>(
        "/api/admin/customers",
        headers
      );
      store.dispatch(setCustomers(data.data))
      return data.data
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
  async getCustomerBookings(customerId: string) {
    try {
      const { data } = await axios.get<TSuccessResponse<any[]>>(
        `/api/admin/customers/${customerId}`,
        headers
      );
      store.dispatch(setCustomerBookings(data.data))
      return data.data
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

}