"use client";

import { T_Bookings_Context } from "@/types/bookings";
import { T_Customers_Context } from "@/types/customers";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
// import { createContext } from "vm";

interface CustomersContextProviderProps {
  children: ReactNode;
}
export type T_Customers_Tab =
  | "All Customers"
  | "Active"
  | "Inactive"
  | "Delected";

export const CustomersContext = createContext<T_Customers_Context | null>(null);

export const CustomersContextProvider: FC<CustomersContextProviderProps> = ({ children }) => {
  const [CustomersTab, setCustomersTab] =
    useState<T_Customers_Tab>('All Customers');
  const handleTabSelect = useCallback(
    (tab: T_Customers_Tab) => setCustomersTab(tab),
    []
  );

  return (
    <CustomersContext.Provider
      value={{
        CustomersTab,
        handleTabSelect,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
