import { FC } from "react";

interface LoadingUserProps {}

export const LoadingUser: FC<LoadingUserProps> = ({}) => {
  return (
    <div className="flex flex-col gap-1">
    <div className="bg-slate-200 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex justify-start items-center gap-4">
        <div className="rounded-full bg-slate-500 h-9 w-9"></div>
        <div className="flex-1 space-y-2 py-2 max-w-[6rem] w-full">
          <div className="h-2 bg-slate-500 rounded"></div>
          <div className="h-2 bg-slate-500 rounded"></div>
        </div>
      </div>
    </div>
    <div className="bg-slate-200 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex justify-start items-center gap-4">
        <div className="rounded-full bg-slate-500 h-9 w-9"></div>
        <div className="flex-1 space-y-2 py-2 max-w-[6rem] w-full">
          <div className="h-2 bg-slate-500 rounded"></div>
          <div className="h-2 bg-slate-500 rounded"></div>
        </div>
      </div>
    </div></div>
  );
};
