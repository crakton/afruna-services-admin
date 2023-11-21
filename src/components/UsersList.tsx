"use client";

import { FC, useCallback, useEffect } from "react";
import { Avatar } from "./Avatar";
import { IConversation } from "@/types/user";
import { useRouter } from "next/navigation";
import { RootState, store } from "@/redux/store";
import {
  setActiveHeaderInfo,
  setActiveUserConvo,
  setMessages,
  setUserTOChatId,
} from "@/redux/features/app/chat_slice";
import ChatService from "@/services/chat.service";
import { useSelector } from "react-redux";
import { setLoading } from "@/redux/features/app/loading_slice";

interface UsersListProps {
  user: IConversation;
}

export const UsersList: FC<UsersListProps> = ({ user }) => {
  const router = useRouter();

  const nameSplit = user.alias.split(" ");
  const firstWord = nameSplit[0].charAt(0).toUpperCase();
  const secondWord = nameSplit[1].charAt(0).toUpperCase();

  const userTOChatId = user.recipients[0];
  const conversationId = user._id;

  useEffect(() => {
    const chatApis = new ChatService();
    chatApis.getUsers();
  }, []);

  const usersData = useSelector((state: RootState) => state.chat.users);
  const singleUser = usersData.filter((user) => user._id === userTOChatId)[0];

  const handleSelectedChat = useCallback(() => {
    store.dispatch(setActiveHeaderInfo(user));
    store.dispatch(setUserTOChatId(userTOChatId));
    store.dispatch(setLoading(true));
    if (conversationId === "") {
      store.dispatch(setMessages([]));
      router.push(`/chat/${userTOChatId}`);
      store.dispatch(setLoading(false));
    } else {
      const chatApis = new ChatService();
      chatApis
        .getMessages(conversationId)
        .then((data) => {
          if (data) {
            store.dispatch(setMessages(data));
          }
        })
        .finally(() => store.dispatch(setLoading(false)));
      router.push(`/chat/${userTOChatId}`);
    }
    store.dispatch(setActiveUserConvo(user));
  }, [user, userTOChatId, conversationId, router]);

  const activeUserConvo = useSelector(
    (state: RootState) => state.chat.activeUserConvo
  );

  return (
    <>
      <button
        onClick={handleSelectedChat}
        // key={id}
        className={`${
          activeUserConvo === user
            ? "bg-slate-200 hover:bg-slate-200"
            : "bg-white "
        }  overflow-hidden p-4 rounded-md flex gap-5 justify-start items-center hover:bg-slate-100`}
      >
        <div className="flex justify-start items-center gap-4 w-full">
          <Avatar
            img={singleUser?.avatar!}
            active={true}
            name={`${firstWord}  ${secondWord}`}
          />
          <div className="flex flex-1 justify-start items-start text-start flex-col w-full max-w-[9.9rem] gap-1">
            <h2 className="text-sm text-[#0C0E3B] font-semibold tracking-tight">
              {user?.alias ?? ""}
            </h2>
            <p className="text-xs text-[#A2A2A2] tracking-tight truncate w-full ">
              {user?.lastMessage ? user.lastMessage : "Start a conversation"}
            </p>
          </div>
        </div>
        {user?.unreadMessages > 0 && (
          <div className="flex">
            <span className="bg-[#E1E2FF] mr-2 text-[#5D5FEF] text-[0.7rem] rounded-full h-5 w-5 flex justify-center items-center">
              {user?.unreadMessages}
            </span>
          </div>
        )}
      </button>
    </>
  );
};
