import { FC } from "react";

interface LoadingCardsProps {}

const LoadingCards: FC<LoadingCardsProps> = ({}) => {
  return (
    <div className="animate-pulse flex items-center bg-white gap-2 p-2 shadow w-fit">
      <div className=" w-[14rem] h-[8rem] bg-slate-200 rounded-md"></div>
      <div className=" w-[14rem] h-[8rem] bg-slate-200 rounded-md"></div>
      <div className=" w-[14rem] h-[8rem] bg-slate-200 rounded-md"></div>
      <div className=" w-[14rem] h-[8rem] bg-slate-200 rounded-md"></div>
    </div>
  );
};

export default LoadingCards;
