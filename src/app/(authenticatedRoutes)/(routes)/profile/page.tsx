'use client'

import { imgs } from "@/constants/images";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface pageProps {}

const ProfilePage: FC<pageProps> = ({}) => {
const adminBio = useSelector((state:RootState) => state.auth.userBio)
  
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  useMemo(() => {
    setName(`Admin`);
    setEmail(`admin@afruna.com`);
    setCountry(`Nigeria`);
  }, [setName, setEmail, setCountry]);
  return (
    <main className="min-h-screen flex gap-8 flex-col">
      <section className="flex md:pl-0 justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
          Profile
        </h1>
      </section>
      <div className="md:pr-16 lg:pr-64">
      <section className="flex p-8 rounded-lg gap-8 flex-col w-full bg-white max-w-[95%] mx-auto justify-start border border-slate-300">
        <div className=" relative bg-afruna-blue/60 ring-4 ring-slate-300 w-20 h-20 md:w-28 md:h-28 flex justify-center items-center overflow-hidden object-contain rounded-full">
          <Image
            src={imgs.afruna_2nd_logo}
            alt="Image"
            priority
            className=" w-full object-contain"
          />
        </div>
        <div className="h-[1px] w-full bg-slate-300" />
        <form className="flex flex-col gap-4 py-4 md:py-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <fieldset className="w-full gap-2 flex flex-col">
              <label
                className="text-[0.9rem] font-semibold"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jov"
                name="name"
                value={name}
                className="w-full placeholder:text-[#959191] px-4 py-2 border border-[#E0E0E0] rounded-md shadow-sm outline-none"
                // {...register("name", {
                // 	required: true,
                // 	maxLength: 100,
                // })}
                readOnly
              />
            </fieldset>
            <fieldset className="w-full gap-2 flex flex-col">
              <label
                className="text-[0.9rem] font-semibold"
                htmlFor="email-address"
              >
                Email address
              </label>
              <input
                id="vendor-email"
                type="email"
                placeholder="Jondov@gmail.com"
                value={email}
                className="w-full placeholder:text-[#959191] px-4 py-2 border border-[#E0E0E0] rounded-md shadow-sm outline-none"
                // {...register("email", {
                // 	required: true,
                // 	pattern:
                // 		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                // })}
                readOnly
              />
            </fieldset>
          </div>
          <fieldset className="sm:max-w-[49%] gap-2 flex flex-col">
            <label className="text-[0.9rem] font-semibold" htmlFor="country">
              Country of Residence
            </label>
            <input
              id="country"
              type="country"
              placeholder="Ghana"
              value={country}
              className="w-full placeholder:text-[#959191] px-4 py-2 border border-[#E0E0E0] rounded-md shadow-sm outline-none"
              // {...register("country", {
              // 	required: true,
              // })}
              readOnly
            />
          </fieldset>
        </form>
      </section>
      </div>
    </main>
  );
};

export default ProfilePage;
