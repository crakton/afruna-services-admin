import { T_Bookings_Tab } from "@/contexts/BookingsContextProvider";
import { StaticImageData } from "next/image";

export type T_Bookings_Context = {
  bookingsTab: T_Bookings_Tab;
  handleTabSelect: (v: any) => void;
};

export type T_Bookings = {
  id: string;
  status: string;
};
