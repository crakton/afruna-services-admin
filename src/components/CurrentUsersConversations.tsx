import { imgs } from "@/constants/images";
import { IMessage } from "@/types/user";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";

interface CurrentUsersConversationsProps {
  message: string;
  time: string;
  isOwn: boolean;
  convo: IMessage;
}

export const CurrentUsersConversations: FC<CurrentUsersConversationsProps> = ({
  message,
  time,
  isOwn,
  convo,
}) => {
  // const usersData = useSelector((state: RootState) => state.chat.users);
  // const userConvoAvatar = usersData.filter(
  //   (user) => user?._id === convo?.to?._id
  // )[0];
  // const avatar = userConvoAvatar?.avatar;
  const name = `${convo?.from?.firstName} ${convo?.from?.lastName}`
  const nameSplit = name?.split(" ");
  const firstWord = nameSplit[0];
  const secondWord = nameSplit[1];
  const firstLetterFirstWord = firstWord.charAt(0).toUpperCase();
  const firstLetterSecondWord = secondWord.charAt(0).toUpperCase();
  const scroll = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scroll]);
  
  return (
    <div ref={scroll} className={`flex gap-2 w-full p-2 ${isOwn && "justify-end"}`}>
      <div
        className={`${
          isOwn ? "order-2 bg-afruna-blue/60 ring-4 ring-slate-300 w-6 h-6" : 'w-8 h-8'
        }  relative overflow-hidden rounded-full flex justify-center items-center`}
      >
        {isOwn ? (
          <Image src={imgs.afruna_2nd_logo} alt="image" fill />
        ) : (
          convo?.from?.avatar ? <Image src={convo?.from?.avatar} alt="image" fill /> : <div className=" text-[0.68rem] w-full h-full bg-slate-300 flex justify-center items-center">
          {`${firstLetterFirstWord} ${firstLetterSecondWord}`}
        </div>
        )}
      </div>
      <div
        className={`flex flex-col gap-1 max-w-xs w-full ${
          isOwn && "items-end"
        }`}
      >
        <p
          className={`text-xs font-normal w-fit overflow-hidden rounded-[0.7rem] py-2 px-3 ${
            isOwn
              ? "bg-[#8E9EA4] text-white"
              : "border border-[#06AEEE] text-[#06AEEE]"
          }`}
        >
          {message}
        </p>
        <span className="text-xs text-[#333333]">{time}</span>
      </div>
    </div>
  );
};
