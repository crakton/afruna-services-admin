import { FC } from "react";

interface LoadingTopTableProps {}

const LoadingTopTable: FC<LoadingTopTableProps> = ({}) => {
  return (
    <div className="animate-pulse flex flex-col gap-2 p-2 shadow rounded-md w-full">
      <div className=" w-full h-[37vh] bg-slate-200"></div>
    </div>
  );
};

export default LoadingTopTable
