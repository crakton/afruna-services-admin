import { headers } from "@/constants/http_config";
import { IService } from "@/interfaces/IService";
import { setRecentBookings } from "@/redux/features/app/booking_slice";
import { T_Cards, T_Dashboard_Stats, setBookingsSummary, setDashboardCards, setDashboardStats } from "@/redux/features/app/dashboard_slice";
import { setLoading } from "@/redux/features/app/loading_slice";
import { setTopProviders } from "@/redux/features/app/provider_slice";
import { setTopServices } from "@/redux/features/app/service_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { T_Providers } from "@/types/providers";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";

export default class Dashboard {
  private store: TStore;

  constructor() {
    this.store = store;
  }

  async getDashboardCards() {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<T_Cards>>(
        "/api/admin/service/cards/dashboard",
        headers
      );
      store.dispatch(setDashboardCards(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false))
    }
  }
  async getBookingsSummary() {
    try {
      const { data } = await axios.get<TSuccessResponse<any[]>>(
        "/api/admin/chart/bookingSummary",
        headers
      );
      store.dispatch(setBookingsSummary(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } 
  }
  async getDashboardStats() {
    try {
      const { data } = await axios.get<TSuccessResponse<T_Dashboard_Stats[]>>(
        "/api/admin/chart/bookingStatistics",
        headers
      );
      store.dispatch(setDashboardStats(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } 
  }
  async getTopServices() {
    try {
      const { data } = await axios.get<TSuccessResponse<IService[]>>(
        "/api/admin/table/topService",
        headers
      );
      store.dispatch(setTopServices(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
  async getTopProviders() {
    try {
      const { data } = await axios.get<TSuccessResponse<T_Providers[]>>(
        "/api/admin/table/topProvider",
        headers
      );
      store.dispatch(setTopProviders(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } 
  }

  async getRecentBookings() {
    try {
      const { data } = await axios.get<TSuccessResponse<any[]>>(
        "/api/bookings",
        headers
      );
      const recent = data.data.slice(0, 15);
      store.dispatch(setRecentBookings(recent));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
}

