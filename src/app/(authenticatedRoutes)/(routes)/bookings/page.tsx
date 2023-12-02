"use client";

import { FC, useEffect, useMemo} from "react";
import BookingsTable from "@/components/bookingsTable";
import ItemPicker from "@/components/ItemPicker";
import { IoSearchOutline } from "react-icons/io5";
import { setStatus } from "@/redux/features/app/table_status_slice";
import { RootState, store } from "@/redux/store";
import { useSelector } from "react-redux";
import Booking from "@/services/booking.service";
import { setCanceledBookings, setCompletedBookings, setInProgreessBookings, setPendingBookings } from "@/redux/features/app/booking_slice";
import { T_Bookings } from "@/types/bookings";
import PendingBookingsTable from "@/components/PendingBookingsTable";
import CanceledBookingsTable from "@/components/CanceledBookingsTable";
import CompletedBookingsTable from "@/components/CompletedBookingsTable";
import InProgressBookingsTable from "@/components/InProgressBookingsTable ";

interface pageProps {}

const bookings_Tab = [
  "All Bookings",
  "Pending",
  "Processing",
  "Completed",
  "Canceled",
];
export type tableStatus = 'all' | 'pending' | 'processing' | 'completed' | 'canceled' 

const BookingsPage: FC<pageProps> = ({ }) => {
  
  const currentStatus = useSelector((state: RootState) => state.tableStatus.status)
  let bookings = useSelector((state: RootState) => state.booking.bookings)

  const bookingApis = new Booking()

  const handleTabSelect = (status: tableStatus) => {
    switch (status) {
      case 'all':
        store.dispatch(setStatus('all'))
        bookingApis.getBookings()
        break;
      case 'pending':
        store.dispatch(setStatus('pending'))
        store.dispatch(setPendingBookings(bookings.filter((booking: T_Bookings) => booking.status === 'pending')))
        break;
      case 'processing':
        store.dispatch(setStatus('processing'))
        store.dispatch(setInProgreessBookings(bookings.filter((booking: T_Bookings) => booking.status === 'in progress')))
        break;
      case 'completed':
        store.dispatch(setStatus('completed'))
        store.dispatch(setCompletedBookings(bookings.filter((booking: T_Bookings) => booking.status === 'completed')))
        break;
      case 'canceled':
        store.dispatch(setStatus('canceled'))
        store.dispatch(setCanceledBookings(bookings.filter((booking: T_Bookings) => booking.status === 'canceled')))
        break;
      default:
        break;
    }
  }

  const Component = useMemo(() => {
    switch (currentStatus) {
      case "pending":
        return <PendingBookingsTable />;
      case "processing":
        return <InProgressBookingsTable />;
      case "completed":
        return <CompletedBookingsTable />;
      case "canceled":
        return <CanceledBookingsTable />;
      default:
        return <BookingsTable />
    }
  }, [currentStatus]);
  
  useEffect(() => {
    bookingApis.getBookings()

    return () => {
      store.dispatch(setStatus('all'))
    }
  }, [])

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center px-4 pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
            Bookings
          </h1>
          {/* <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
            <input type="text" placeholder="Search..." className="w-full py-[0.6rem] text-xs text-slate-600" />
            <IoSearchOutline className="text-slate-300 text-2xl " />
          </fieldset> */}
        </div>
        {/* <fieldset className="flex">
          <ItemPicker
            items={["A", "B"]}
            placeholder={"A-Z"}
            getSelected={(val) => console.log(val as string)}
            // contentClassName={"p-2 bg-white text-xs"}
            triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
          />
        </fieldset> */}
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-32 w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start gap-8 items-center">
            {bookings_Tab.map((item, idx) => (
              <button
                className={`${
                  currentStatus === item.split(' ')[0].toLowerCase() && " text-sky-500"
                } text-afruna-blue text-sm md:text-base font-bold relative flex flex-col `}
                key={idx}
                onClick={() => handleTabSelect(item.split(' ')[0].toLowerCase() as tableStatus)}
              >
                {item}
                <div
                  className={`${
                    currentStatus === item.split(' ')[0].toLowerCase() && "bg-sky-500"
                  } w-full h-[2px] absolute -bottom-[0.35rem]`}
                />
              </button>
            ))}
          </div>
          <div className="bg-orange-200 w-full h-[2px] " />
        </div>
        {/* Bookings table */}
        <Component.type />
      </div>
    </section>
  );
};

export default BookingsPage;
