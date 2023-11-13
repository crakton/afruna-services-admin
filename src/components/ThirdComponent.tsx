'use client'

import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import {  GoTrash } from "react-icons/go";
import { TbUpload } from "react-icons/tb";

interface ThirdComponentProps {
  // removeFile: () => void
  // updateFiles: () => void
  files: ExtFile[];
  setFiles: Dispatch<SetStateAction<ExtFile[]>>;
}

const ThirdComponent: FC<ThirdComponentProps> = ({ files, setFiles }) => {
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
  return (
    <>
      <div className="flex flex-col gap-2 justify-start items-start mt-6 xl:max-w-[50%]">
        <h3 className=" text-sm font-bold">Image Upload</h3>
        <p className="text-xs ">
          Please tell us a little bit about the service you want listed. This
          information will show on your public profile, allowing potential
          purchasers to learn more about you.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 max-w-[74.5%] w-full">
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
            <h3 className="text-[0.9rem] font-semibold text-slate-600">Drag and drop files here </h3>
            <span className="text-[0.8rem] text-slate-400">The file size limit is 1MB per file</span>
            
            <button className="my-2 px-8 font-semibold rounded-md gap-2 py-2 flex items-center bg-orange-200 text-black text-xs">
              <TbUpload className='text-lg'/>Browse
            </button>
          </div>
        </Dropzone>
        {files && files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 w-full h-[40vh] overflow-y-auto">
            {files.map((file, id) => (
              <div className=" relative" key={file.id}>
                {/* <header className="flex justify-between items-center relative top-1 z-10 rounded-t-lg bg-gray-800 text-white text-sm p-2">
                  <h3>Cover</h3>
                  <span className="p-[3px] rounded-full font-semibold bg-white text-gray-700 w-[20px] h-[20px] ">
                    {id + 1}
                  </span>
                </header> */}
                <FileMosaic {...file} preview />
                <span onClick={() => removeFile(file.id)} className="absolute cursor-pointer top-2 right-2 z-20 text-white">
                  <GoTrash size={25} className='hover:text-rose-500 duration-300 transition-all' />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ThirdComponent;

// ` In the above line lines of code I was try to upload an image but there is an error that is always thrown to the UI that "setFiles is not a function" and I pass the "setFiles" from the parent component where it is being defined from a useState hook to a child component "ThirdComponent" where it is being use and when i click to upload an image, there is always an error throw to the UI that "setFiles is not a function". the two components code is written below, the first codes is the parent compenent while the second codes is the child component. Please check the codes abve an solve the error.`