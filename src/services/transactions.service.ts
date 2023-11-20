import { headers } from "@/constants/http_config";
import { setLoading } from "@/redux/features/app/loading_slice";
import { setBookingsTransactions, setOtherTransactions } from "@/redux/features/app/transactions_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class Transactions {
    private store: TStore;

    constructor() {
        this.store = store
    }

    async getOtherTransactions() {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>('/api/admin/reviews', headers)
            store.dispatch(setOtherTransactions(data.data))
            toast.success(`can't fetched OtherTransactions`)
            return data.data
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }
    async getBookingsTransactions() {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>('/api/admin/reviews', headers)
            store.dispatch(setBookingsTransactions(data.data))
            toast.success(`can't fetched BookingsTransactions`)
            return data.data
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }
}