import { Input } from "@/lib/utils/Input";
import clsx from "clsx";
import { FC, useState } from "react";
import { BsPlus } from "react-icons/bs";

interface SecondComponentProps {
  addDays: any;
}

const SecondComponent: FC<SecondComponentProps> = ({ addDays }) => {
  const [days, setDays] = useState<
    { value: number; title: string; selected: boolean }[]
  >([
    { value: 0, title: "All Days", selected: false },
    { value: 1, title: "Monday", selected: false },
    { value: 2, title: "Tuesday", selected: false },
    { value: 3, title: "Wednesday", selected: false },
    { value: 4, title: "Thursday", selected: false },
    { value: 5, title: "Friday", selected: false },
    { value: 6, title: "Saturday", selected: false },
    { value: 7, title: "Sunday", selected: false },
  ]);
  const handleDaysSelected = (day: {
    value: number;
    title: string;
    selected: boolean;
  }) => {
    if (day.selected == false) {
      day.selected = true;
      setDays([...days]);
      addDays(day.title);
    } else {
      day.selected = false;
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 justify-start items-start mt-6 xl:max-w-[50%]">
        <h3 className=" text-sm font-bold">Service Availability</h3>
        <p className="text-xs ">
          Please tell us a little bit about the service you want listed. This
          information will show on your public profile, allowing potential
          purchasers to learn more about you.
        </p>
      </div>
      <div className="w-full xl:max-w-[75%] flex flex-col gap-4 mt-8">
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              onClick={() => handleDaysSelected(day)}
              key={day.title}
              className={clsx(
                "rounded-md px-3 py-2 bg-sky-100 text-sky-500 text-xs font-semibol",
                day.selected &&
                  "text-white bg-gradient-to-b from-blue-400 to-blue-900 "
              )}
            >
              {day.title}
            </button>
          ))}
        </div>
        <div className=" flex flex-col gap-[22px] mt-[8px]">
          <div className="gap-[22px] lg:flex lg:gap-[35px]">
            <fieldset className=" w-full flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#232F3E] leading-6">From</span>
              <input
                type="time"
                // value={formData.availability.hours.from}
                // onChange={handleChange}
                id="from"
                className="shadow-md text-sm border-[#FFDBB6] border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full
                font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                transition duration-300 sm:text-sm sm:leading-6 px-3 py-2"
              />
            </fieldset>

            <fieldset className="form-control w-full flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#232F3E] leading-6">To</span>
              <input
                type="date"
                name="to"
                // value={formData.availability.hours.to}
                // onChange={handleChange}
                id=""
                className="shadow-md text-sm border-[#FFDBB6] border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full
                font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                transition duration-300 sm:text-sm sm:leading-6 px-3 py-2"
              />
            </fieldset>
          </div>

          <div className="flex justify-start items-center">
            <button className="text-blue-500 flex justify-start items-center text-sm font-semibold">
              {" "}
              <BsPlus className="text-lg " /> Add Hours
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondComponent;
