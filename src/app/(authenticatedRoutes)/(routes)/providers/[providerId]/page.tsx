"use client";

import CustomerBookingDetailsTable from "@/components/CustomerBookingDetailsTable";
import DocumentReviewTable from "@/components/DocumentReviewTable";
import ItemPicker from "@/components/ItemPicker";
import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import { RootState } from "@/redux/store";
import Provider from "@/services/provider.service";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BsStarHalf } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

type Params = {
  params: {
    providerId: string;
  };
}
const statsDetails = [
  { value: "#34564", title: "Total Sales" },
  { value: "3", title: "Service Booked" },
  { value: "2", title: "Service by Vendor" },
];

const ProviderDetailPage = ({ params: { providerId } }: Params) => {
  const providerApis = new Provider()
  const provider = useSelector((state: RootState) => state.provider.provider)
  const providerServices = useSelector((state: RootState) => state.provider.providerService)

  useEffect(() => {
    providerApis.getProvider(providerId)
    providerApis.getProviderServices(providerId)

  }, [providerId])

  return (
    <main className="flex flex-col gap-7 mb-12 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl xl:pl-8  leading-3 text-afruna-blue font-bold">
          Providers Details
        </h1>
      </div>
      <section className="max-w-[96%] lg:max-w-[86%] ml-6 xl:ml-[3.5rem] flex items-start gap-6">
        <aside className="px-5 py-8 bg-white font-semibold text-[#666363] rounded-xl flex max-w-[25%] w-full flex-col gap-2 justify-center items-center">
          <div className="w-[7rem] h-[7rem] rounded-full transition-all overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.provider3} alt="Your image" fill />
          </div>
          <div className="flex mb-3  gap-2 justify-center items-center">
            <p className="text-sm font-semibold text-afruna-blue">
              {provider.firstName} {provider.lastName}
            </p>
            <span className="rounded-full text-xs text-green-700 w-[1.2rem] h-[1.2rem] bg-green-300 flex justify-center items-center">
              <IoMdCheckmark size={13} />
            </span>
          </div>
          <span className="text-xs ">Provider Since : 27th sep, 2034</span>
          <span className="text-xs font-semibold text-[#666363]">
            {provider.email}
          </span>
          <span className="text-xs mt-3 font-semibold text-[#666363]">
            {provider.state}, {provider.country}
          </span>
          <Button variant={"deepgradientblue"} className="mt-3">
            Chat Provider
          </Button>
          <Button variant={"afrunaOutline"} className="mt-1 ">
            Suspend Provider
          </Button>
        </aside>
        <aside className="flex flex-col gap-8 w-full">
          <div className=" overflow-hidden w-full bg-white  lg:px-6 rounded-xl border shadow-sm border-slate-300">
            <header className="flex justify-start items-center py-4 ">
              <h1 className="font-bold text-slate-500 text-sm">
                Uploaded Document
              </h1>
            </header>
            <DocumentReviewTable />
          </div>
          <div className="flex flex-wrap gap-5 justify-start items-center">
            {statsDetails.map(({ title, value }) => {
              return (
                <div className="border text-sm font-semibold text-afruna-blue flex flex-col gap-2 justify-start w-[14.6rem] pt-8 h-[8rem] overflow-hidden  pl-7 border-[#D5D5E6] relative rounded-xl bg-white ">
                  <span className=" ">{value}</span>
                  <p className="text-sm ">{title}</p>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
      {/* Services */}
      <div className="max-w-[96%] w-full ml-6 px-8  flex flex-col gap-6">
        <section className="flex lg:max-w-[95%] justify-between items-center bg-white p-8 rounded-lg">
          <h3 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
            Services
          </h3>
          <div className="flex justify-end gap-5 items-center">
            <fieldset className="flex">
              <ItemPicker
                items={["A", "B"]}
                placeholder={"A-Z"}
                getSelected={(val) => console.log(val as string)}
                // contentClassName={"p-2 bg-white text-xs"}
                triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
              />
            </fieldset>
            <fieldset className="flex items-center gap-1 px-2 border border-slate-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-[0.6rem] text-xs text-slate-600"
              />
              <IoSearchOutline className="text-slate-300 text-2xl " />
            </fieldset>
          </div>
        </section>
        {/* services data */}
        <section className="flex flex-col gap-2 lg:max-w-[95%]">
          {/* Booking */}
          <div className="py-6 px-8 flex flex-col lg:gap-8 lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg">
            <div className="flex flex-col items-center sm:flex-row lg:max-w-[80%] w-full gap-6">
              <div className="flex justify-center items-center w-full h-[12rem] sm:w-[15rem] sm:h-[9rem]">
                <div className="w-full h-full overflow-hidden relative rounded-md">
                  <Image src={imgs.review1} alt="review" priority fill />
                </div>
              </div>
              <div className="flex flex-col justify-start gap-4  w-full">
                <div className="flex justify-start items-center gap-2">
                  <span className="lg:max-w-[27%] w-full text-black font-bold">
                    Video Editing
                  </span>
                  <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[73%] w-full text-afruna-gray">
                    <p className="bg-rose-100 text-red-700 px-2 py-1 w-fit ">
                      Canceled
                    </p>
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
                    Booking Date
                  </span>
                  <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                    :January 23, 2023
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
                    Account
                  </span>
                  <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                    :#1432.00
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-xs lg:max-w-[27%] w-full text-afruna-blue font-bold">
                    Location
                  </span>
                  <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                    :Kaduna
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="lg:max-w-[27%] sm:text-xs w-full text-black font-bold">
                    Provider
                  </span>
                  <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-start justify-end items-end lg:text-start lg:max-w-[73%] w-full">
                    <div className="flex items-center gap-1">
                      <div className="w-[1.3rem] h-[1.3rem] sm:w-[2rem] sm:h-[2rem] overflow-hidden rounded-full relative flex justify-center items-center">
                        <Image src={imgs.seller1} alt="review" priority fill />
                      </div>
                      <span className="sm:text-xs text-[0.65rem] text-slate-600">
                        Jahimani Masilala
                      </span>
                    </div>
                    <span className="sm:text-xs text-[0.65rem] text-[#787878]">
                      jahimani@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Booking */}
          <div className="py-6 px-8 flex flex-col lg:gap-8 lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg">
            <div className="flex flex-col items-center sm:flex-row lg:max-w-[80%] w-full gap-6">
              <div className="flex justify-center items-center w-full h-[12rem] sm:w-[13rem] sm:h-[9rem]">
                <div className="w-full h-full overflow-hidden relative rounded-md">
                  <Image src={imgs.review1} alt="review" priority fill />
                </div>
              </div>
              <div className="flex flex-col justify-start gap-4  w-full">
                <div className="flex justify-start items-center gap-2">
                  <span className="lg:max-w-[27%] w-full text-black font-bold">
                    Video Editing
                  </span>
                  <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[73%] w-full text-afruna-gray">
                    <p className="bg-green-100 text-green-700 px-2 py-1 w-fit ">
                      Completed
                    </p>
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
                    Booking Date
                  </span>
                  <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                    :January 23, 2023
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
                    Account
                  </span>
                  <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                    :#1432.00
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-xs lg:max-w-[27%] w-full text-afruna-blue font-bold">
                    Location
                  </span>
                  <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                    :Kaduna
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="lg:max-w-[27%] sm:text-xs w-full text-black font-bold">
                    Provider
                  </span>
                  <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-start justify-end items-end lg:text-start lg:max-w-[73%] w-full">
                    <div className="flex items-center gap-1">
                      <div className="w-[1.3rem] h-[1.3rem] sm:w-[2rem] sm:h-[2rem] overflow-hidden rounded-full relative flex justify-center items-center">
                        <Image src={imgs.seller1} alt="review" priority fill />
                      </div>
                      <span className="sm:text-xs text-[0.65rem] text-slate-600">
                        Jahimani Masilala
                      </span>
                    </div>
                    <span className="sm:text-xs text-[0.65rem] text-[#787878]">
                      jahimani@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProviderDetailPage
