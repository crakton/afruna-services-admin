"use client";

import { ChangeEventHandler, FC, useCallback, useEffect } from "react";
import CustomersTable from "@/components/CustomersTable";
import { IoSearchOutline } from "react-icons/io5";
import ItemPicker from "@/components/ItemPicker";
import Customers from "@/services/customer.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSearchUsers from "@/hooks/useSearchUsers";
import { ICustomerBio } from "@/types/customer";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
// import { SelectItem } from "@radix-ui/react-select";
import useSearchCustomer from "@/hooks/useSearchCustomer";

interface pageProps {}

export const sortType = ["Ascending","Descending"]
// const customers_Tab = ["All Customers", "Active", "Inactive", "Delected"];
export type tableStatus = "all" | "active" | "inactive" | "deleted";

const CustomersPage: FC<pageProps> = ({}) => {
  // const currentStatus = useSelector(
  //   (state: RootState) => state.customer?.customerStatus
  // );
  // const customers = useSelector((state: RootState) => state.customer.customers);

  const customersApis = new Customers();

  // const handleTabSelect = (status: tableStatus) => {
  //   switch (status) {
  //     case "all":
  //       store.dispatch(setCustomerStatus("all"));
  //       customersApis.getAllCustomers();
  //       break;
  //     case "active":
  //       store.dispatch(setCustomerStatus("active"));
  //       store.dispatch(
  //         setCustomers(
  //           customers.filter((customer: any) => customer.status === "active")
  //         )
  //       );
  //       break;
  //     case "inactive":
  //       store.dispatch(setCustomerStatus("active"));
  //       store.dispatch(
  //         setCustomers(
  //           customers.filter((customer: any) => customer.status === "inactive")
  //         )
  //       );
  //       break;
  //     case "deleted":
  //       store.dispatch(setCustomerStatus("deleted"));
  //       store.dispatch(
  //         setCustomers(
  //           customers.filter((customer: any) => customer.status === "active")
  //         )
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // };
  useEffect(() => {
    customersApis.getAllCustomers();
    // return () => {
    //   store.dispatch(setCustomerStatus('all'))
    // }
  }, []);
  const customers = useSelector((state: RootState) => state.customer.customers);
  const { searchCustomerInput,searchCustomerResult,setSearchCustomerInput } =
    useSearchCustomer<ICustomerBio>({ data: customers });
  
  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-between items-center pl-4 lg:pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
            Customers
          </h1>
          <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
            <input
              value={searchCustomerInput}
              onChange={(e) => setSearchCustomerInput(e.target.value)}
              type="search"
              // type="text"
              placeholder="Search..."
              className="w-full py-[0.6rem] text-xs text-slate-600"
            />
            <IoSearchOutline className="text-slate-300 text-2xl " />
          </fieldset>
        </div>
        <div className="flex justify-end items-center gap-6">
           <fieldset className="flex">
            <ItemPicker
              items={["Ascending","Descending"]}
              placeholder={"Sorting"}
              getSelected={ (value) => {}
                // setSortingType(value as "ascending" | "descending")
              }
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[12rem] w-full"
            />
          </fieldset>
          {/* <Select.Root
						onValueChange={
							setSortingType as (value: string) => void
						}
					>
						<Select.Trigger className="flex md:col-span-1 items-center gap-2 p-3 border rounded-lg">
							<Select.Value placeholder={"Sorting"} />
							<Select.Icon>
								<ChevronDownIcon />
							</Select.Icon>
						</Select.Trigger>
						<Select.Portal>
							<Select.Content
								className="p-2 bg-white gap-2"
								position="popper"
							>
								<Select.Viewport>
									{sortType.map((date) => (
										<SelectItem key={date} value={date}>
											{date}
										</SelectItem>
									))}
								</Select.Viewport>
							</Select.Content>
						</Select.Portal>
					</Select.Root> */}
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-32 w-full">
        {/* <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start gap-8 items-center">
            {customers_Tab.map((item, idx) => (
              <button
                className={`${
                  currentStatus === item.split(" ")[0].toLowerCase() &&
                  " text-sky-500"
                } text-afruna-blue text-sm md:text-base font-bold relative flex flex-col `}
                key={idx}
                onClick={() =>
                  handleTabSelect(
                    item.split(" ")[0].toLowerCase() as tableStatus
                  )
                }
              >
                {item}
                <div
                  className={`${
                    currentStatus === item.split(" ")[0].toLowerCase() &&
                    "bg-sky-500"
                  } w-full h-[2px] absolute -bottom-[0.35rem]`}
                />
              </button>
            ))}
          </div>
          <div className="bg-orange-100 w-full h-[2px] " />
        </div> */}
        {/* Bookings table */}
        <CustomersTable searchCustomerResult={searchCustomerResult}/>
      </div>
    </section>
  );
};

export default CustomersPage;
