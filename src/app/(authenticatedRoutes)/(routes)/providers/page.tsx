"use client";

import { FC, useEffect} from "react";
import ProvidersTable from "@/components/ProvidersTable";
import { IoSearchOutline } from "react-icons/io5";
import ItemPicker from "@/components/ItemPicker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Provider from "@/services/provider.service";
import { useSearchParams } from "next/navigation";
import Pagination from "../_components/Pagination";

interface pageProps {}

export type tableStatus = 'all' | 'pending' | 'verified' | 'rejected' | 'delected'
const ProvidersPage: FC<pageProps> = ({}) => {
  const totalPages = useSelector((state: RootState) => state.util.totalPages);

  const searchParams = useSearchParams();
  let page = searchParams.get("page") as string;
  console.log(page);

  if (page === null) page = "1";


  useEffect(() => {
    const providerApis = new Provider()
    providerApis.getProviders(Number(page))
  }, [page])

  return (
    <section className="flex flex-col gap-7 pb-12 ">
      <div className="flex justify-between items-center pl-4 lg:pr-32 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <h1 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
            Providers
          </h1>
          {/* <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
            <input type="text" placeholder="Search..."  className="w-full py-[0.6rem] text-xs text-slate-600" />
            <IoSearchOutline className="text-slate-300 text-2xl " />
          </fieldset> */}
        </div>
        <div className="flex justify-end items-center gap-6">
          {/* <fieldset className="flex">
            <ItemPicker
              items={["A", "B"]}
              placeholder={"A-Z"}
              getSelected={(val) => console.log(val as string)}
              contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset> */}
        </div>
      </div>
      <div className="flex flex-col px-6 xl:pr-32 w-full">
        <ProvidersTable />
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default ProvidersPage;
