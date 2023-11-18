import { FC } from "react";

interface EmptyStateProps {
  backgroud: boolean;
  text: string;
}

const EmptyState: FC<EmptyStateProps> = ({ backgroud, text }) => {
  return (
    <section
      className={` ${
        backgroud ? "bg-white" : null
      } px-4 py-10 sm:px-6 h-full flex justify-center items-center`}
    >
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-xl font-semibold text-slate-500">
          {text}
        </h3>
      </div>
    </section>
  );
};

export default EmptyState;
