"use client";

import { FC, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";
// import { UsersList } from "../_components/UsersList";
import { useRouter } from "next/navigation";
import { users } from "@/constants/data";
import { UsersList } from "@/components/UsersList";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdMessage } from "react-icons/md";

interface pageProps {}

const ChatPage: FC<pageProps> = ({}) => {
  const router = useRouter();
  const handleSelectedChat = useCallback(
    (conversationId: string) => {
      router.push(`/chat/${conversationId}`);
    },
    [router]
  );
  return (
    <section className="flex flex-col gap-4 ">
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
              {users && users.length
                ? users.map((convo) => {
                    return (
                      <UsersList
                        selectChat={() => handleSelectedChat(convo.id)}
                        key={convo.id}
                        name={convo.name}
                        number={convo.number}
                        active={convo.active}
                        img={convo.img}
                        id={convo.id}
                      />
                    );
                  })
                : null}
            </div>
          </div>
          <div className="absolute right-4 bottom-8">
            <button className="w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-full bg-orange-400 hover:bg-orange-500 hover:scale-105 transition-all duration-300">
              <BiSolidMessageSquareDetail className="text-white md:text-xl font-extrabold" />
            </button>
          </div>
        </div>
        <div className="hidden md:block h-[73vh] border border-[#D5D5E6] overflow-hidden sm:mr-2 xl:mr-16 w-full rounded-2xl">
          <EmptyState />
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
