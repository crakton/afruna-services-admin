"use client";

import { ICustomerBio } from "@/types/customer";
import useSearchCustomer from "@/hooks/useSearchCustomer";
import { RootState } from "@/redux/store";
import Customers from "@/services/customer.service";
import { useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomersTable from "@/components/CustomersTable";
import Pagination from "../_components/Pagination";

interface CustomersPageProps {}

const CustomersPage: FC<CustomersPageProps> = ({}) => {
  const totalPages = useSelector((state: RootState) => state.util.totalPages);

  const searchParams = useSearchParams();
  let page = searchParams.get("page") as string;
  console.log(page);

  if (page === null) page = "1";

  useEffect(() => {
    const customersApis = new Customers();
    customersApis.getAllCustomers(Number(page));
    // return () => {
    //   store.dispatch(setCustomerStatus('all'))
    // }
  }, [page]);
  const customers = useSelector((state: RootState) => state.customer.customers);
  const { searchCustomerInput,searchCustomerResult,setSearchCustomerInput } =
  useSearchCustomer<ICustomerBio>({ data: customers });

  return (
    <section className="flex flex-col gap-6 pb-8 ">
      <div className="flex justify-between items-center pl-4 lg:pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
            Customers
          </h1>
        </div>
      </div>
      <div className="flex flex-col px-6 xl:pr-32 w-full">
        {/* Bookings table */}
        <CustomersTable searchCustomerResult={customers} />
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default CustomersPage;
