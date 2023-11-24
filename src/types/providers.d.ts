import { T_Providers_Tab } from "@/contexts/ProvidersContextProvider";
import { StaticImageData } from "next/image";

export type T_Providers_Context = {
  providersTab: T_Providers_Tab;
  handleTabSelect: (v: any) => void;
};

export type T_Providers = {
  id:number
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  avatar: string
  role: string;
  verificationToken: string;
  isVendor: boolean;
  isProvider: boolean;
  fromOauth: boolean;
  blocked: boolean;
  isFollowing: null;
  isFollower: null;
  addresses: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  online: string;
  socketId: string;
};
