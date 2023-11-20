import { StaticImageData } from "next/image";
import { FC } from "react";
import { HiPhone } from "react-icons/hi";
import { IoAlertCircle } from "react-icons/io5";
import { Avatar } from "./Avatar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";

interface CurrentUserHeaderProps {
  active: boolean;
  name: string;
  img: string | StaticImageData;
}

export const CurrentUserHeader: FC<CurrentUserHeaderProps> = ({
  active,
  name,
  img,
}) => {
  const { push } = useRouter();
  const nameSplit = name?.split(" ");
  const firstWord = nameSplit[0].charAt(0).toUpperCase();
  const secondWord = nameSplit[1].charAt(0).toUpperCase();
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 justify-start items-center">
        <button onClick={() => push("/chat")}>
          <MdArrowBackIosNew className="text-lg text-sky-400" />
        </button>
        <Avatar
          img={img}
          active={active}
          name={`${firstWord} ${secondWord}`}
        />
        <div className="flex flex-1 flex-col">
          <h2 className="text-sm font-semibold tracking-tight text-[#0C0E3B]">
            {name}
          </h2>
          <p className={`${active? 'text-purple-400 ' : 'Offline'} tracking-wider font-semibold text-xs text-[#A2A2A2]`}>{active? 'Online' : 'Offline'}</p>
        </div>
      </div>
      <div className="flex justify-between items-center max-w-[5rem] w-full text-[#0C0E3B]">
        <HiPhone
          size={37}
          className="p-2 rounded-full cursor-pointer hover:bg-[#0C0E3B]/20  transition duration-300"
        />
        <IoAlertCircle
          size={37}
          className="p-2 rounded-full cursor-pointer hover:bg-[#0C0E3B]/20 transition duration-300"
        />
      </div>
    </div>
  );
};
