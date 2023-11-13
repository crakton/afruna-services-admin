"use client";

import { T_Services_Context } from "@/types/services";
import { FC, ReactNode, createContext, useCallback, useState } from "react";

interface ServicesProviderProps {
  children: ReactNode;
}
export type T_Services_Tab =
  | "All Services"
  | "Pending Services"
  | "Active Services"
  | "Inactive Services"
  | "Delected Services"


  
export type VariantCompt = "1stCompt" | "2ndCompt" | '3rdCompt';

export const ServicesContext = createContext<T_Services_Context | null>(null);

export const ServicesContextProvider: FC<ServicesProviderProps> = ({ children }) => {
  
const [variantCompt, setVariantCompt] = useState<VariantCompt>("1stCompt");
  const [servicesTab, setServicesTab] =
    useState<T_Services_Tab>('All Services');
  const handleTabSelect = useCallback(
    (tab: T_Services_Tab) => setServicesTab(tab),
    []
  );

  return (
    <ServicesContext.Provider
      value={{
        servicesTab,
        variantCompt, 
        setVariantCompt,
        handleTabSelect,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
