import { FC } from "react";

interface LoadingUserDetailsProps {}

export const LoadingUserDetails: FC<LoadingUserDetailsProps> = ({}) => {
  return (
    <div className="animate-pulse flex flex-col justify-start gap-6 px-4 md:px-10 xl:pr-32 w-full">
      <div className="rounded-full bg-slate-400 h-24 w-24" />
      <div className="flex-1 space-y-3 py-2 max-w-[10rem] w-full">
        <div className="h-1 bg-slate-400 rounded" />
        <div className="h-1 bg-slate-400 rounded" />
        <div className="h-1 bg-slate-400 rounded" />
      </div>
      <div className="flex justify-start items-center gap-6">
        <div className="rounded-md bg-slate-300 h-20 w-48" />
        <div className="rounded-md bg-slate-300 h-20 w-48" />
      </div>
    </div>
  );
};
