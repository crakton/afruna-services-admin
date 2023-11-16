import axios, { AxiosError } from "axios";
import { TStore, store } from "../redux/store";
import { TErrorResponse, TSuccessResponse } from "../types/auth.types";
import { headers } from "../constants/http_config";
import { createMessage, setConversations, setMessages, setUsers } from "../redux/features/app/chat_slice";
import { handleAuthErrors } from "../utils/auth.util";
import { IConversation } from "@/types/user";
import { setLoading } from "@/redux/features/app/loading_slice";

export default class ChatService {
    private store: TStore

    constructor() {
        this.store = store
    }

    async getConversations() {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<IConversation[]>>('/api/conversations', headers)
            store.dispatch(setConversations(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async sendingMessage(message: any) {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.post<TSuccessResponse<any>>('/api/messages', message, headers)
            store.dispatch(createMessage(data.data.message))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async getMessages(conversationId: string) {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<any>>(`/api/messages/${conversationId}`, headers)
            store.dispatch(setMessages(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async getUsers() {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get('/api/users', headers)
            store.dispatch(setUsers(data.data))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }
}