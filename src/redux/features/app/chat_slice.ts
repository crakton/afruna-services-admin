import { IConversation, IMessage, IUserBio } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [] as IConversation[],
    userConversations: [] as IConversation[],
    activeHeaderInfo: {} as IConversation,
    activeUserConvo: {} as IConversation,
    chatDetails: {},
    users: [] as IUserBio[],
    messages: [] as IMessage[],
    userTOChatId: '' as string
}

const chat_slice = createSlice({
    name: "Chat_Slice",
    initialState,
    reducers: {
        setUserTOChatId: (state, action: PayloadAction<string>) => {
            state.userTOChatId = action.payload
        },
        setConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.conversations = action.payload
        },
        setActiveHeaderInfo: (state, action: PayloadAction<IConversation>) => {
            state.activeHeaderInfo = action.payload
        },
        setActiveUserConvo: (state, action: PayloadAction<IConversation>) => {
            state.activeUserConvo = action.payload
        },
        setUsers: (state, action: PayloadAction<IUserBio[]>) => {
            state.users = action.payload
        },
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload
        },
        createMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages = [...state.messages, action.payload]
        }
    }
})

export const { setConversations, setUsers, setMessages, createMessage, setActiveHeaderInfo, setUserTOChatId , setActiveUserConvo} = chat_slice.actions
export default chat_slice.reducer
