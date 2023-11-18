"use client";

import { FC, useCallback } from "react";
import { Avatar } from "./Avatar";
import { IConversation } from "@/types/user";
import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
import { setActiveHeaderInfo, setUserTOChatId } from "@/redux/features/app/chat_slice";
import ChatService from "@/services/chat.service";

interface UsersListProps {
  user: IConversation;
}

export const UsersList: FC<UsersListProps> = ({ user }) => {
  const router = useRouter();

  const chatApis = new ChatService();

  const userTOChatId = user.recipients[0];
  const conversationId = user._id;
  const handleSelectedChat = useCallback(() => {
    store.dispatch(setActiveHeaderInfo(user));
    store.dispatch(setUserTOChatId(userTOChatId));
    if (conversationId === "") {
      router.push(`/chat/${userTOChatId}`);
    } else {
      chatApis.getMessages(conversationId).then((data) => console.log(data));
      router.push(`/chat/${userTOChatId}`);
    }
  }, [user, userTOChatId, conversationId, chatApis, router]);

  return (
    <>
      <button
        onClick={handleSelectedChat}
        // key={id}
        className="bg-white p-4 mr-2 rounded-md flex gap-5 justify-start items-center hover:bg-slate-200"
      >
        <div className="flex justify-start items-center gap-4">
          <Avatar img={user?.aliasAvatar!} active={true} />
          <div className="flex flex-1 justify-start items-start flex-col gap-1 w-full">
            <h2 className="text-sm text-[#0C0E3B] font-semibold tracking-tight">
              {user?.alias ?? ""}
            </h2>
            <p className="text-xs text-[#A2A2A2] tracking-tight">
              {user?.lastMessage ? user.lastMessage : "Start a conversation"}
            </p>
          </div>
        </div>
        {user?.unreadMessages > 0 && (
          <div className="flex">
            <span className="bg-[#E1E2FF] mr-2 text-[#5D5FEF] text-xs rounded-full h-6 w-6 flex justify-center items-center">
              {user?.unreadMessages}
            </span>
          </div>
        )}
      </button>
    </>
  );
};
