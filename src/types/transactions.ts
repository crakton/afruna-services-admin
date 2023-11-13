import { T_Transactions_Tab } from "@/contexts/TransactionsContextProvider";

export type T_Transactions_Context = {
  transactionsTab: T_Transactions_Tab;
  handleTabSelect: (v: any) => void;
};

export type T_Other_Transactions_data = {
  transactionId: string;
  summary: string;
};
export type T_Booking_Transactions_data = {
  id: string;
  status: string;
  paymentMethod: string;
};
