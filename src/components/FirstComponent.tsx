import { ChangeEvent, FC } from "react";
import ItemPicker from "./ItemPicker";
import ReactFlagsSelect from "react-flags-select";
import { InputLabelNumber } from "./InputLabelNumber";
import { BsPlus } from "react-icons/bs";
import { IServiceCategory, IServiceSubCategory } from "@/interfaces/IService";

interface FirstComponentProps {
  name: string;
  handlechangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  price: number;
  handlechangePrice: (value: number) => void;
  country: { Code: string; Name: string };
  handleCountrySelection: (value: string) => void;
  state: string;
  handleStateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  desc: string;
  handlechangeDesc: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  cats: IServiceCategory[] | undefined;
  handlechangeServiceCat: (val: string) => void
  subCats: IServiceSubCategory[] | undefined;
  handlechangeSubCategory: (val : string) => void
}

const FirstComponent: FC<FirstComponentProps> = ({
  name,
  handlechangeName,
  handlechangePrice,
  country,
  handleCountrySelection,
  state,
  handleStateChange,
  desc,
  handlechangeDesc,
  cats,
  handlechangeServiceCat,
  handlechangeSubCategory
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-start items-start mt-6 xl:max-w-[50%]">
        <h3 className=" text-sm font-bold">Service Information</h3>
        <p className="text-xs ">
          Please tell us a little bit about the service you want listed. This
          information will show on your public profile, allowing potential
          purchasers to learn more about you.
        </p>
      </div>
      <form className="w-full xl:max-w-[75%] flex flex-col gap-4 mt-8">
        <fieldset className="w-full">
          <label
            htmlFor={"name"}
            className="text-sm font-semibold text-[#232F3E] leading-6"
          >
            {"Business Name"}
          </label>
          <div className={`mt-1 flex justify-center items-center gap-2`}>
            <input
              id={"name"}
              type={"text"}
              value={name}
              onChange={handlechangeName}
              placeholder={"Betali 7 lavinorima plumbing service"}
              autoComplete={"name"}
              className={`form-input px-2.5 py-2 w-full border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6`}
            />
          </div>
        </fieldset>
        <div className="flex w-full flex-col gap-1 xl:flex-row gap-x-6">
          <fieldset className="flex w-full flex-col gap-1">
            <span className="text-sm font-semibold text-[#232F3E] leading-6">
              Service Category
            </span>
            <ItemPicker
              items={cats!?.map((i) => i.name)}
              placeholder={"Home Service"}
              getSelected={(val) => handlechangeServiceCat(val as string)}
              contentClassName="z-40 p-2 bg-white text-xs"
              triggerClassName="p-[13px] rounded-lg min-w-[100%] "
            />
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <span className="text-sm font-semibold text-[#232F3E] leading-6">
              Sub Category
            </span>
            <ItemPicker
              items={[]}
              placeholder={"Bosso estate minnna class 1baluba"}
              getSelected={(val) => handlechangeSubCategory(val as string)}
              contentClassName="z-40"
              triggerClassName="p-[13px] rounded-lg min-w-[100%]"
            />
          </fieldset>
        </div>
        <div className="flex flex-col xl:flex-row gap-x-6">
          <fieldset className="w-full">
            <label
              htmlFor="country"
              className="text-sm font-semibold text-[#232F3E] leading-6"
            >
              Country
            </label>
            <ReactFlagsSelect
              id="country"
              searchable
              onSelect={handleCountrySelection}
              selected={country.Code}
              // customLabels={}
              selectButtonClassName="py-2"
              className="myCustomFlagsSelect mb-0 mt-1 "
            />
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor={"state"}
              className="text-sm font-semibold text-[#232F3E] leading-6"
            >
              {"State/province"}
            </label>
            <div className={`mt-1 flex justify-center items-center gap-2`}>
              <input
                id={"state"}
                type={"text"}
                value={state}
                onChange={handleStateChange}
                placeholder={"Enter your state"}
                autoComplete={"state"}
                // disabled={isLoading}
                className={`form-input px-2.5 py-1.5 w-full border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6`}
              />
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col xl:flex-row gap-x-6 md:max-w-[48.5%]">
          <InputLabelNumber
            getValue={(val) => handlechangePrice(val as number)}
            headerTitle="Price (in USD)"
            placeholder="0"
            prefix
            suffix
          />
        </div>
        <fieldset className="w-full flex flex-col gap-1">
          <label className="text-sm font-semibold">Service Description</label>
          <div className="flex flex-col">
            <textarea
              rows={5}
              value={desc}
              onChange={ handlechangeDesc}
              placeholder="Enter dervice description ..."
              style={{ resize: "none" }}
              className="p-3  border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
              font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
              transition duration-300 sm:text-sm sm:leading-6"
            />
          </div>
        </fieldset>

        {/* Additional Service */}
        <div className="flex flex-col mt-8 gap-4 justify-start items-start">
          <h3 className=" font-bold">Additional Service </h3>
          <div className="flex flex-col xl:flex-row gap-x-6 w-full">
            <fieldset className="flex w-full flex-col gap-1">
              <span className="text-sm font-semibold text-[#232F3E] leading-6">
                Service
              </span>
              <ItemPicker
                items={[
                  "Home service",
                  "FCT",
                  "Osun state",
                  "Oyo state",
                  "Lagos state",
                  "Ogun State",
                ]}
                placeholder={"Home service"}
                getSelected={(value) => console.log(value)}
                // contentClassName={"p-2 bg-white text-xs"}
                contentClassName="z-40"
                triggerClassName="p-[13px] rounded-lg min-w-[100%] "
              />
            </fieldset>
            {/* <InputLabelNumber
              getValue={(val) => setPrice(val as unknown as number)}
              headerTitle="Price (in USD)"
              placeholder="0"
              prefix
              suffix
            /> */}
          </div>
          <div className="flex justify-start items-center pl-4">
            <button className="text-sm text-blue-600 font-semibold flex justify-start items-center">
              {" "}
              <BsPlus className="text-xl inline-flex" /> Add Additional Service
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FirstComponent;
