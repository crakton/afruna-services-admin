import { FC } from "react";

interface LoadingProviderDetailsProps {}

export const LoadingProviderDetails: FC<LoadingProviderDetailsProps> = ({}) => {
  return (
    <section className="max-w-[96%] lg:max-w-[86%] animate-pulse ml-6 xl:ml-[3.5rem] flex items-start gap-6">
      <aside className="px-5 py-8 bg-white font-semibold text-[#666363] rounded-xl flex max-w-[25%] w-full flex-col gap-2 justify-center items-center">
        <div className="rounded-full bg-slate-400 h-12 w-12"></div>
        <div className="flex-1 space-y-3 py-2 max-w-[10rem] w-full">
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="h-2 bg-slate-300 rounded"></div>
        </div>
      </aside>
      <aside className="flex flex-col gap-8 w-full">
        <div className="h-20 bg-slate-300 rounded"></div>
        <div className="flex justify-start items-center gap-6">
          <div className="rounded-md bg-slate-300 h-20 w-48" />
          <div className="rounded-md bg-slate-300 h-20 w-48" />
        </div>
      </aside>
    </section>
  );
};
