"use client";

import ItemPicker from "@/components/ItemPicker";
import ServicesTable from "@/components/ServicesTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { IService } from "@/interfaces/IService";
import { setServices } from "@/redux/features/app/service_slice";
import { setStatus } from "@/redux/features/app/table_status_slice";
import { RootState, store } from "@/redux/store";
import Service from "@/services/service.service";
import { T_Services_Context } from "@/types/services";
import { tableStatus } from "@/types/tableStatus";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

interface pageProps {}
const Services_Tab = [
  "All Services",
  "Pending Services",
  "Active Services",
  "Inactive Services",
  "Delected Services",
];

const page: FC<pageProps> = ({ }) => {
  const currentStatus = useSelector((state: RootState) => state.tableStatus.status)
  let services = useSelector((state: RootState) => state.service.services)
  const [isLoading, setIsLoading] = useState(false)

  const serviceApis = new Service()

  const handleTabSelect = (status: tableStatus) => {
    switch (status) {
      case 'all':
        store.dispatch(setStatus('all'))
        serviceApis.getServices({ setIsLoading })
        break;
      case 'pending':
        store.dispatch(setStatus('pending'))
        store.dispatch(setServices(services.filter((service: IService) => service.status === 'pending')))
        // services = services.filter((service: IService) => service.name === 'pending')
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    serviceApis.getServices({ setIsLoading })

    return () => {
      store.dispatch(setStatus('all'))
    }
  }, [])
  
  return (
    <section className="flex flex-col gap-7 pb-12">
      <div className="flex justify-between items-center pl-4 lg:pr-16 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-xl leading-3 text-afruna-blue font-bold">
            All Services
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
              getSelected={(val) => ''}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset>
          <Link
            href={"/create_service"}
            className={buttonVariants({ variant: "greenbutton" })}
          >
            <BsPlus className="font-extrabold text-xl" /> Add Service
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-16 w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start gap-8 items-center">
            {Services_Tab.map((item, idx) => (
              <button
                className={`${
                  currentStatus === item.split(' ')[0].toLowerCase() && " text-sky-500"
                } text-afruna-blue text-sm md:text-base font-bold relative flex flex-col `}
                key={idx}
                onClick={() => handleTabSelect(item.split(' ')[0].toLowerCase() as tableStatus)}
              >
                {item}
                <div
                  className={`${
                    currentStatus === item.split(' ')[0].toLowerCase() && "bg-sky-500"
                  } w-full h-[2px] absolute -bottom-[0.35rem]`}
                />
              </button>
            ))}
          </div>
          <div className="bg-orange-200 w-full h-[2px] " />
        </div>

        <ServicesTable />
      </div>
    </section>
  );
};

export default page;
