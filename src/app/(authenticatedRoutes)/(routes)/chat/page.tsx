"use client";

import { FC, ReactNode, memo, useCallback, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { UsersList } from "@/components/UsersList";
import EmptyState from "@/components/EmptyState";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Avatar } from "@/components/Avatar";
import ChatService from "@/services/chat.service";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { IUserBio } from "@/types/user";
import { setConversations } from "@/redux/features/app/chat_slice";

interface pageProps {}

const ChatPage: FC<pageProps> = ({}) => {
  const chatApis = new ChatService();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const usersToselect = useSelector((state: RootState) => state.chat.users);
  const userConversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const [Open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  const handleFetchUsers = useCallback(() => {
    setOpen(true);
    chatApis.getUsers();
  }, []);
  const [userSelected, setUserSelected] = useState<IUserBio>();
  const handleAddUserTOChat = () => {
    const newUserConversation = {
      _id: "",
      recipients: [`${userSelected?._id}`],
      lastMessage: "",
      alias: `${userSelected?.firstName} ${userSelected?.lastName}`,
      aliasAvatar: userSelected?.avatar,
      unreadMessages: 0,
      createdAt: "",
      updatedAt: "",
    };
    store.dispatch(
      setConversations([newUserConversation, ...userConversations])
    );
    onClose();
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
          <h1 className="text-xl lg:text-2xl leading-3 text-afruna-blue font-bold">
            Chat
          </h1>
        </div>
        <div className="flex gap-4 max-w-[96%] w-full mx-auto">
          <div className="relative flex gap-2 flex-col bg-[#FDFDFF] h-full w-full max-h-[74vh] max-w-[100%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] xl:max-h-[75vh] overflow-hidden border border-[#D5D5E6] rounded-2xl pt-6 xl:pl-2">
            <h2 className="ml-4 text-[1.2rem] text-[#0C0E3B] font-medium tracking-normal">
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
            <div className=" mt-1 pt-1 h-[63vh] sm:h-[55vh] text-xl rounded-lg overflow-hidden overflow-y-auto">
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
                {/* {userConversations && userConversations.length ? (
                  userConversations.map((user) => {
                    const selectedUser = handleSelectedChat(user); // Call handleSelectedChat and store the returned value

                    return (
                      <div key={user._id}>
                        <UsersList
                          // selectChat={() => handleSelectedChat(user)}
                          key={user._id}
                          name={user?.alias ?? ""}
                          number={user?.unreadMessages}
                          active={true}
                          img={user?.aliasAvatar!}
                          id={user.recipients[0]}
                          lastMessage={user.lastMessage}
                        />

                        {selectedUser && ( // Check if selectedUser exists and render the following if it does
                          <div className="selected-user-info">
                            <p>Selected User: {selectedUser.alias}</p>
                            <p>
                              Unread Messages: {selectedUser.unreadMessages}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-gray-400 font-bold">
                    Click the yellow button to select a user
                  </div>
                )} */}
              </div>
            </div>
            <div className="absolute right-4 bottom-8">
              <button
                type="button"
                onClick={handleFetchUsers}
                className="w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-full bg-orange-400 hover:bg-orange-500 hover:scale-105 transition-all duration-300"
              >
                <BiSolidMessageSquareDetail className="text-white md:text-xl font-extrabold" />
              </button>
            </div>
          </div>
          <div className="hidden md:block h-[73vh] border border-[#D5D5E6] overflow-hidden sm:mr-2 xl:mr-16 w-full rounded-2xl">
            <EmptyState />
          </div>
        </div>
      </section>
      {Open ? (
        <ShowModal cancelModel={onClose}>
          <div
            className="bg-white h-[100vh] sm:h-[95vh] justify-between sm:rounded-lg w-full md:w-[400px] z-50 overflow-y-auto flex flex-col text-start py-6 px-6"
            role="buyer div"
          >
            <button
              className="place-self-end mb-4"
              onClick={onClose}
              type="button"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className=" h-[72vh] overflow-y-auto px-2 flex flex-col gap-1">
              {loading ? (
                <>Loading..</>
              ) : (
                usersToselect.map((user) => {
                  return (
                    <button
                      onClick={() => setUserSelected(user)}
                      key={user._id}
                      className={` ${
                        user._id === userSelected?._id ? "bg-slate-200" : 'bg-white'
                      } p-4 w-full rounded-md flex gap-5 justify-start items-center hover:bg-slate-200`}
                    >
                      <div className="flex justify-start items-center gap-6">
                        <Avatar img={user.avatar!} />
                        <div className="flex justify-start items-start flex-1 flex-col gap-1 w-full">
                          <h2 className="text-sm text-[#0C0E3B] font-semibold tracking-tight">
                            {`${user.firstName} ${user.lastName}`}
                          </h2>
                          <p className="text-xs text-[#A2A2A2] tracking-tight">
                            {user.role === "vendor"
                              ? "Product Seller"
                              : user.role === "provider"
                              ? "Service Render"
                              : "Client"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="space-x-4 place-self-end mt-2 ">
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-sm text-sm text-red-500 bg-white"
              >
                <span className="ml-2">Cancel</span>
              </button>
              <button
                onClick={handleAddUserTOChat}
                className="px-3 py-2 rounded-sm text-sm text-white bg-green-600"
              >
                <span className="ml-2">Chat User</span>
              </button>
            </div>
          </div>
        </ShowModal>
      ) : null}
    </>
  );
};

export default ChatPage;

const ShowModal: FC<{ children: ReactNode; cancelModel: () => void }> = memo(
  ({ children, cancelModel }) => (
    <div
      // onClick={cancelModel}
      className={
        "absolute flex justify-center items-center z-30 top-0 left-0 w-screen h-screen bg-black/50 py-10"
      }
    >
      {children}
    </div>
  )
);
