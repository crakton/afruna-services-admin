import { T_bar_data } from "@/app/(authenticatedRoutes)/(routes)/dashboard/page";
import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarchartProps {
  bar_data: T_bar_data[];
}

const Barchart: FC<BarchartProps> = ({ bar_data }) => {
  return (
    <BarChart
      width={655}
      height={300}
      data={bar_data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend align="left" iconType="circle" iconSize={7} />
      <Bar
        dataKey="booking"
        fill="#d8b4fe"
        // activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="Income"
        fill="#86efac"
        // activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  );
};

export default Barchart;
