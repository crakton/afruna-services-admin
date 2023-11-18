"use client";

import { FC, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { imgs } from "@/constants/images";
import { UsersList } from "@/components/UsersList";
import { CurrentUserHeader } from "@/components/CurrentUserHeader";
import { CurrentUsersConversations } from "@/components/CurrentUsersConversations";
import { CoversationFooter } from "@/components/CoversationFooter";
import EmptyState from "@/components/EmptyState";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format } from 'timeago.js'

interface pageProps {
  params: {
    userTOChatId: string;
  };
}

const ChatCovoPage: FC<pageProps> = ({ params: { userTOChatId } }) => {
  const userConversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const activeSelectedUser = useSelector(
    (state: RootState) => state.chat.activeHeaderInfo
  );
  const chatMessages = useSelector((state: RootState) => state.chat.messages);
  console.log(chatMessages);

  console.log(userTOChatId);

  return (
    <section className="flex flex-col gap-6 sm:gap-4">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
          Chat
        </h1>
      </div>
      <div className="flex gap-4 pl-4">
        <div className="hidden lg:flex gap-2 flex-col bg-[#FDFDFF] h-full w-full max-w-[100%] sm:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] xl:max-h-[75vh] overflow-hidden border border-[#D5D5E6] rounded-2xl pt-6 xl:pt-6 xl:pl-2">
          <h2 className="ml-4 text-[1.2rem]
           text-[#0C0E3B] font-medium tracking-normal">
            Messages
          </h2>
          <div className="ml-4 mr-6 bg-white flex items-center border border-[#D5D5E6] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search Name, Id..."
              className="w-full p-2 focus:outline-none placeholder:text-[#D2D2D2]"
            />
            <div className="w-14 text-[#D2D2D2]">
              <IoSearchOutline className="text-2xl" />
            </div>
          </div>
          <div className="mt-1 pt-1 h-[63vh] sm:h-[55vh] text-xl rounded-lg overflow-hidden overflow-y-auto">
            <div className="flex flex-col gap-2 p-4 ">
              {userConversations && userConversations.length ? (
                userConversations.map((user) => {
                  return <UsersList user={user} key={user._id} />;
                })
              ) : (
                <div className="text-xs text-gray-400 font-bold">
                  Click the yellow button to select a user
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[73vh] border border-[#D5D5E6] overflow-hidden mr-2 sm:mr-4 xl:mr-16 w-full rounded-2xl">
          <div className="flex justify-between flex-col h-full">
            <div className="h-[4.5rem] px-2 sm:px-4 border-b border-[#D5D5E6] flex justify-center items-center">
              <CurrentUserHeader
                name={activeSelectedUser?.alias}
                img={activeSelectedUser?.aliasAvatar || imgs.provider1}
                active={true}
                id={activeSelectedUser?.lastMessage || "Start a conversation"}
              />
            </div>
            <>
              <div className="ScrollAreaRoot flex-1 w-full max-h-[50vh] h-full text-xl rounded-lg overflow-hidden overflow-y-auto">
                {chatMessages && chatMessages.length > 0 ? (
                  <div className="flex h-full flex-col gap-1 pt-2 px-4">
                    {chatMessages.map((message) => {
                      const time = format(message.createdAt)
                      return (
                        <CurrentUsersConversations
                          key={message._id}
                          img={message?.from?.avatar!}
                          message={message.message}
                          time={time}
                          isOwn={
                            message?.to?._id !== userTOChatId ? true : false
                          }
                        />
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState backgroud={false} text={`Chat with ${activeSelectedUser?.alias}`} />
                )}
              </div>
              <CoversationFooter />
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatCovoPage;
// The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.