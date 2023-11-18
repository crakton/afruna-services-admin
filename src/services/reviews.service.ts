import { headers } from "@/constants/http_config";
import { setLoading } from "@/redux/features/app/loading_slice";
import { setReviews } from "@/redux/features/app/review_slice";
import { TStore, store } from "@/redux/store";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class Reviews {
    private store: TStore;

    constructor() {
        this.store = store
    }

    async getReviews() {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any[]>>('/api/admin/reviews', headers)
            store.dispatch(setReviews(data.data))
            toast.success('Review fetched successfully')
            return data.data
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }
}