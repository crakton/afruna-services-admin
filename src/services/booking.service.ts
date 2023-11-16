import { headers } from "@/constants/http_config";
import { setBookings } from "@/redux/features/app/booking_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { T_loading_provider } from "@/types/loader.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class Booking {
    private store: TStore;

    constructor() {
        this.store = store
    }

    async getBookings(loading_opt: T_loading_provider) {
        const { setIsLoading } = loading_opt
        setIsLoading && setIsLoading(true)

        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>('/api/bookings', headers)
            store.dispatch(setBookings(data.data))
            toast.success('Bookings fetched successfully')
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            setIsLoading && setIsLoading(false)
        }
    }
}