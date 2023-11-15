"use client";

import FirstComponent from "@/components/FirstComponent";
import SecondComponent from "@/components/SecondComponent";
import ThirdComponent from "@/components/ThirdComponent";
import { Button } from "@/components/ui/button";
import { ServicesContext } from "@/contexts/ServicesContextProvider";
import { T_Services_Context } from "@/types/services";
import { ExtFile } from "@files-ui/react";
import { usePathname } from "next/navigation";
import * as Progress from "@radix-ui/react-progress";
import {
  FC,
  useContext,
  useEffect,
  useCallback,
  useState,
  ChangeEvent,
} from "react";
import getCountryUtil from "@/lib/utils/get-country.util";
import { IServiceCategory, IServiceSubCategory } from "@/interfaces/IService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Service from "@/services/services.service";

interface pageProps {}

const CreateServicePage: FC<pageProps> = ({}) => {
  const { variantCompt, setVariantCompt } = useContext(
    ServicesContext
  ) as T_Services_Context;

  const serviceId = useSelector((state: RootState) => state.service.serviceId);
  const serviceToUpdate = useSelector(
    (state: RootState) => state.service.service
  );

  const serviceApis = new Service();

  const [categories, setCategories] = useState<IServiceCategory[]>();
  const [subCategories, setSubCategories] = useState<IServiceSubCategory[]>();

  const [name, setName] = useState<string>("");
  const handlechangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setName(value);
  };
  const [serviceCategory, setServiceCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>('') 
  const handlechangeServiceCat = (val: string) => {
    setServiceCategory(val);
    serviceApis
      .getServiceSubCategories(val)
      .then((data) => setSubCategories(data?.data));
  };
  const handlechangeSubCategory = (val: string) => {
    setSubCategory(val);
  };
  const [state, setState] = useState<string>("");
  const handlechangeState = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setState(value);
  };
  const [country, setCountry] = useState<{ Code: string; Name: string }>({
    Code: "",
    Name: "",
  });
  const handleCountrySelection = useCallback((value: string) => {
    let country = getCountryUtil(value);
    setCountry(country);
  }, []);
  const [price, setPrice] = useState<number>(0);
  const handlechangePrice = (value: number) => {
    setPrice(value);
  };
  const [desc, setDesc] = useState<string>("");
  const handlechangeDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setDesc(value);
  };

  useEffect(() => {
    console.log({ name, state, price, desc, serviceCategory, subCategory });
  }, [name, state, price, desc, serviceCategory, subCategory]);
  const addDays = (day: string) => {
    console.log(day);

    // const updateFormData = { ...serviceFormData }
    // updateFormData.availability.days = [...updateFormData.availability.days, day]
    // setServiceFormData(updateFormData)
  };

  const [files, setFiles] = useState<ExtFile[]>([]);
  const [secStep, setSecStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const orderSteps = [
    {
      step: true,
      num: 1,
    },
    {
      step: secStep,
      num: 2,
    },
    {
      step: thirdStep,
      num: 3,
    },
  ];
  const [progress, setProgress] = useState(10);

  const handlePreviousStep = useCallback(() => {
    if (variantCompt === "2ndCompt") {
      setVariantCompt("1stCompt");
      setProgress(0);
      setSecStep(false);
      return;
    }
    if (variantCompt === "3rdCompt") {
      setVariantCompt("2ndCompt");
      setProgress(50);
      setThirdStep(false);
      return;
    }
  }, [setVariantCompt, variantCompt]);
  const handleNextStep = useCallback(() => {
    if (variantCompt === "1stCompt") {
      setVariantCompt("2ndCompt");
      setProgress(50);
      setSecStep(true);
      return;
    }
    if (variantCompt === "2ndCompt") {
      setVariantCompt("3rdCompt");
      setProgress(100);
      setThirdStep(true);
      return;
    }
    if (variantCompt === "3rdCompt") {
      setVariantCompt("1stCompt");
      setProgress(0);
      setThirdStep(false);
      setSecStep(false);
      return;
    }
  }, [setVariantCompt, variantCompt]);

  useEffect(() => {
    const categoriesData = serviceApis.getServiceCategories();
    categoriesData.then((data) => setCategories(data?.data));
    if (serviceId) {
      console.log(serviceToUpdate);
      serviceApis.getService(serviceId);
      // setServiceFormData({...serviceToUpdate})
    }
  }, []);

  return (
    <main className=" mx-6 xl:ml-8 mt-8 mb-16 xl:mr-[4.5rem] p-2 xl:p-20 xl:pb-28 bg-white rounded-xl">
      {/* <div className="w-full   "> */}
      <div className="flex flex-col gap-4 mb-12 justify-start items-start">
        <h3 className=" font-bold">Service Setup steps</h3>
        <div className="flex justify-between relative items-center pt-4 max-w-[60%] w-full">
          {orderSteps.map(({ step, num }, index) => {
            return (
              <div
                key={index}
                className="flex gap-8 justify-between items-center"
              >
                <div
                  className={`${
                    step ? "border-blue-500" : "border-gray-400"
                  }  w-[2.5rem] h-[2.5rem] z-20 border-2 border-blue-500 rounded-full flex justify-center items-center`}
                >
                  <div
                    className={`w-[2rem] h-[2rem] z-20 text-white rounded-full flex justify-center items-center ${
                      step ? "bg-blue-500  " : "bg-gray-400 "
                    }`}
                  >
                    {num}
                  </div>
                </div>
              </div>
            );
          })}
          <Progress.Root
            className="absolute top-[65%] left-0 right-0 overflow-hidden max-w-[88%] mx-auto bg-[#D3D3D3] rounded-full w-full h-[2px]"
            style={{
              // Fix overflow clipping in Safari
              // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
              transform: "translateZ(0)",
            }}
            value={progress}
          >
            <Progress.Indicator
              className="bg-blue-400 w-full h-full transition-transform duration-[660ms] "
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>
      </div>
      {variantCompt === "3rdCompt" ? (
        <ThirdComponent files={files} setFiles={setFiles} />
      ) : variantCompt === "2ndCompt" ? (
        <SecondComponent addDays={addDays} />
      ) : (
        <FirstComponent
          name={name}
          handlechangeName={handlechangeName}
          price={price}
          country={country}
          handleCountrySelection={handleCountrySelection}
          state={state}
          handleStateChange={handlechangeState}
          desc={desc}
          handlechangeDesc={handlechangeDesc}
          handlechangePrice={handlechangePrice}
          cats={categories}
          handlechangeServiceCat={handlechangeServiceCat}
          subCats={subCategories}
          handlechangeSubCategory={handlechangeSubCategory}
        />
      )}
      {/* <Component.type /> */}
      <div className="flex justify-end items-center max-w-[75%] gap-8 mt-10">
        {variantCompt === "2ndCompt" || variantCompt === "3rdCompt" ? (
          <Button
            type="button"
            variant={"primary"}
            className="max-w-[8rem] w-full"
            onClick={handlePreviousStep}
          >
            Previous
          </Button>
        ) : null}
        <Button
          type="button"
          variant={"primary"}
          className="max-w-[8rem] w-full"
          onClick={handleNextStep}
        >
          {variantCompt === "3rdCompt" ? "Done" : "Next"}
        </Button>
      </div>
      {/* </div> */}
    </main>
  );
};

export default CreateServicePage;
