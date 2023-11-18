import { headers } from "@/constants/http_config";
import { setLoading } from "@/redux/features/app/loading_slice";
import { setProvider, setProviderServices, setProviders } from "@/redux/features/app/provider_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class Provider {
    store: TStore;

    constructor() {
        this.store = store
    }

    async getProviders() {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>('/api/users', headers)
            let providers = data.data.filter((user) => user.role === 'provider')
            store.dispatch(setProviders(providers))
            toast.success('Providers fetched successfully')
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async getProvider(providerId: string) {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>(`/api/users/${providerId}`, headers)
            store.dispatch(setProvider(data.data))
            toast.success('Provider fetched successfully')
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async getProviderServices(providerId: string) {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>(`/api/servivces/${providerId}/provider`, headers)
            store.dispatch(setProviderServices(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async createProvider() {
        
    }
}