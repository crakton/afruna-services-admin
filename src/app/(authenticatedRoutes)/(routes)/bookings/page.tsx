"use client";

import { FC, useContext } from "react";
import BookingsTable from "@/components/bookingsTable";
import {
  BookingsContext,
  T_Bookings_Tab,
} from "@/contexts/BookingsContextProvider";
import { T_Bookings_Context } from "@/types/bookings";
import ItemPicker from "@/components/ItemPicker";
import { IoSearchOutline } from "react-icons/io5";

interface pageProps {}

const bookings_Tab = [
  "All Bookings",
  "Pending",
  "Active",
  "Inactive",
  "Delected",
];

const BookingsPage: FC<pageProps> = ({}) => {
  const { bookingsTab, handleTabSelect } = useContext(
    BookingsContext
  ) as T_Bookings_Context;

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-between items-center px-4 pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
            Bookings
          </h1>
          <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
            <input type="text" placeholder="Search..." className="w-full py-[0.6rem] text-xs text-slate-600" />
            <IoSearchOutline className="text-slate-300 text-2xl " />
          </fieldset>
        </div>
        <fieldset className="flex">
          <ItemPicker
            items={["A", "B"]}
            placeholder={"A-Z"}
            getSelected={(val) => console.log(val as string)}
            // contentClassName={"p-2 bg-white text-xs"}
            triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
          />
        </fieldset>
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-32 w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start gap-8 items-center">
            {bookings_Tab.map((item, idx) => (
              <button
                className={`${
                  bookingsTab === item && " text-sky-500"
                } text-afruna-blue text-sm md:text-base font-bold relative flex flex-col `}
                key={idx}
                onClick={() => handleTabSelect(item as T_Bookings_Tab)}
              >
                {item}
                <div
                  className={`${
                    bookingsTab === item && "bg-sky-500"
                  } w-full h-[2px] absolute -bottom-[0.35rem]`}
                />
              </button>
            ))}
          </div>
          <div className="bg-orange-200 w-full h-[2px] " />
        </div>
        {/* Bookings table */}
        <BookingsTable />
      </div>
    </section>
  );
};

export default BookingsPage;
