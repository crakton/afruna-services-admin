import axios, { AxiosError } from "axios";
import { TStore, store } from "../redux/store";
import { TErrorResponse, TSuccessResponse } from "../types/auth.types";
import { headers } from "../constants/http_config";
import { handleAuthErrors } from "../utils/auth.util";
import { ICustomerBio, ICustomerCard } from "@/types/customer";
import {
  setCustomer,
  setCustomerBookings,
  setCustomerCard,
  setCustomers,
} from "@/redux/features/app/customer_slice";
import { setLoading } from "@/redux/features/app/loading_slice";
import { T_Bookings } from "@/types/bookings";
import { setTotalPages } from "@/redux/features/app/util_slice";

export default class Customers {
  private store: TStore;

  constructor() {
    this.store = store;
  }

  async getAllCustomers(page?: number) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<ICustomerBio[]>>(
        `/api/admin/customers?page=${page}`,
        headers
      );
      store.dispatch(setCustomers(data.data));
      store.dispatch(setTotalPages(data.totalPages))
      return data.data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }
  async getCustomersCard(customerId: string) {
    try {
      const { data } = await axios.get<TSuccessResponse<ICustomerCard>>(
        `/api/services/${customerId}/customer/cards`,
        headers
      );
      store.dispatch(setCustomerCard(data.data));
      return data.data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
  async getCustomerBookings(customerId: string) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<T_Bookings[]>>(
        `/api/admin/customers/${customerId}`,
        headers
      );
      store.dispatch(setCustomerBookings(data.data));
      return data.data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }
}
