"use client";

import { FC, ReactNode, memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { IConversation, IUserBio } from "@/types/user";
import { setConversations } from "@/redux/features/app/chat_slice";
import { LuMessageSquarePlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { IoRemoveOutline } from "react-icons/io5";
import { LoadingUser } from "../_components/LoadingUser";
import useSearchConvo from "@/hooks/useSearchConvo";

interface pageProps {}

const ChatPage: FC<pageProps> = ({}) => {
  const [loadingConvo, setLoadingConvo] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  const loading = useSelector((state: RootState) => state.loading.loading);
  const usersToselect = useSelector((state: RootState) => state.chat.users);
  const userConversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  console.log(userConversations);
  const [Open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const handleFetchUsers = () => {
    setOpen(true);
    const chatApis = new ChatService();
    setLoadingUser(true);
    chatApis.getUsers().finally(() => setLoadingUser(false));
  };
  const [userSelected, setUserSelected] = useState<IUserBio>();
  const handleAddUserTOChat = () => {
    if (userSelected === undefined) {
      toast.warn("Select the person you want to chat up");
      return;
    }
    const isUserInTheConvoList = userConversations.some(
      (conversation) =>
        conversation.alias ===
        `${userSelected?.firstName} ${userSelected?.lastName}`
    );
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
    if (isUserInTheConvoList) {
      toast.info(
        `${userSelected?.firstName} ${userSelected?.lastName} is already in your chat list`
      );
      return;
    } else {
      store.dispatch(
        setConversations([newUserConversation, ...userConversations])
      );
      onClose();
    }
  };
  useEffect(() => {
    const chatApis = new ChatService();
    setLoadingConvo(true);
    chatApis.getConversations().finally(() => setLoadingConvo(false));
  }, []);

  const { searchResult, setSearchInput } = useSearchConvo({
    data: userConversations,
  });

    
    // const [convo, setConvo] = useState<IConversation[]>([])
    
  // useMemo(() => {
	// 	setConvo(searchResult)
  //   console.log(convo);
    
	// }, [searchResult, convo]);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
          <h1 className="text-xl lg:text-2xl leading-3 text-afruna-blue font-bold">
            Chat
          </h1>
        </div>
        <div className="flex gap-4 max-w-[96%] w-full mx-auto">
          {/* {loading ? (
            <>loading...</>
          ) : ( */}
          <>
            <div className="relative flex gap-2 flex-col bg-[#FDFDFF] h-full w-full max-h-[74vh] max-w-[100%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] xl:max-h-[75vh] overflow-hidden border border-[#D5D5E6] rounded-2xl pt-6 xl:pl-2">
              <h2 className="ml-4 text-[1.2rem] text-[#0C0E3B] font-medium tracking-normal">
                Messages
              </h2>
              <div className="ml-4 mr-6 bg-white flex items-center border border-[#D5D5E6] rounded-md overflow-hidden">
                <input
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="search"
                  placeholder="Search Name"
                  className="w-full p-2 focus:outline-none placeholder:text-[#D2D2D2]"
                />
                <div className="w-14 text-[#D2D2D2]">
                  <IoSearchOutline className="text-2xl" />
                </div>
              </div>
              <div className=" mt-1 pt-1 h-[63vh] sm:h-[55vh] text-xl rounded-lg overflow-hidden overflow-y-auto">
                <div className="flex flex-col gap-2 p-4 ">
                  {loadingConvo ? (
                    <LoadingUser />
                  ) : userConversations && userConversations.length ? (
                    userConversations.map((user) => {
                      return (
                        // <Suspense fallback={<>Loading...</>}>
                        <UsersList user={user} key={user._id} />
                        // </Suspense>
                      );
                    })
                  ) : (
                    <div className="text-xs text-gray-400 font-bold">
                      Click the yellow button to select a user
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute right-4 bottom-8">
                <button
                  type="button"
                  onClick={handleFetchUsers}
                  className="w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-full bg-orange-400 hover:bg-orange-500 hover:scale-105 transition-all duration-300"
                >
                  <LuMessageSquarePlus className="text-white md:text-xl font-extrabold" />
                </button>
              </div>
            </div>
            <div className="hidden md:block h-[73vh] border border-[#D5D5E6] overflow-hidden sm:mr-2 xl:mr-16 w-full rounded-2xl">
              <EmptyState
                backgroud={true}
                text={
                  "Click the down button or select the person you want to chat with"
                }
              />
            </div>
          </>
          {/* // )} */}
        </div>
      </section>
      {Open ? (
        <ShowModal cancelModel={onClose}>
          <div
            className="bg-white h-[100vh] sm:h-[95vh] sm:rounded-lg w-full md:w-[400px] z-50 overflow-y-auto flex flex-col text-start pt-2 sm:py-6 px-6"
            role="buyer div"
          >
            {/* <button
              className="place-self-end hidden md:block mb-4 fl"
              onClick={onClose}
              type="button"
            >
              <FaTimes className="md:text-lg" />
            </button> */}
            <button
              className="place-self-center px-2 rounded-full mb-4 bg-slate-100 hover:bg-slate-300"
              onClick={onClose}
              type="button"
            >
              <IoRemoveOutline className="text-lg" />
            </button>

            <div className=" h-[72vh] sm:h-[82vh] overflow-y-auto px-2 flex flex-col gap-1">
              {loadingUser ? (
                <LoadingUser />
              ) : (
                usersToselect
                  .filter((_) => _.blocked === false)
                  .map((user) => {
                    return (
                      <button
                        onClick={() => setUserSelected(user)}
                        key={user._id}
                        className={` ${
                          user._id === userSelected?._id
                            ? "bg-slate-200"
                            : "bg-white"
                        } p-4 w-full rounded-md flex gap-5 justify-start items-center hover:bg-slate-200`}
                      >
                        <div className="flex justify-start items-center gap-6">
                          <Avatar
                            img={user.avatar!}
                            name={`${user.firstName
                              .charAt(0)
                              .toUpperCase()} ${user.lastName
                              .charAt(0)
                              .toUpperCase()}`}
                          />
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
        "fixed flex justify-center items-center z-30 top-[12.8%] sm:top-0 left-0 w-screen h-screen bg-black/50 py-10"
      }
    >
      {children}
    </div>
  )
);
