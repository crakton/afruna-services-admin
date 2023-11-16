"use client";

import ItemPicker from "@/components/ItemPicker";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import Service from "@/services/service.service";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { GoTrash } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface pageProps {}

const CreateSubCategoryPage: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [subCategoryForm, setSubCategoryForm] = useState<{ name: string, parent: string }>({
    name: '',
    parent: ''
  })

  const categories = useSelector((state: RootState) => state.service.serviceCategories)

  const serviceApis = new Service()
  const router = useRouter()

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setSubCategoryForm({ ...subCategoryForm, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (subCategoryForm.name == '') {
      toast.error('Category name must be provided')
      return
    }

    serviceApis.createCategory(subCategoryForm, { setIsLoading })
      .then((data) => {
        toast.success('Category created')
        router.push('/category')
      })
  }

  return (
    <section className="flex flex-col gap-6 pb-12 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
          Create Sub Category
        </h1>
      </div>
      <div className="flex flex-col justify-start p-20 items-start max-w-[85%] ml-8 rounded-xl bg-white w-full">
        <h2 className=" font-semibold text-black mb-6">
          Sub Category Creation
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[70%] w-full">
          <fieldset className="flex w-full flex-col gap-1">
            {/* <span className="text-xs font-semibold text-[#232F3E] leading-6">
              Category Name
            </span> */}
            <div className="form-control w-full mb-[22px] flex flex-col gap-2">
              <label className="text-sm font-semibold">Service category <span className="text-[red]">*</span></label>
              <select className="w-full border-[2px] px-3 py-2.5 focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6" name="parent" onChange={handleChange}>
                {categories.map((cat) => <option value={cat._id}>{ cat.name }</option>)}
              </select>
            </div>
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor={"category_name"}
              className="text-xs font-semibold text-[#232F3E] leading-6"
            >
              Sub Category Name
            </label>
            <div className={`mt-1 flex justify-center items-center gap-2`}>
              <input
                name= 'name'
                type="text"
                value={subCategoryForm.name}
                onChange={handleChange}
                placeholder="Enter Sub Category Name"
                autoComplete={"sub_category_name"}
                className={`form-input w-full border-[2px] px-3 py-2.5 focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6`}
              />
            </div>
          </fieldset>
          <div className="flex justify-end mt-8">
            {isLoading ?
              <Loader2 className=" h-6 w-6 animate-spin text-white" />
              : <Button type="submit" variant={"primary"}>
              Submit
            </Button>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateSubCategoryPage;
