import { headers } from "@/constants/http_config";
import {
  setProvider,
  setProviderBookings,
  setProviderServices,
  setProviders,
} from "@/redux/features/app/provider_slice";
import { setLoading } from "@/redux/features/app/loading_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { T_Providers } from "@/types/providers";
import { setTotalPages } from "@/redux/features/app/util_slice";

export default class Provider {
  store: TStore;

  constructor() {
    this.store = store;
  }

  async getProviders(page?: number) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<T_Providers[]>>(
        `/api/admin/providers?page=${page}`,
        headers
      );
      store.dispatch(setProviders(data.data));
      store.dispatch(setTotalPages(data.totalPages))
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async getProviderBookings(providerId: string) {
    try {
      const { data } = await axios.get<TSuccessResponse<any[]>>(
        `/api/admin/providers/${providerId}`,
        headers
      );
      store.dispatch(setProviderBookings(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

  async getProviderServices(providerId: string) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<any[]>>(
        `/api/services/${providerId}/provider`,
        headers
      );
      store.dispatch(setProviderServices(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }
}
