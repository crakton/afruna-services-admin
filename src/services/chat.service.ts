import axios, { AxiosError } from "axios";
import { TStore, store } from "../redux/store";
import { TErrorResponse, TSuccessResponse } from "../types/auth.types";
import { headers } from "../constants/http_config";
import { createMessage, setConversations, setMessages, setUsers } from "../redux/features/app/chat_slice";
import { handleAuthErrors } from "../utils/auth.util";
import { IConversation, IMessage, ISendingMessage, IUserBio } from "@/types/user";
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
            return data.data
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }
    async sendingMessage(payload:{to: string, message: string}) {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.post<TSuccessResponse<ISendingMessage>>('/api/messages', payload, headers)
            store.dispatch(createMessage(data.data.message))
            return data.data.message
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }

    async getMessages(conversationId: string) {
        store.dispatch(setLoading(true))
        try {
            const { data } = await axios.get<TSuccessResponse<IMessage[]>>(`/api/messages/${conversationId}`, headers)
            store.dispatch(setMessages(data.data))
            return data.data
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
            const users:IUserBio[] = data.data
            const filterUsers =  users.filter(user => user.role === 'user' || user.role === 'vendor' || user.role === 'provider' )
            store.dispatch(setUsers(filterUsers))
        } catch (error) {
            handleAuthErrors(error as AxiosError<TErrorResponse>)
        } finally {
            store.dispatch(setLoading(false))
        }
    }
}