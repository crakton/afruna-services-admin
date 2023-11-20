"use client";

import Barchart from "@/components/Barchart";
import Piechart from "@/components/PieChart";
import RecentBookingTable from "@/components/RecentBookingTable";
import StatsDashboard from "@/components/StatsDashboard";
import TopProviderTable from "@/components/TopProviderTable";
import TopServiceTable from "@/components/TopServiceTable";
import { buttonVariants } from "@/components/ui/button";
import { DashboardStats } from "@/constants/data";
import Booking from "@/services/booking.service";
import Link from "next/link";
import { FC, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

interface pageProps {}

export type T_booking_data = {
  _id: string;
  name: string;
  value: number;
};
export type T_bar_data = {
  name: string;
  booking: number;
  Income: number;
  amt: number;
};

const DashboardPage: FC<pageProps> = ({}) => {
  const booking_statictics = [
    { _id: "1", name: "Category A", value: 20 },
    { _id: "2", name: "Category B", value: 15 },
    { _id: "3", name: "Category C", value: 30 },
    { _id: "4", name: "Category D", value: 50 },
    // Add more data...
  ];
  const bar_data = [
    {
      name: "Jan",
      booking: 4000,
      Income: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      booking: 3000,
      Income: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      booking: 2000,
      Income: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      booking: 2780,
      Income: 3908,
      amt: 2000,
    },
    {
      name: "May",
      booking: 1890,
      Income: 4800,
      amt: 2181,
    },
    {
      name: "Jul",
      booking: 2390,
      Income: 3800,
      amt: 2500,
    },
    {
      name: "Aug",
      booking: 2790,
      Income: 1000,
      amt: 2500,
    },
    {
      name: "Sep",
      booking: 2390,
      Income: 5800,
      amt: 900,
    },
    {
      name: "Oct",
      booking: 4390,
      Income: 800,
      amt: 500,
    },
    {
      name: "Nov",
      booking: 2090,
      Income: 1600,
      amt: 500,
    },
    {
      name: "Dec",
      booking: 1390,
      Income: 1800,
      amt: 2000,
    },
    // Add more data... background: linear-gradient(180deg, #817AF3 0%, #74B0FA 47.92%, #79D0F1 100%);
  ];
  const bookingApis = new Booking()
  useEffect(() => {
    bookingApis.getRecentBookings().then(data => console.log(data)
    )
  }, [])
  return (
    <section className="flex flex-col gap-6 pb-12 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-lg lg:pl-0 lg:text-xl leading-3 text-afruna-blue font-bold">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 justify-start items-center px-6">
        {DashboardStats.map((item) => {
          return <StatsDashboard key={item.title} {...item} />;
        })}
      </div>
      <div className="flex justify-between gap-6 items-center lg:px-6 max-w-[93%] w-full">
        <div className="max-w-[60%] w-full bg-white rounded-xl border shadow-sm border-slate-300">
          <header className="flex justify-between w-full px-4 py-6 items-center">
            <h1 className="font-semibold text-slate-700">Booking Summary</h1>
            {/* <Link
              // className={buttonVariants('')}
              href={""}
            >
              View all
            </Link> */}
          </header>
          <Barchart bar_data={bar_data}/>
        </div>
        <div className="max-w-[40%] w-full bg-white rounded-xl border shadow-sm border-slate-300">
          <header className="flex justify-between w-full px-4 py-6 items-center">
            <h1 className="font-semibold text-slate-700">
              Sales by categories
            </h1>
            <Link
              className={buttonVariants({ variant: "afrunaBlue" })}
              href={""}
            >
              View all
            </Link>
          </header>
          {/* <ResponsiveContainer> */}
          {/* </ResponsiveContainer> */}
          {/* <ResponsiveContainer width="100%" height="80%"> */}
          {booking_statictics && booking_statictics.length ? (
            <Piechart booking_statictics={booking_statictics} />
          ) : null}
        </div>
      </div>
      <div className=" flex justify-between gap-6 items-center lg:px-6 max-w-[93%] w-full">
        <div className=" overflow-hidden w-full bg-white  max-w-[100%] rounded-xl border shadow-sm border-slate-300">
          <header className="flex justify-between items-center py-4 px-4 ">
            <h1 className="font-bold text-slate-700 text-lg">Top service</h1>
            <div className="flex justify-end items-center font-bold text-sm text-purple-700 gap-3">
              <Link href={"/services"}>
                More <FaArrowRight className="text-sm  inline-flex" />
              </Link>
            </div>
          </header>
          {/* top service */}
          <TopServiceTable />
        </div>
        <div className=" overflow-hidden w-full bg-white  max-w-[100%] rounded-xl border shadow-sm border-slate-300">
          <header className="flex justify-between items-center py-4 px-4 ">
            <h1 className="font-bold text-slate-700 text-lg">Top Providers</h1>
            <div className="flex justify-end items-center font-bold text-sm text-purple-700 gap-3">
              <Link href={"/providers"}>
                More <FaArrowRight className="text-sm  inline-flex" />
              </Link>
            </div>
          </header>
          {/* top providers */}
          <TopProviderTable />
        </div>
      </div>
      {/* recent bookings */}
      <div className=" overflow-hidden w-full bg-white mx-6 lg:px-6 max-w-[93%] rounded-xl border shadow-sm border-slate-300">
        <header className="flex justify-between items-center py-4 px-4 ">
          <h1 className="font-bold text-slate-700 text-lg">Recent Bookings</h1>
          <div className="flex justify-end items-center font-bold text-sm text-purple-700 gap-3">
            <Link
              href={"/bookings"}
              className={buttonVariants({ variant: "lightgradientblue" })}
            >
              More <FaArrowRight className="text-sm inline-flex ml-2" />
            </Link>
          </div>
        </header>
        <RecentBookingTable />
      </div>
    </section>
  );
};

export default DashboardPage;
