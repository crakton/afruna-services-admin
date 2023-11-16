"use client"

import { ICreateService } from "@/interfaces/IService";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { FC, useState } from "react";

interface ServiceSetupFormProps {
    addDays: any
    formData: ICreateService
    handleChange: any
}
 
const ServiceSetupForm: FC<ServiceSetupFormProps> = ({addDays, formData, handleChange}) => {
    const [days, setDays] = useState<{value: number, title: string, selected: boolean}[]>([
        { value: 0, title: "All Days", selected: false },
        { value: 1, title: "Monday", selected: false },
        { value: 2, title: "Tuesday", selected: false },
        { value: 3, title: "Wednesday", selected: false },
        { value: 4, title: "Thursday", selected: false },
        { value: 5, title: "Friday", selected: false },
        { value: 6, title: "Saturday", selected: false },
        { value: 7, title: "Sunday", selected: false },
    ])
    const setSelectedDays = (day: { value: number, title: string, selected: boolean }) => {
        if (day.selected == false) {
            day.selected = true
            setDays([...days])
            addDays(day.title)
        } else {
            day.selected = false
        }
    }
    return ( 
        <>
            <div className="service-form flex flex-col">
                <div className="header flex flex-col gap-[17px] mb-[30px]">
                    <span className="text-[20px] font-bold text-custom-blue">Service Availability</span>
                    <span className="lg:w-[399px] text-sm text-[#080808]">Please tell us a little bit about the service you want listed. This information will show on your public profile, allowing potential purchasers to learn more about you.</span>
                </div>
                <div className="form">
                    <form action="" className="w-full flex flex-col gap-[22px]">
                        <div className="days flex flex-wrap gap-2 mb-9">
                            {days.map((day) =>
                                <span onClick={() => setSelectedDays(day)} key={day.value} className={
                                    clsx("day rounded-[6px] px-[18px] py-[10px] bg-[#E9F9FF] text-[#00AEEF] text-sm",
                                    day.selected && 'text-white active-day')}>
                                    {day.title}
                                </span>
                            )}
                        </div>

                        <div className="additional-hours flex flex-col gap-[22px] mt-[8px]">
                            <div className="double-input gap-[22px] lg:flex lg:gap-[35px]">
                                <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                    <Label className="text-sm font-semibold">From <span className="text-[red]">*</span></Label>
                                    <input type="time" name="from" value={formData.availability.hours.from} onChange={handleChange} id=""
                                        className="border-[1px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                                </div>
                                <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                    <Label className="text-sm font-semibold">To <span className="text-[red]">*</span></Label>
                                    <input type="time" name="to" value={formData.availability.hours.to} onChange={handleChange} id=""
                                        className="border-[1px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                                </div>
                            </div>
                            <div className="add-service flex items-center cursor-pointer gap-2">
                                <span className="text-4xl text-[#0199D8] font-semibold">+</span>
                                <span className="text-base text-[#0199D8] font-semibold">Add Hours</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
 
export default ServiceSetupForm;