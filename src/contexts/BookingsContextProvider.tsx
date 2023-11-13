"use client";

import { T_Bookings_Context } from "@/types/bookings";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
// import { createContext } from "vm";

interface BookingsContextProviderProps {
  children: ReactNode;
}
export type T_Bookings_Tab =
  | "All Bookings"
  | "Pending"
  | "Active"
  | "Inactive"
  | "Delected";

export const BookingsContext = createContext<T_Bookings_Context | null>(null);

export const BookingsContextProvider: FC<BookingsContextProviderProps> = ({ children }) => {
  const [bookingsTab, setBookingsTab] =
    useState<T_Bookings_Tab>("All Bookings");
  const handleTabSelect = useCallback(
    (tab: T_Bookings_Tab) => setBookingsTab(tab),
    []
  );

  return (
    <BookingsContext.Provider
      value={{
        bookingsTab,
        handleTabSelect,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
