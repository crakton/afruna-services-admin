"use client";

import CustomerBookingDetailsTable from "@/components/CustomerBookingDetailsTable";
import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import { RootState } from "@/redux/store";
import Customers from "@/services/customer.service";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Params = {
  params: {
    customerId: string;
  };
};

export default function CustomerPage({ params: { customerId } }: Params) {
  const customersApis = new Customers();
  useEffect(() => {
    customersApis.getCustomer(customerId).then((data) => {
      console.log(data);
    });
  }, []);
  const customer = useSelector((state: RootState) => state.customer.customer);
  const createdAtDate = new Date(customer.createdAt);
  const year = createdAtDate.getFullYear();
  const day = createdAtDate.getDate();
  const monthIndex = createdAtDate.getMonth(); // Months are zero-indexed
  const month = new Date(year, monthIndex).toLocaleString("en-US", {
    month: "short",
  });
  
  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0  leading-3 text-afruna-blue font-bold">
          Customers Details
        </h1>
      </div>
      <div className="flex flex-col justify-start gap-2 px-4 md:px-10 xl:pr-32 w-full">
        <div className="w-[6rem] h-[6rem] overflow-hidden relative rounded-full">
          <Image src={customer.avatar || imgs.provider3} alt="provider" priority fill />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 w-full">
          <div className="flex flex-col gap-2 text-[#7C7C7C] text-xs font-semibold">
            <h2 className="text-lg text-afruna-blue">{`${customer.firstName} ${customer.lastName}`}</h2>
            <span className=" ">Joined since {`${day} ${month}, ${year}`}</span>
            <span className=" ">state, {customer.country}</span>
            <span className=" ">{customer.email}</span>
            <div className="flex flex-col ">
              <span className="text-sm text-black">{customer.following?.length}</span>
              <p className="">Following</p>
            </div>
          </div>
          <Button variant={"afrunaOutline"} className="text-xs">
            Remove User
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start px-4 md:px-10 xl:pr-32 ">
        <div className="flex justify-start items-start gap-2">
          <div className="border w-[13rem] py-7 pl-7 border-[#D5D5E6] rounded-xl bg-white flex flex-col gap-2">
            <span className="text-sm font-bold">#3253</span>
            <span className="text-sm font-bold">Total spent</span>
          </div>
          <div className="border w-[13rem] py-7 pl-7 border-[#D5D5E6] rounded-xl bg-white flex flex-col gap-2">
            <span className="text-sm font-bold">03</span>
            <span className="text-sm font-bold">Total booked</span>
          </div>
        </div>
        <CustomerBookingDetailsTable />
      </div>
    </section>
  );
}
