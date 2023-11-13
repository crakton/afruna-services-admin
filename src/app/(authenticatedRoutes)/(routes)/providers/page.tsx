"use client";

import {
  ProvidersContext,
  T_Providers_Tab,
} from "@/contexts/ProvidersContextProvider";
import { T_Providers_Context } from "@/types/providers";
import { FC, useContext } from "react";
import ProvidersTable from "@/components/ProvidersTable";
import { IoSearchOutline } from "react-icons/io5";
import ItemPicker from "@/components/ItemPicker";
import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";

interface pageProps {}

const Providers_Tab = [
  "All Providers",
  "Pending",
  "Verified",
  "Rejected",
  "Delected",
];

const providersPage: FC<pageProps> = ({}) => {
  const { providersTab, handleTabSelect } = useContext(
    ProvidersContext
  ) as T_Providers_Context;

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-between items-center pl-4 lg:pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
            Providers
          </h1>
          <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
            <input type="text" placeholder="Search..."  className="w-full py-[0.6rem] text-xs text-slate-600" />
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
          <Button variant={'greenbutton'}>
            {" "}
            <BsPlus className="font-extrabold text-xl" /> Add Provider
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-32 w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start gap-8 items-center">
            {Providers_Tab.map((item, idx) => (
              <button
                className={`${
                  providersTab === item && " text-sky-500"
                } text-afruna-blue text-sm md:text-base font-bold relative flex flex-col `}
                key={idx}
                onClick={() => handleTabSelect(item as T_Providers_Tab)}
              >
                {item}
                <div
                  className={`${
                    providersTab === item && "bg-sky-500"
                  } w-full h-[2px] absolute -bottom-[0.35rem]`}
                />
              </button>
            ))}
          </div>
          <div className="bg-orange-200 w-full h-[2px] " />
        </div>

        <ProvidersTable />
      </div>
    </section>
  );
};

export default providersPage;
