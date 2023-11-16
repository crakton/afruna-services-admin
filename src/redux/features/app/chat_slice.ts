import { IConversation, IUserBio } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [] as IConversation[],
    chatDetails: {},
    users: [] as IUserBio[],
    messages: [] as any[]
}

const chat_slice = createSlice({
    name: "Chat_Slice",
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.conversations = action.payload
        },
        setUsers: (state, action: PayloadAction<IUserBio[]>) => {
            state.users = action.payload
        },
        setMessages: (state, action: PayloadAction<any[]>) => {
            state.messages = action.payload
        },
        createMessage: (state, action: PayloadAction) => {
            state.messages = [...state.messages, action.payload]
        }
    }
})

export const { setConversations, setUsers, setMessages, createMessage } = chat_slice.actions
export default chat_slice.reducer
