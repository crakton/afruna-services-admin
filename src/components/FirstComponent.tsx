import { Input } from "@/lib/utils/Input";
import { FC, useState, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import ItemPicker from "./ItemPicker";
import ReactFlagsSelect from "react-flags-select";
import getCountryUtil from "@/lib/utils/get-country.util";
import { InputLabelNumber } from "./InputLabelNumber";
import { BsPlus } from "react-icons/bs";
import { Button } from "./ui/button";
import { ServicesContext } from "@/contexts/ServicesContextProvider";
import { T_Services_Context } from "@/types/services";

interface FirstComponentProps {}

const FirstComponent: FC<FirstComponentProps> = ({}) => {
  const [country, setCountry] = useState<{ Code: string; Name: string }>({
    Code: "",
    Name: "",
  });
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const {
    register,
    formState: { errors },
  } = useForm();
  const handleCountrySelection = useCallback((value: string) => {
    let country = getCountryUtil(value);
    setCountry(country);
  }, []);

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
        <Input
          label="Business Name"
          id={"businessName"}
          type={"text"}
          placeholder="Betali 7 lavinorima plumbing service"
          register={register}
          errors={errors}
          className="px-2.5 py-2"
        />
        <div className="flex w-full flex-col gap-1 xl:flex-row gap-x-6">
          <fieldset className="flex w-full flex-col gap-1">
            <span className="text-sm font-semibold text-[#232F3E] leading-6">
              Service Category
            </span>
            <ItemPicker
              items={[
                "Kaduna state",
                "FCT",
                "Osun state",
                "Oyo state",
                "Lagos state",
                "Ogun State",
              ]}
              placeholder={"Niger State"}
              getSelected={(value) => console.log(value)}
              // contentClassName={"p-2 bg-white text-xs"}
              contentClassName="z-40"
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
              getSelected={(value) => console.log(value)}
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
              // border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
              // font-medium  rounded-md placeholder:text-gray-400 focus-visible:shadow-md
              // transition duration-300 sm:text-sm sm:leading-6
            />
            {/* {country.Name === "" && (
                  <span
                    ref={localeRef}
                    className="text-red-500 block bg-red-100 rounded-sm w-fit p-1"
                  ></span>
                )} */}
          </fieldset>
          <Input
            label="State/province"
            id={"state"}
            type={"text"}
            placeholder="Enter your state"
            register={register}
            errors={errors}
            className="px-2.5 py-2"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-x-6">
          <InputLabelNumber
            getValue={(val) => setPrice(val as unknown as number)}
            headerTitle="Price (in USD)"
            placeholder="0"
            prefix
            suffix
          />
          <Input
            label="Country"
            id={"country"}
            type={"text"}
            placeholder=""
            register={register}
            errors={errors}
            className="px-2.5 py-2"
          />
        </div>
        <fieldset className="w-full flex flex-col gap-1">
          <label className="text-sm font-semibold">Service Description</label>
          <div className="flex flex-col">
            <textarea
              rows={5}
              value={description}
              // ref={textareaRef}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter dervice description ..."
              style={{ resize: "none" }}
              className="p-3  border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
              font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
              transition duration-300 sm:text-sm sm:leading-6"
            />
            {/* {comment === "" && (
                              <span
                                ref={textareaRef}
                                className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                              ></span>
                            )} */}
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
            <InputLabelNumber
              getValue={(val) => setPrice(val as unknown as number)}
              headerTitle="Price (in USD)"
              placeholder="0"
              prefix
              suffix
            />
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
