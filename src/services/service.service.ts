import { headers } from "@/constants/http_config";
import {
  IDeleteCategory,
  IService,
  IServiceCategory,
  IServiceSubCategory,
} from "@/interfaces/IService";
import { setLoading } from "@/redux/features/app/loading_slice";
import {
  createService,
  setCategories,
  setServices
} from "@/redux/features/app/service_slice";
import { setTotalPages } from "@/redux/features/app/util_slice";
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

  
  async getServices(page?: number) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<IService[]>>(
        `/api/services?page=${page}`,
        headers
      );
      store.dispatch(setServices(data.data));
      store.dispatch(setTotalPages(data.totalPages))
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async getCategories(page?: number) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.get<TSuccessResponse<IServiceCategory[]>>(
        `/api/servicecategories?page=${page}`,
        headers
      );
      store.dispatch(setCategories(data.data));
      store.dispatch(setTotalPages(data.totalPages))
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async verifyService(serviceId: string) {
    try {
      const { data } = await axios.put<TSuccessResponse<IServiceCategory>>(
        `/api/services/${serviceId}/verify`,null,
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
        `/api/admin/block/${serviceId}/service`,null,
        headers
      );
      this.getServices()
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

  async deleteCategory(_id:string) {
    try {
      const { data } = await axios.delete<TSuccessResponse<IDeleteCategory>>(
        `/api/servicecategories/${_id}`,
        headers
      );
      this.getCategories()
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

  async getSubCategories(categoryId: string) {
    try {
      const { data } = await axios.get<TSuccessResponse<IServiceSubCategory[]>>(
        `/api/servicecategories/${categoryId}/sub`,
        headers
      );
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  }

  async createCategory(category: any) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.post<TSuccessResponse<any>>(
        "/api/servicecategories",
        category,
        headers
      );
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
    }
  }
  async editCategory(payload: any, id: string) {
    store.dispatch(setLoading(true));
    try {
      const { data } = await axios.put<TSuccessResponse<any>>(
        `/api/servicecategories/${id}`,
        payload,
        headers
      );
      return data;
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    } finally {
      store.dispatch(setLoading(false));
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
