import { FC } from "react";

interface LoadingChartProps {}

const LoadingChart: FC<LoadingChartProps> = ({}) => {
  return (
    <div className="animate-pulse h-[300px] flex justify-center items-center bg-slate-200 shadow w-full"></div>
  );
};

export default LoadingChart;
