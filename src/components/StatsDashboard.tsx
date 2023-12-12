import { imgs } from "@/constants/images";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import { FC } from "react";

interface StatsDashboardProps {
  title: string;
  // desc: string;
  number: string;
}

const StatsDashboard: FC<StatsDashboardProps> = ({ title, number }) => {
  return (
    <div className="border w-[15.5rem] pt-8 h-[9rem] overflow-hidden  pl-7 border-[#D5D5E6] relative rounded-xl bg-white ">
      <div className="flex flex-col gap-2 absolute top-8 inset-x-4 z-10 ">
        <span className="text-2xl font-bold px-2">{number}</span>
        <span className="text-sm font-bold px-1"> {title}</span>
      </div>
      {/* <div className=" absolute bottom-4 inset-x-4 z-10 flex justify-between items-center">
        <span className="text-xs font-bold">{desc}</span>
        <span className="text-green-400 text-xs font-bold">
          +2.3% <HiMiniArrowUpRight className="text-base inline-block" />{" "}
        </span>
      </div> */}
      <div className="absolute left-0 bottom-0">
        <div className="w-[4rem] h-[4rem] overflow-hidden relative">
          <Image src={imgs.leftimg} alt="stats" priority fill />
        </div>
      </div>
      <div className="absolute right-0 bottom-0">
        <div className="w-[2rem] h-[4rem] overflow-hidden relative">
          <Image src={imgs.stats1} alt="stats" priority fill />
        </div>
      </div>
      <div className="absolute right-0 bottom-0">
        <div className="w-[3rem] h-[3rem] overflow-hidden relative">
          <Image src={imgs.stats2} alt="stats" priority fill />
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
