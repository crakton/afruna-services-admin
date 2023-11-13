import { T_Bookings_Tab } from "@/contexts/BookingsContextProvider";
import { T_Customers_Tab } from "@/contexts/CustomersContextProvider.";
import { StaticImageData } from "next/image";

export type T_Customers_Context = {
CustomersTab: T_Customers_Tab;
  handleTabSelect: (v: any) => void;
};

export type T_Customers = {
  id: string;
  status: string;
};
