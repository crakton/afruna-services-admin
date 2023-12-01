"use client";

import ItemPicker from "@/components/ItemPicker";
import ServicesTable from "@/components/ServicesTable";
import { IService } from "@/interfaces/IService";
import { setBlockedServices, setPendingServices, setUnpublishedServices, setVerifiedServices } from "@/redux/features/app/service_slice";
import { setStatus } from "@/redux/features/app/table_status_slice";
import { RootState, store } from "@/redux/store";
import Service from "@/services/service.service";
import { FC, useEffect, useMemo } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import PendingServiceTable from "../_components/PendingServiceTable";
import BlockedServiceTable from "../_components/BlockedServiceTable";
import VerifiedServicesTable from "../_components/VerifiedServicesTable";
import UnPublishServicesTable from "../_components/UnPublishServicesTable";
import useSearchService from "@/hooks/useSearchService";

interface pageProps {}
const Services_Tab = [
  "All Services",
  "Verified Services",
  "Pending Services",
  "Unpublished Services",
  "Blocked Services",
];
export type tableStatus = 'all' | 'pending' | 'verified' | 'blocked' | 'unpublished'

const page: FC<pageProps> = ({ }) => {
  const currentStatus = useSelector((state: RootState) => state.tableStatus.status)
  let services = useSelector((state: RootState) => state.service.services)

  const serviceApis = new Service()

  const handleTabSelect = (status: tableStatus) => {
    switch (status) {
      case 'all':
        store.dispatch(setStatus('all'))
        serviceApis.getServices()
        break;
      case 'pending':
        store.dispatch(setStatus('pending'))
        store.dispatch(setPendingServices(services.filter((service: IService) => service.verified === false || service.verified === undefined  || service.blocked === true)))
        
        break;
      case 'blocked':
        store.dispatch(setStatus('blocked'))
        store.dispatch(setBlockedServices(services.filter((service: IService) => service.blocked === true)))
        break;
      case 'verified':
        store.dispatch(setStatus('verified'))
        store.dispatch(setVerifiedServices(services.filter((service: IService) =>service.verified === true || service.blocked === false && service.blocked === undefined)))
        break;
      case 'unpublished':
        store.dispatch(setStatus('unpublished'))
        store.dispatch(setUnpublishedServices(services.filter((service: IService) => service.publish === false || service.publish=== undefined )))
        break;
      default:
        break;
    }
  }
  const {searchInput,searchResult,setSearchInput} = useSearchService({data: services })
  
  const Component = useMemo(() => {
    switch (currentStatus) {
      case "pending":
        return <PendingServiceTable />;
      case "blocked":
        return <BlockedServiceTable />;
      case "verified":
        return <VerifiedServicesTable />;
      case "unpublished":
        return <UnPublishServicesTable />;
      default:
        return <ServicesTable data={searchResult}/>
    }
  }, [currentStatus, searchInput]);

  
  useEffect(() => {
    serviceApis.getServices()

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
          <div className=" text-[#D2D2D2] flex justify-center items-center">
                  <IoSearchOutline className="text-2xl" />
                </div>
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="search"
                  placeholder="Search by name or last message..."
                  className="w-full text-sm text-slate-500 placeholder:text-xs p-2 focus:outline-none placeholder:text-[#D2D2D2]"
                />
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
          {/* <Link
            href={"/create_service"}
            className={buttonVariants({ variant: "greenbutton" })}
          >
            <BsPlus className="font-extrabold text-xl" /> Add Service
          </Link> */}
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

        {/* {searchResult.map(ser => {
          return(
            <div className="text-xs">{ser.name}</div>
          )
        })} */}

        <Component.type />
      </div>
    </section>
  );
};

export default page;
