import { T_Providers_Tab } from "@/contexts/ProvidersContextProvider";
import { StaticImageData } from "next/image";

export type T_Providers_Context = {
    providersTab: T_Providers_Tab
    handleTabSelect: (v: any) => void;
  }

  export type T_Providers={
		id: string,
		providerName: string,
		img: StaticImageData,
		email: string,
		phone: string,
		status: string,
	}