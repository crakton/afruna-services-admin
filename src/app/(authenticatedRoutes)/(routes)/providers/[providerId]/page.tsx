"use client";

import CustomerBookingDetailsTable from "@/components/CustomerBookingDetailsTable";
import DocumentReviewTable from "@/components/DocumentReviewTable";
import ItemPicker from "@/components/ItemPicker";
import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import { RootState, store } from "@/redux/store";
import Provider from "@/services/provider.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LoadingProviderDetails } from "../../_components/LoadingProviderDetails";
import { setConversations } from "@/redux/features/app/chat_slice";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import location from "../../../../../assests/imgs/location.png";
import star from "../../../../../assests/imgs/star.png";
import axios, { AxiosError } from "axios";
import { handleAuthErrors } from "@/utils/auth.util";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.types";
import { headers } from "@/constants/http_config";

type Params = {
  params: {
    providerId: string;
  };
};
const statsDetails = [
  { value: "#34564", title: "Total Sales" },
  { value: "3", title: "Service Booked" },
  { value: "2", title: "Service by Vendor" },
];

const ProviderDetailPage = ({ params: { providerId } }: Params) => {
  const router = useRouter();
  const userConversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const providerServices = useSelector(
    (state: RootState) => state.provider.providerService
  );
  const providerBookings = useSelector(
    (state: RootState) => state.provider.providerBookings
  );
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [documents, setDocuments] = useState<any[]>([]);
  const [cards, setCards] = useState<any>();

  const getCardInfo = async (pid: string) => {
    try {
      const { data } = await axios.get<TSuccessResponse<any>>(
        `/api/services/${pid}/cards`,
        headers
      );
      setCards(data.data);
    } catch (error) {
      handleAuthErrors(error as AxiosError<TErrorResponse>);
    }
  };

  useEffect(() => {
    const providerApis = new Provider();
    providerApis.getProviders();
    providerApis.getProviderServices(providerId);
    providerApis.getProviderBookings(providerId);

    getCardInfo(providerId);

    // setDocuments([providerServices[0]?.insuranceCoverage, providerServices[0]?.licenseAndCertification])
  }, [providerId]);

  const providers = useSelector((state: RootState) => state.provider.providers);
  const provider = providers.filter(
    (provider) => provider._id === providerId
  )[0];
  const createdAtDate = new Date(provider?.createdAt);
  const year = createdAtDate.getFullYear();
  const day = createdAtDate.getDate();
  const monthIndex = createdAtDate.getMonth(); // Months are zero-indexed
  const month = new Date(year, monthIndex).toLocaleString("en-US", {
    month: "short",
  });

  return (
    <main className="flex flex-col gap-7 mb-12 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl xl:pl-8  leading-3 text-afruna-blue font-bold">
          Providers Details
        </h1>
      </div>
      {loading ? (
        <LoadingProviderDetails />
      ) : (
        provider && (
          <section className="max-w-[96%] lg:max-w-[86%] ml-6 xl:ml-[3.5rem] flex items-start gap-6">
            <aside className="px-5 py-8 bg-white font-semibold text-[#666363] rounded-xl flex max-w-[25%] w-full flex-col gap-2 justify-center items-center">
              <div className="w-[7rem] h-[7rem] rounded-full transition-all overflow-hidden relative flex justify-center items-center">
                {provider?.avatar ? (
                  <Image src={provider.avatar} alt="Your image" fill />
                ) : (
                  <div className="h-full w-full bg-slate-300 flex justify-center items-center text-sm">
                    {provider.firstName.charAt(0).toUpperCase()}{" "}
                    {provider.lastName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex mb-3  gap-2 justify-center items-center">
                <p className="text-sm font-semibold text-afruna-blue">
                  {provider.firstName} {provider.lastName}
                </p>
                <span className="rounded-full text-xs text-green-700 w-[1.2rem] h-[1.2rem] bg-green-300 flex justify-center items-center">
                  <IoMdCheckmark size={13} />
                </span>
              </div>
              <span className="text-xs ">
                Provider Since : {`${day} ${month}, ${year}`}
              </span>
              <span className="text-xs font-semibold text-[#666363]">
                {provider.email}
              </span>
              <span className="text-xs mt-3 font-semibold text-[#666363]">
                {`State`}, {provider.country}
              </span>
              <Button
                onClick={() => router.push(`/chat`)}
                variant={"deepgradientblue"}
                className="mt-3 mb-12"
              >
                Chat Provider
              </Button>
              {/* <Button variant={"afrunaOutline"} className="mt-1 ">
                Suspend Provider
              </Button> */}
            </aside>
            <aside className="flex flex-col gap-8 w-full">
              <div className=" overflow-hidden w-full bg-white  lg:px-6 pt-4 pb-8 rounded-xl border shadow-sm border-slate-300">
                <header className="flex justify-start items-center py-4 ">
                  <h1 className="font-bold text-slate-500 text-sm">
                    Uploaded Document
                  </h1>
                </header>
                <DocumentReviewTable documents={providerServices[0]} />
              </div>
              <div className="flex flex-wrap gap-5 justify-start items-center">
                <div className="border text-sm font-semibold text-afruna-blue flex flex-col gap-2 justify-start w-[14.6rem] pt-8 h-[8rem] overflow-hidden  pl-7 border-[#D5D5E6] relative rounded-xl bg-white ">
                  <span className=" ">{cards?.totalSales}</span>
                  <p className="text-sm ">Total Sales</p>
                </div>
                <div className="border text-sm font-semibold text-afruna-blue flex flex-col gap-2 justify-start w-[14.6rem] pt-8 h-[8rem] overflow-hidden  pl-7 border-[#D5D5E6] relative rounded-xl bg-white ">
                  <span className=" ">{cards?.totalServices}</span>
                  <p className="text-sm ">Service by Vendor</p>
                </div>
                {/* <div className="border text-sm font-semibold text-afruna-blue flex flex-col gap-2 justify-start w-[14.6rem] pt-8 h-[8rem] overflow-hidden  pl-7 border-[#D5D5E6] relative rounded-xl bg-white ">
                  <span className=" ">{Card.totalSales}</span>
                  <p className="text-sm ">Total Sales</p>
                </div> */}
              </div>
            </aside>
          </section>
        )
      )}
      {/* Services */}
      <div className="max-w-[96%] w-full ml-6 px-8  flex flex-col gap-6">
        {/* <section className="flex flex-col lg:max-w-[95%] bg-white p-8 rounded-lg">
          <div className="header flex justify-between mb-5 items-center">
            <h3 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
              Services
            </h3>
            <div className="flex justify-end gap-5 items-center">
              <fieldset className="flex">
                <ItemPicker
                  items={["A", "B"]}
                  placeholder={"A-Z"}
                  getSelected={(val) => console.log(val as string)}
                  contentClassName={"p-2 bg-white text-xs"}
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
          </div>

          <div className="services flex flex-col gap-5">
            {providerServices.map((service) => (
              <div key={service._id} className="service">
                <Card className="w-full rounded-[8px] bg-[#FAFCFF] lg:py-[21px] lg:px-[22px]">
                  <CardContent className="flex flex-col lg:flex lg:flex-row items-center justify-between">
                    <div className="img-detail lg:flex lg:flex-row lg:items-center lg:justify-center">
                      <Image
                        className="lg:mr-[21px] mb-[25px] lg:mb-0 w-full lg:w-[231px]"
                        src=""
                        alt=""
                      />
                      <div className="details flex flex-col mx-[25px] mb-[30px] lg:mx-0 lg:mb-0 justify-between gap-5">
                        <div className="top flex items-center justify-between gap-[30px]">
                          <span className="text-base mr-10 font-bold px-[10px] py-[8px] text-[#2D36FF] bg-[#D8D9FF78] rounded-[2px]">
                            {service.category.name}
                          </span>
                          <span className="flex items-center gap-2">
                            {service.ratings === 0 ? (
                              <span>Rating</span>
                            ) : (
                              [...Array(Math.floor(service.ratings))].map(
                                (v, i) => <Image key={v} src={star} alt="" />
                              )
                            )}
                            {service.ratings}
                          </span>
                        </div>
                        <span className="font-bold text-lg text-custom-blue">
                          {service.name}
                        </span>
                        <div className="location flex items-center gap-[7px]">
                          <Image src={location} width={10} height={10} alt="" />
                          <span className="text-[#707070] font-semibold text-sm">
                            {service.state} {service.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section> */}
        {/* services data */}
        <section className="flex flex-col lg:max-w-[95%] bg-white p-8 rounded-lg">
          <div className="header flex justify-start mb-12 items-center">
            <h3 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
              Provider Services
            </h3>
            {/* <div className="flex justify-end gap-5 items-center">
              <fieldset className="flex">
                <ItemPicker
                  items={["A", "B"]}
                  placeholder={"A-Z"}
                  getSelected={(val) => console.log()}
                  contentClassName={"p-2 bg-white text-xs"}
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
            </div> */}
          </div>
          {/* Booking */}
          <div className="bookings flex flex-col gap-5">
            {providerServices && providerServices.length > 0 ? (
              providerServices.map((ser) => {
                const createdAtDate = new Date(ser.createdAt);
                const year = createdAtDate.getFullYear();
                const day = createdAtDate.getDate();
                const monthIndex = createdAtDate.getMonth(); // Months are zero-indexed
                const month = new Date(year, monthIndex).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                  }
                );
                return (
                  <div key={ser._id} className="w-full border p-4 rounded-lg">
                    <div className="flex flex-col items-center sm:flex-row lg:max-w-[80%] w-full gap-6">
                      <div className="w-fit">
                        <div className="flex justify-center items-center w-[18rem]  h-[12rem] sm:h-[14rem] ">
                          <div className="w-full h-full overflow-hidden relative rounded-md">
                            {ser.photos.length ? (
                              <Image
                                src={
                                  ser.photos[0].includes("https://")
                                    ? ser.photos[0]
                                    : `https://${ser.photos[0]}`
                                }
                                alt="Your image"
                                fill
                              />
                            ) : (
                              <Image
                                src={imgs.fallback_ser_img}
                                alt="Your image"
                                fill
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start gap-4 w-full">
                        <div className="flex justify-start items-center gap-2">
                          <span className="lg:max-w-[35%] w-full text-black font-bold">
                            Service name
                          </span>
                          <span className="sm:text-sm flex justify-end lg:justify-start font-bold lg:max-w-[65%] w-full text-afruna-gray">
                            {ser.name}
                          </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <span className="lg:max-w-[35%] w-full text-black font-bold text-sm">
                            Status
                          </span>
                          <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[65%] w-full text-afruna-gray">
                            <p className="bg-rose-100 text-red-700 px-2 py-1 w-fit ">
                              {ser.status}
                            </p>
                          </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <span className="text-xs  lg:max-w-[35%] w-full text-black font-bold">
                            Created on
                          </span>
                          <span className="text-xs text-end lg:text-start lg:max-w-[65%] w-full text-slate-800">
                            {`${day} ${month}, ${year}`}
                          </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <span className="text-xs  lg:max-w-[35%] w-full text-black font-bold">
                            Amount
                          </span>
                          <span className="text-xs text-end lg:text-start lg:max-w-[65%] w-full text-slate-800">
                            #{ser.price}
                          </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <span className="text-xs  lg:max-w-[35%] w-full text-black font-bold">
                            Rating
                          </span>
                          {/* <span className="text-xs  text-slate-800">
                      #{ser.price}
                    </span> */}
                          <div className="flex justify-start items-center gap-1 text-[#FF9E3A] text-xs text-end lg:text-start lg:max-w-[65%] w-full">
                            {Array(5)
                              .fill("_")
                              .map((star, index) => (
                                <div
                                  className={`${
                                    index < ser.ratings
                                      ? "text-[#FF9E3A]"
                                      : "text-slate-500"
                                  }  text-sm md:text-xs cursor-pointer`}
                                  key={index}
                                >
                                  {index < ser.ratings ? (
                                    index === Math.floor(ser.ratings) &&
                                    ser.ratings % 1 !== 0 ? (
                                      <BsStarHalf />
                                    ) : (
                                      <BsStarFill />
                                    )
                                  ) : (
                                    <BsStar />
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <span className="text-xs lg:max-w-[35%] w-full text-afruna-blue font-bold">
                            Location
                          </span>
                          <span className="text-xs text-end lg:text-start lg:max-w-[65%] w-full text-slate-800">
                            {ser.state}, {ser.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className=" h-20 w-full flex justify-center items-center text-center font-bold">
                Currently, there is no service by this vendor
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProviderDetailPage;
