import { imgs } from "@/constants/images";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface CurrentUsersConversationsProps {
  img: string | StaticImageData;
  message: string;
  time: string;
  isOwn: boolean;
}

export const CurrentUsersConversations: FC<CurrentUsersConversationsProps> = ({
  img,
  message,
  time,
  isOwn,
}) => {
  const convo = true;
  return (
    <div className={`flex gap-3 w-full p-2 ${isOwn && "justify-end"}`}>
      <div
        className={`${isOwn && "order-2"} relative overflow-hidden rounded-full flex justify-center items-center`}
      >
        <Image src={img || imgs.provider1} alt="image" fill />
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
