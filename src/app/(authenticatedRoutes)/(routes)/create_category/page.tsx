"use client";

import { Button } from "@/components/ui/button";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { Loader2 } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { toast } from "react-toastify";
import Service from "@/services/service.service";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import {
  setCatIcon,
  setCatId,
  setCatName,
} from "@/redux/features/app/service_slice";

interface pageProps {}
type T_Cate_Form = {
  name: string;
  icon: ExtFile[] | undefined;
};

const CreateCategoryPage: FC<pageProps> = ({}) => {
  const cat_id = useSelector((state: RootState) => state.service.catId);
  const cat_name = useSelector((state: RootState) => state.service.catName);
  const cat_icon = useSelector((state: RootState) => state.service.catIcon);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [catgyName, setCatgyName] = useState<string>(
    cat_id === "" ? "" : cat_name
  );
  const [files, setFiles] = useState<ExtFile[]>(cat_id === "" ? [] : cat_icon);

  const serviceApis = new Service();
  const router = useRouter();

  const updateFiles = (incommingFiles: ExtFile[]) => {
    if (incommingFiles.length <= 1) {
      setFiles(
        incommingFiles.filter((file) => {
          if ((file.size as number) < 500 * 1024) {
            return file;
          } else {
            toast.warn(`The file size of ${file.name} is too large.`);
            return;
          }
        })
      );
    } else {
      toast.warn("Maximum files reached!");
    }
  };
  const removeFile = useCallback(
    (id: string | number | undefined) => {
      setFiles(files.filter((x: ExtFile) => x.id !== id));
    },
    [files]
  );

  useEffect(() => {
    console.log(files);
    console.log(catgyName);
    [catgyName, files];
  });

  const handleChangeCatName = (e: any) => {
    const { name, value } = e.target;
    setCatgyName(value);
  };

  const submitCategory = (e: any) => {
    e.preventDefault();
    if (catgyName == "") {
      toast.error("Category name must be provided");
      return;
    }
    if (cat_id === "") {
      if (!files?.length) {
        toast.warn("Please select image");
        return;
      }
    } else {
      if (!files?.length) {
        toast.warn("Please select image");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", catgyName);
    for (let i = 0; i < files.length; i++) {
      formData.append("icon", files[i].file as Blob);
    }

    if (cat_id === "") {
      serviceApis
        .createCategory(formData)
        .then((data) => {
          console.log(data);
          toast.success("Category created");
        })
        .finally(() => {
          setCatgyName("");
          router.push("/category");
        });
    } else {
      serviceApis
        .editCategory(formData, cat_id)
        .then((data) => {
          console.log(data);
          toast.success("Edition is successfull");
        })
        .finally(() => {
          store.dispatch(setCatId(""));
          store.dispatch(setCatName(""));
          store.dispatch(setCatIcon([]));
          router.push("/category");
        });
    }
  };

  const backToCategoryPage = () => {
    store.dispatch(setCatId(""));
    store.dispatch(setCatName(""));
    store.dispatch(setCatIcon([]));
    router.push("/category");
  };

  return (
    <section className="flex flex-col gap-6 pb-12 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-lg lg:pl-0 lg:text-lg leading-3 text-afruna-blue font-bold">
          {cat_id === "" ? "Create Category" : "Edit Category"}
        </h1>
      </div>
      <div className="flex flex-col justify-start p-20 items-start max-w-[85%] ml-8 rounded-xl bg-white w-full">
        <h2 className=" font-semibold text-black mb-6">
          {cat_id === "" ? "Category creation" : "Edit the Category"}
        </h2>
        <form
          onSubmit={submitCategory}
          className="flex flex-col gap-8 max-w-[70%] w-full"
        >
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
                onChange={handleChangeCatName}
                value={catgyName}
                placeholder="Enter Category Name"
                autoComplete={"category_name"}
                className={`form-input w-full border-[2px] px-3 py-2.5 focus-within:border-[2px] focus-within:border-[#FFDBB6] 
              focus-within:shadow-md text-sm font-medium rounded-md placeholder:text-gray-400 
              focus-visible:shadow-md transition duration-300 sm:text-[0.8rem] sm:leading-6`}
              />
            </div>
          </fieldset>
          {/* <div className="form-control">
            <div className="custom-upload-btn">
              <input
                type="file"
                hidden
                name="media"
                onChange={handleChange}
                id="media"
              />
              <label
                htmlFor="media"
                className="border-dashed border-[1px] rounded-[8px] cursor-pointer border-[#00AEEF] py-[30px] flex flex-col items-center justify-center"
              >
                <span className="font-semibold text-lg mb-[11px]">
                  Drag and drop files here
                </span>
                <span className="text-[#979797] text-sm mb-6">
                  The file size limite is 1 MB per file
                </span>
                <span className="button flex items-center justify-center gap-2 bg-[#FED6AC] px-4 py-2 text-sm">
                  <Image src={uploadIcon} alt="" />
                  Browse
                </span>
              </label>
            </div>
          </div> */}
          <div className="mt-2 flex flex-col gap-4 w-full">
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
              <div className="mt-4 flex flex-wrap gap-4 w-full">
                {files.map((file, id) => (
                  <div className=" relative" key={file.id}>
                    <FileMosaic {...file} preview />
                    <span
                      onClick={() => removeFile(file.id)}
                      className="absolute cursor-pointer font-bold text-lg top-2 right-2 z-20 text-afruna-blue"
                    >
                      <GoTrash className="hover:text-rose-500 duration-300 transition-all" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-4 mt-6">
            {cat_id !== "" ? (
              <div onClick={backToCategoryPage} className="max-w-[7rem] cursor-pointer text-sm w-full py-[0.6rem] text-center rounded-md text-white bg-gradient-to-b from-purple-400 to-purple-900 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-800 transition duration-500">
                Go back
              </div>
            ) : null}{" "}
            <Button
              type="submit"
              variant={"primary"}
              className="w-[7rem] h-[2.5rem]"
            >
              {loading ? (
                <Loader2 className=" h-6 w-6 animate-spin text-white" />
              ) : cat_id === "" ? (
                "Submit"
              ) : (
                "Edit category"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateCategoryPage;
