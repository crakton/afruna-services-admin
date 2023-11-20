import { imgs } from "@/constants/images";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface AvatarProps {
  img: string | StaticImageData;
  active?: boolean;
  isOwn?: boolean;
  convo?: boolean;
  name?: string;
}

export const Avatar: FC<AvatarProps> = ({
  img,
  active,
  isOwn,
  convo,
  name,
}) => {
  return (
    <div className="flex relative ">
      <div
        className={`${
          convo ? "w-8 h-8" : "w-12 h-12"
        } relative overflow-hidden rounded-full flex justify-center items-center ${
          isOwn && "order-2"
        }`}
      >
        {img ? (
          <Image src={img || imgs.provider1} alt="image" fill />
        ) : (
          <div className=" w-full h-full text-sm bg-slate-300 flex justify-center items-center">
            {name}
          </div>
        )}
      </div>
      <span
        className={`${active ? "bg-blue-500" : "bg-slate-400"} ${
          convo ? "hidden" : ""
        } absolute rounded-full h-2 w-2 ${
          convo ? "bottom-6" : "bottom-1"
        }  right-1 ring-2 ring-white`}
      />
    </div>
  );
};
