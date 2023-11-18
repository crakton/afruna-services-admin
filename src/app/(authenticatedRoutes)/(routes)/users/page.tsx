"use client";

import { FC, useEffect } from "react";
import CustomersTable from "@/components/CustomersTable";
import { IoSearchOutline } from "react-icons/io5";
import ItemPicker from "@/components/ItemPicker";
import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import Customers from "@/services/customer.service";
import {
  setCustomerStatus,
  setCustomers,
} from "@/redux/features/app/customer_slice";

interface pageProps {}

const customers_Tab = ["All Customers", "Active", "Inactive", "Delected"];
export type tableStatus = "all" | "active" | "inactive" | "deleted";

const CustomersPage: FC<pageProps> = ({}) => {
  const currentStatus = useSelector(
    (state: RootState) => state.customer?.customerStatus
  );
  const customers = useSelector((state: RootState) => state.customer.customers);
  
  const customersApis = new Customers();

  const handleTabSelect = (status: tableStatus) => {
    switch (status) {
      case "all":
        store.dispatch(setCustomerStatus("all"));
        customersApis.getAllCustomers();
        break;
      case "active":
        store.dispatch(setCustomerStatus("active"));
        store.dispatch(
          setCustomers(
            customers.filter((customer: any) => customer.status === "active")
          )
        );
        break;
      case "inactive":
        store.dispatch(setCustomerStatus("active"));
        store.dispatch(
          setCustomers(
            customers.filter((customer: any) => customer.status === "inactive")
          )
        );
        break;
      case "deleted":
        store.dispatch(setCustomerStatus("deleted"));
        store.dispatch(
          setCustomers(
            customers.filter((customer: any) => customer.status === "active")
          )
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    customersApis.getAllCustomers()
    return () => {
      store.dispatch(setCustomerStatus('all'))
    }
  }, [])

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-between items-center pl-4 lg:pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
            Customers
          </h1>
          <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-[0.6rem] text-xs text-slate-600"
            />
            <IoSearchOutline className="text-slate-300 text-2xl " />
          </fieldset>
        </div>
        <div className="flex justify-end items-center gap-6">
          <fieldset className="flex">
            <ItemPicker
              items={["A", "B"]}
              placeholder={"A-Z"}
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset>
          <Button variant={"greenbutton"}>
            {" "}
            <BsPlus className="font-extrabold text-xl" /> Add User
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-32 w-full">
        <div className="flex flex-col gap-1 w-full">
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
        </div>
        {/* Bookings table */}
        <CustomersTable />
      </div>
    </section>
  );
};

export default CustomersPage;
