import { headers } from "@/constants/http_config";
import { setProvider, setProviderBookings, setProviderServices, setProviders } from "@/redux/features/app/provider_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { T_loading_provider } from "@/types/loader.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class Provider {
    store: TStore;

    constructor() {
        this.store = store
    }

    async getProviders(loading_opt: T_loading_provider) {
        const { setIsLoading } = loading_opt
        setIsLoading && setIsLoading(true)

        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>('/api/admin/providers', headers)
            store.dispatch(setProviders(data.data))
            toast.success('Providers fetched successfully')
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            setIsLoading && setIsLoading(false)
        }
    }

    async getProvider(providerId: string, loading_opt: T_loading_provider) {
        const { setIsLoading } = loading_opt
        setIsLoading && setIsLoading(true)

        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>(`/api/admin/providers/${providerId}`, headers)
            store.dispatch(setProvider(data.data))
            toast.success('Provider fetched successfully')
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            setIsLoading && setIsLoading(false)
        }
    }

    async getProviderBookings(providerId: string) {
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>(`/api/admin/providers/${providerId}`, headers)
            store.dispatch(setProviderBookings(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        }
    }

    async getProviderServices(providerId: string) {
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>(`/api/servivces/${providerId}/provider`, headers)
            store.dispatch(setProviderServices(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        }
    }

    async createProvider() {
        
    }
}