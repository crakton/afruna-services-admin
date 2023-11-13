import { FC } from "react";

interface EmptyStateProps {}

const EmptyState: FC<EmptyStateProps> = ({}) => {
  return (
    <section className="px-4 py-10 sm:px-6 h-full bg-white flex justify-center items-center">
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-xl font-semibold text-slate-500">Select the person you want to chat with</h3>
      </div>
    </section>
  );
};

export default EmptyState;
