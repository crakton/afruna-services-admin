import { FC } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ICreateService, IServiceCategory, IServiceSubCategory } from "@/interfaces/IService";

interface ServiceInfoFormProps {
    formData: ICreateService
    handleChange: any
    handleCategoryChange: any
    handleSubCatChange: any
    handleCountryChange: any
    handleStateChange: any
    cats: IServiceCategory[] | undefined,
    subCats: IServiceSubCategory[] | undefined
}
 
const ServiceInfoForm: FC<ServiceInfoFormProps> = ({ formData, handleChange, handleCategoryChange, handleCountryChange, handleStateChange, handleSubCatChange, cats, subCats }) => {

    return ( 
        <>
            <div className="service-form flex flex-col">
                <div className="header flex flex-col gap-[17px] mb-[30px]">
                    <span className="text-[20px] font-bold text-custom-blue">Service Information</span>
                    <span className="lg:w-[399px] text-sm text-[#080808]">Please tell us a little bit about the service you want listed. This information will show on your public profile, allowing potential purchasers to learn more about you.</span>
                </div>
                <div className="form">
                    <form action="" className="w-full flex flex-col gap-[22px]">
                        <div className="form-control flex flex-col gap-2">
                            <Label className="text-sm font-semibold">Business Name <span className="text-[red]">*</span></Label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} id="" placeholder="Betali 7 lavinorima plumbing service"
                                className="border-[1px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                        </div>

                        <div className="double-input gap-[22px] lg:flex lg:gap-[35px]">
                            <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                <Label className="text-sm font-semibold">Service category <span className="text-[red]">*</span></Label>
                                <Select name="category" value={formData.category} onValueChange={(value) => handleCategoryChange(value)}>
                                    <SelectTrigger className="shadow-md focus:outline-none text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4">
                                        <SelectValue className="text-[#777]" placeholder="Service Category" />
                                    </SelectTrigger>
                                    <SelectContent className="focus:outline-none text-sm border-[#FFDBB6] rounded-[6px]">
                                        <SelectGroup>
                                            {cats?.map(cat => (
                                                <SelectItem value={cat._id}>{ cat.name }</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                <Label className="text-sm font-semibold">Subcategory <span className="text-[red]">*</span></Label>
                                <Select onValueChange={(value) => handleSubCatChange(value)}>
                                    <SelectTrigger className="shadow-md focus:outline-none text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4">
                                        <SelectValue className="text-[#777]" placeholder="Service Subcategory" />
                                    </SelectTrigger>
                                    <SelectContent className="focus:outline-none text-sm border-[#FFDBB6] rounded-[6px]">
                                        <SelectGroup>
                                            {subCats?.map(subCat => (
                                                <SelectItem value={subCat._id}>{ subCat.name }</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="double-input gap-[22px] lg:flex lg:gap-[35px]">
                            <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                <Label className="text-sm font-semibold">Country <span className="text-[red]">*</span></Label>
                                <Select name="country" onValueChange={(value) => handleCountryChange(value)}>
                                    <SelectTrigger className="shadow-md focus:outline-none text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4">
                                        <SelectValue className="text-[#777]" placeholder="Country" />
                                    </SelectTrigger>
                                    <SelectContent className="focus:outline-none text-sm border-[#FFDBB6] rounded-[6px]">
                                        <SelectGroup>
                                            <SelectItem value="nigeria">Nigeria</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                <Label className="text-sm font-semibold">State/province <span className="text-[red]">*</span></Label>
                                <Select name="state" onValueChange={(value) => handleStateChange(value)}>
                                    <SelectTrigger className="shadow-md focus:outline-none text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4">
                                        <SelectValue className="text-[#777]" placeholder="State" />
                                    </SelectTrigger>
                                    <SelectContent className="focus:outline-none text-sm border-[#FFDBB6] rounded-[6px]">
                                        <SelectGroup>
                                            <SelectItem value="lagos">Lagos</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="double-input gap-[22px] lg:flex lg:gap-[35px]">
                            <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                <Label className="text-sm font-semibold">Price <span className="text-[red]">*</span></Label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} id="" placeholder="40"
                                    className="border-[1px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                            </div>
                            {/* <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                <Label className="text-sm font-semibold">State/province <span className="text-[red]">*</span></Label>
                                <Select>
                                    <SelectTrigger className="shadow-md focus:outline-none text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4">
                                        <SelectValue className="text-[#777]" placeholder="Service Category" />
                                    </SelectTrigger>
                                    <SelectContent className="focus:outline-none text-sm border-[#FFDBB6] rounded-[6px]">
                                        <SelectGroup>
                                            <SelectItem value="category">Category</SelectItem>
                                            <SelectItem value="category">Category</SelectItem>
                                            <SelectItem value="category">Category</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div> */}
                        </div>

                        <div className="form-control flex flex-col gap-2">
                            <Label className="text-sm font-semibold">Service description <span className="text-[red]">*</span></Label>
                            <textarea name="desc" value={formData.desc} onChange={handleChange} id="" placeholder="Enter service description"
                                className="border-[1px] h-[100px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                        </div>

                        <div className="additional-services flex flex-col gap-[22px] mt-[8px]">
                            <span className="text-[20px] text-custom-blue font-semibold">Additional Service</span>
                            <div className="double-input gap-[22px] lg:flex lg:gap-[35px]">
                                <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                    <Label className="text-sm font-semibold">Service <span className="text-[red]">*</span></Label>
                                    <input type="text" name="addService" id="" placeholder="Car Interior"
                                    className="border-[1px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                                </div>
                                <div className="form-control w-full mb-[22px] flex flex-col gap-2">
                                    <Label className="text-sm font-semibold">Price <span className="text-[red]">*</span></Label>
                                    <input type="number" name="" id="" placeholder="40"
                                        className="border-[1px] w-full shadow-md text-sm border-[#FFDBB6] rounded-[6px] px-[19px] py-4 focus:outline-none" />
                                </div>
                            </div>
                            <div className="add-service flex items-center cursor-pointer gap-2">
                                <span className="text-4xl text-[#2B33DD] font-semibold">+</span>
                                <span className="text-base text-[#2B33DD] font-semibold">Add Additional Service</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
 
export default ServiceInfoForm;