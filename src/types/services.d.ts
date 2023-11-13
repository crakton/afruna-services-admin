import { T_Services_Tab, VariantCompt } from "@/contexts/ServicesContextProvider";

export type T_Top_Service = {
  id: string;
  amount: string;
};

export type T_Services_Context = {
  servicesTab: T_Services_Tab;
  handleTabSelect: (v: any) => void;
  setVariantCompt: SetStateAction<VariantCompt>;
  variantCompt: string
};

export type T_Service = {
  id: string
  status: string
  created_by: string
}
export type T_SubCategory = {
  id: string
  featured: boolean
}
