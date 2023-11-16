"use client";

import { FC, useEffect, useState } from "react";
import ProvidersTable from "@/components/ProvidersTable";
import { IoSearchOutline } from "react-icons/io5";
import ItemPicker from "@/components/ItemPicker";
import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import Provider from "@/services/provider.service";
import { tableStatus } from "@/types/tableStatus";
import { setStatus } from "@/redux/features/app/table_status_slice";
import { setProviders } from "@/redux/features/app/provider_slice";

interface pageProps {}

const Providers_Tab = [
  "All Providers",
  "Pending",
  "Verified",
  "Rejected",
  "Delected",
];

const providersPage: FC<pageProps> = ({}) => {
  
  const currentStatus = useSelector((state: RootState) => state.tableStatus.status)
  let providers = useSelector((state: RootState) => state.provider.providers)
  const [isLoading, setIsLoading] = useState(false)

  const providerApis = new Provider()

  const handleTabSelect = (status: tableStatus) => {
    switch (status) {
      case 'all':
        store.dispatch(setStatus('all'))
        providerApis.getProviders({ setIsLoading })
        break;
      case 'pending':
        store.dispatch(setStatus('pending'))
        store.dispatch(setProviders(providers.filter((provider: any) => provider.status === 'pending')))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    providerApis.getProviders({ setIsLoading })

    return () => {
      store.dispatch(setStatus('all'))
    }
  }, [])

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

        <ProvidersTable />
      </div>
    </section>
  );
};

export default providersPage;
