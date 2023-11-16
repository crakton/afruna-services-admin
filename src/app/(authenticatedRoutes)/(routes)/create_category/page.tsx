"use client";

import { Button } from "@/components/ui/button";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { Loader2 } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { GoTrash } from "react-icons/go";
import { TbUpload } from "react-icons/tb";

import Image from "next/image";
import uploadIcon from '../../../../assests/imgs/upload.png'
import { toast } from "react-toastify";
import Service from "@/services/service.service";
import { useRouter } from "next/navigation";

interface pageProps {}

const CreateCategoryPage: FC<pageProps> = ({}) => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: ''
  })

  const serviceApis = new Service()
  const router = useRouter()

  const updateFiles = useCallback((incommingFiles: ExtFile[]) => {
    if (incommingFiles.length <= 10) {
      setFiles(
        incommingFiles.filter((file) => {
          if ((file.size?.toFixed(3) as unknown as number) < 500 * 1024) {
            return file;
          } else {
            alert(`The file size of ${file.name} is too large.`);
            return;
          }
        })
      );
    } else {
      alert("Maximum files reached!");
    }
  }, []);

  const removeFile = useCallback(
    (id: string | number | undefined) => {
      setFiles(files.filter((x: ExtFile) => x.id !== id));
    },
    [files]
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name == 'media') {
      const file = e.target.files[0]
      if (file) {
        console.log(e.target.files[0])
        setCategoryForm({...categoryForm, icon: file})
      }
    }
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const createCategory = (e: any) => {
    e.preventDefault()
    if (categoryForm.name == '') {
      toast.error('Category name must be provided')
      return
    }

    let formData = new FormData()
    formData.append('name', categoryForm.name)
    formData.append('icon', categoryForm.icon)

    serviceApis.createCategory(formData, { setIsLoading })
      .then((data) => {
        toast.success('Category created')
        router.push('/category')
      })
  }

  return (
    <section className="flex flex-col gap-6 pb-12 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
          Create Category
        </h1>
      </div>
      <div className="flex flex-col justify-start p-20 items-start max-w-[85%] ml-8 rounded-xl bg-white w-full">
        <h2 className=" font-semibold text-black mb-6">
          Category Creation
        </h2>
        <form onSubmit={createCategory} className="flex flex-col gap-4 max-w-[70%] w-full">
          <fieldset className="w-full">
            <label
              htmlFor={"category_name"}
              className="text-xs font-semibold text-[#232F3E] leading-6"
            >
              Category Name
            </label>
            <div className={`mt-1 flex justify-center items-center gap-2`}>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={categoryForm.name}
                placeholder="Enter Category Name"
                autoComplete={"category_name"}
                className={`form-input w-full border-[2px] px-3 py-2.5 focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6`}
              />
            </div>
          </fieldset>
          <div className="form-control">
              <div className="custom-upload-btn">
                  <input type="file" hidden name="media" onChange={handleChange} id="media" />
                  <label htmlFor="media" className="border-dashed border-[1px] rounded-[8px] cursor-pointer border-[#00AEEF] py-[30px] flex flex-col items-center justify-center">
                      <span className="font-semibold text-lg mb-[11px]">Drag and drop files here</span>
                      <span className="text-[#979797] text-sm mb-6">The file size limite is 1 MB per file</span>
                      <span className="button flex items-center justify-center gap-2 bg-[#FED6AC] px-4 py-2 text-sm">
                          <Image src={uploadIcon} alt="" />
                          Browse
                      </span>
                  </label>
              </div>
          </div>
          {/* <div className="mt-8 flex flex-col gap-4 w-full">
            <Dropzone
              value={files}
              onChange={updateFiles}
              maxFiles={5}
              maxFileSize={500 * 1024}
              type="image/*"
              default={false}
              header={false}
              footer={false}
              multiple
              color="#00AEEF"
              // style={{ width: "690px" }}
            >
              <div className="flex flex-col  gap-2 items-center text-slate-900">
                <h3 className="text-[0.9rem] font-semibold text-slate-600">
                  Drag and drop files here{" "}
                </h3>
                <span className="text-[0.8rem] text-slate-400">
                  The file size limit is 1MB per file
                </span>

                <button className="my-2 px-8 font-semibold rounded-md gap-2 py-2 flex items-center bg-orange-200 text-black text-xs">
                  <TbUpload className="text-lg" />
                  Browse
                </button>
              </div>
            </Dropzone>
            {files && files.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4 w-full h-[40vh] overflow-y-auto">
                {files.map((file, id) => (
                  <div className=" relative" key={file.id}>
                    
                    <FileMosaic {...file} preview />
                    <span
                      onClick={() => removeFile(file.id)}
                      className="absolute cursor-pointer top-2 right-2 z-20 text-white"
                    >
                      <GoTrash
                        size={25}
                        className="hover:text-rose-500 duration-300 transition-all"
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div> */}
          <div className="flex justify-end mt-8">
            {isLoading ?
              <Loader2 className=" h-6 w-6 animate-spin text-white" />
              : <Button type="submit" variant={"primary"}>
              SUbmit
            </Button>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateCategoryPage;
