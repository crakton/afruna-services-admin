import { headers } from "@/constants/http_config";
import {
  IService,
  IServiceCategory,
  IServiceSubCategory,
} from "@/interfaces/IService";
import { setLoading } from "@/redux/features/app/loading_slice";
import {
  createService,
  setCategories,
  setServices,
  setSubCategories,
} from "@/redux/features/app/service_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { T_loading_provider } from "@/types/loader.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class Service {
  private store: TStore;

  constructor() {
    this.store = store;
  }

  async getServices() {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<IService[]>>(
        "/api/services",
        headers
      );
      store.dispatch(setServices(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async getCategories() {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<IServiceCategory[]>>(
        "/api/servicecategories",
        headers
      );
      store.dispatch(setCategories(data.data));
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async verifyService(serviceId: string) {
    try {
      const { data } = await axios.put<TSuccessResponse<IServiceCategory>>(
        `/api/services/${serviceId}/verify`,
        headers
      );
      return data.data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
  async blockService(serviceId: string) {
    try {
      const { data } = await axios.put<TSuccessResponse<IServiceCategory>>(
        `/api/admin/block/${serviceId}/service`,
        headers
      );
      return data.data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }
  async getCategoriesforCreation() {
    try {
      const { data } = await axios.get<TSuccessResponse<IServiceCategory[]>>(
        "/api/servicecategories",
        headers
      );
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

  async getSubCategories(categoryId: string) {
    try {
      const { data } = await axios.get<TSuccessResponse<IServiceSubCategory[]>>(
        `/api/servicecategories/${categoryId}/nested`,
        headers
      );
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

  async createCategory(category: any, loading_opt: T_loading_provider) {
    const { setIsLoading } = loading_opt;
    setIsLoading && setIsLoading(true);

    try {
      const { data } = await axios.post<TSuccessResponse<IServiceCategory[]>>(
        "/api/servicecategories",
        category,
        headers
      );
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      setIsLoading && setIsLoading(false);
    }
  }

  async creatService(payload: any, loading_opt: T_loading_provider) {
    const { setIsLoading } = loading_opt;
    setIsLoading && setIsLoading(true);
    try {
      const { data } = await axios.post<TSuccessResponse<IService>>(
        "/api/services",
        payload,
        headers
      );
      store.dispatch(createService(data.data));
      toast.success("Service listing successful");
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      setIsLoading && setIsLoading(false);
    }
  }
}
