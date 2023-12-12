import { IService } from "@/interfaces/IService";
import { ICustomerBio } from "./customer";
import { T_Providers } from "./providers";

export type T_Bookings = {
  _id: string;
  serviceId: IService
  customerId: ICustomerBio
  providerId: T_Providers
  amount: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: number
};
