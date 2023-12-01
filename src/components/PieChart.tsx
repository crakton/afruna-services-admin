import { T_booking_data } from "@/app/(authenticatedRoutes)/(routes)/dashboard/page";
import { Colors } from "@/constants/data";
import {
  FC,
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  booking_statictics: T_booking_data[];
}

const Piechart: FC<PieChartProps> = ({ booking_statictics }) => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 600 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#14532d", "#1d4ed8", "#f97316", "#b91c1c"];

  const CustomizedLegend = (props: {
    payload: {
      value:
         string
        // | number
        // | boolean
        // | ReactElement<any, string | JSXElementConstructor<any>>
        // | Iterable<ReactNode>
        // | ReactPortal
        // | PromiseLikeOfReactNode
        // | null
        // | undefined;
    };
  }) => {
    // Define your custom styles here
    const customStyle = {
      fontSize: "16px", // Adjust the font size
      fontWeight: "bold", // Adjust the font weight
    };

    return <span style={customStyle}>{props.payload.value}</span>;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (data: {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index: any;
  }) => {
    const radius =
      data.innerRadius + (data.outerRadius - data.innerRadius) * 0.5;
    const x = data.cx + radius * Math.cos(-data.midAngle * RADIAN);
    const y = data.cy + radius * Math.sin(-data.midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > data.cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs text-black px-2  "
      >
        {`${(data.percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <PieChart width={400} height={300}>
        <Pie
          data={booking_statictics}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          innerRadius={30}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {booking_statictics &&
            booking_statictics.map((_, index) => (
              <Cell
                //   key={`cell-${index}`}
                key={_._id}
                values="booking_statictics"
                strokeWidth={0.4}
                strokeLinecap="round"
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
        {/* <Tooltip /> */}
        <Legend
          key="booking_statictics"
          align="left"
          iconType="circle"
          iconSize={5}
          fontSizeAdjust={0.5}
          className="text-xs"
        //   content={<CustomizedLegend payload={{
        //       value: ""
        //   }}/>}
        />
      </PieChart>
    </>
  );
};

export default Piechart;
