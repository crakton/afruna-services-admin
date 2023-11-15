import { headers } from "@/constants/http_config";
import { IService } from "@/interfaces/IService";
import { setServices } from "@/redux/features/app/service_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { T_loading_provider } from "@/types/loader.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";

export default class Service {
    private store: TStore;

    constructor() {
        this.store = store
    }

    async getServices(loading_opt: T_loading_provider) {
        const { setIsLoading } = loading_opt
        setIsLoading && setIsLoading(true)

        try {
            const { data } = await axios.get<TSuccessResponse<IService[]>>('/api/services', headers)
            store.dispatch(setServices(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>);
        } finally {
            setIsLoading && setIsLoading(false)
        }
    }
}