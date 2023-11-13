"use client";

import { T_Providers_Context } from "@/types/providers";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
// import { createContext } from "vm";

interface ProvidersProviderProps {
  children: ReactNode;
}
export type T_Providers_Tab =
  | "All Providers"
  | "Pending"
  | "Verified"
  | "Rejected"
  | "Delected";

export const ProvidersContext = createContext<T_Providers_Context | null>(null);

export const ProvidersContextProvider: FC<ProvidersProviderProps> = ({ children }) => {
  const [providersTab, setProvidersTab] =
    useState<T_Providers_Tab>("All Providers");
  const handleTabSelect = useCallback(
    (tab: T_Providers_Tab) => setProvidersTab(tab),
    []
  );

  return (
    <ProvidersContext.Provider
      value={{
        providersTab,
        handleTabSelect,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};
