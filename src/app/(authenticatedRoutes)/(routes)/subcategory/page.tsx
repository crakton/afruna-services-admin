"use client";

import ItemPicker from "@/components/ItemPicker";
import ServicesTable from "@/components/ServicesTable";
import SubCategoryTable from "@/components/SubCategoryTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { T_Services_Context } from "@/types/services";
import Link from "next/link";
import { FC, useContext } from "react";
import { BsPlus } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

interface pageProps {}

const Subcategory: FC<pageProps> = ({}) => {
  return (
    <section className="flex flex-col gap-7 pb-12">
      <div className="flex justify-between items-center pl-4 lg:pr-16 lg:pl-6 bg-white w-full h-16">
        <div className="flex items-center justify-start gap-16">
          <div className="flex justify-start items-center gap-2">
          <h1 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-semibold">
            Services
          </h1>
          <h1 className="text-lg lg:pl-0 lg:text-base leading-3 text-gray-300 font-semibold">
            Sub category
          </h1>
          </div>
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
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset>
          <Link
            href={"/create_subcategory"}
            className={buttonVariants({ variant: "greenbutton" })}
          >
            <BsPlus className="font-extrabold text-xl" /> Add Subcategory
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 xl:pr-16 w-full">
        <SubCategoryTable />
      </div>
    </section>
  );
};

export default Subcategory
