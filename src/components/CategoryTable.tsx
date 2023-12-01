"use client";

import React, {
  FC,
  ReactNode,
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import { imgs } from "@/constants/images";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import * as Switch from "@radix-ui/react-switch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IServiceCategory } from "@/interfaces/IService";
import { ImSpinner3 } from "react-icons/im";
import { IoRemoveOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import Service from "@/services/service.service";

const CategoryTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<IServiceCategory[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const categories = useSelector(
    (state: RootState) => state.service.serviceCategories
  );
  const loading = useSelector((state: RootState) => state.loading.loading);

  const assignUniqueIds = (data: IServiceCategory[]): IServiceCategory[] => {
    // Create a new array to store the updated data
    const updatedData: IServiceCategory[] = [];

    // Assign unique IDs to each data object
    let uniqueId = 1;
    for (const provider of data) {
      updatedData.push({
        ...provider,
        id: uniqueId++,
      });
    }

    return updatedData;
  };

  const [Open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const onClose = () => setOpen(false);
  const handleOpenDeleteOption = (_id: string) => {
    setOpen(true);
    setCategoryId(_id);
  };
  const serviceApis = new Service();
  const handleDeleteCategory = () => {
    serviceApis
      .deleteCategory(categoryId)
      .then((data) => console.log(data))
      .finally(() => onClose());
  };

  useEffect(() => {
    const updatedDataWithIds = assignUniqueIds(categories);
    setData(updatedDataWithIds);
  }, [categories]);

  const columns = useMemo<ColumnDef<IServiceCategory>[]>(
    () => [
      {
        accessorKey: "id",
        cell: ({ row }) => {
          return (
            <span key={row.id} className=" text-slate-500 text-xs">
              #{row.original.id}
            </span>
          );
        },
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "serviceCategory",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-48">
            <Image
              src={imgs.provider2}
              width={35}
              height={35}
              alt="item Image"
              className="rounded-md w-[35px] h-[35px] object-fill shadow-sm"
            />
            <span className=" text-slate-600 text-xs">{row.original.name}</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-48">Service Category</span>
        ),
      },
      // {
      //   accessorKey: "categorySlug",
      //   cell: ({ row }) => (
      //     <span key={row.id} className=" text-slate-500 text-xs ml-3">
      //       Computer
      //     </span>
      //   ),
      //   header: () => (
      //     <span className="text-sm text-[#7C7C7C] ml-3">Category Slug</span>
      //   ),
      // },
      // {
      //   accessorKey: "date",
      //   cell: ({ row }) => {
      //     const createdAtDate = new Date(row.original.createdAt);
      //     const year = createdAtDate.getFullYear();
      //     const day = createdAtDate.getDate();
      //     const monthIndex = createdAtDate.getMonth(); // Months are zero-indexed
      //     const month = new Date(year, monthIndex).toLocaleString("en-US", {
      //       month: "short",
      //     });
      //     return (<span className="text-afruna-blue text-xs ml-3">{`${day} ${month}, ${year}`}</span>

      //     );
      //   },
      //   header: () => <span className="text-sm text-[#7C7C7C] ml-3">Date</span>,
      // },

      // {
      //   accessorKey: "featured",
      //   cell: ({ cell, row }) => {
      //     return (
      //       <Switch.Root
      //         defaultChecked={row.original.featured}
      //         onCheckedChange={() => {
      //           console.log("=== something ===");
      //         }}
      //         className="w-[50px] h-[23px] bg-gray-300 rounded-full relative data-[state=checked]:bg-green-300 outline-none cursor-pointer"
      //       >
      //         <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[30px]" />
      //       </Switch.Root>
      //     );
      //   },
      //   header: () => <span className="text-sm text-[#7C7C7C]">Featured</span>,
      // },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center ml-6">
            {/* <button className="hover:scale-90 border-none transition duration-300">
              <MdRemoveRedEye size={24} />
            </button> */}
            <button
              className="hover:scale-90 border-none transition duration-300"
              onClick={() => handleOpenDeleteOption(row.original._id)}
            >
              <MdDeleteOutline size={24} />
            </button>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Action</span>
        ),
      },
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="h-[70vh] px-4 bg-white relative rounded-lg overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ImSpinner3 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : categories?.length > 0 ? (
          <table className=" w-screen lg:w-full px-4 relative">
            <thead className="sticky top-0 z-20 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left font-medium text-afruna-gray text-sm"
                      key={header.id}
                    >
                      {header.index >= 1 &&
                      header.id !== "actions" &&
                      header.id !== "block" ? (
                        <span className="flex justify-between items-center max-w-[24rem] w-full">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span className="flex flex-col ">
                            <BiChevronUp
                              onClick={header.column.getToggleSortingHandler()}
                              size={24}
                              className="relative top-2 text-slate-400"
                            />
                            <BiChevronDown
                              onClick={header.column.getToggleSortingHandler()}
                              size={24}
                              className="relative -top-2"
                            />
                          </span>
                        </span>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="my-10">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    className="px-2 odd:border-y-[1px] odd:border-slate-300"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          className="py-4 font-semibold text-left text-xs"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3 className="flex justify-center text-sm text-slate-500 h-full items-center">
            Currently, category is yet to be added
          </h3>
        )}
      </div>
      {Open ? (
        <ShowModal cancelModel={onClose}>
          <div
            className="bg-white sm:rounded-lg w-full md:max-w-[40rem] z-50 flex flex-col justify-center items-center text-center pt-2 sm:py-6 px-6"
            role="delete div"
          >
            <button
              className="place-self-end hidden md:block mb-4 fl"
              onClick={onClose}
              type="button"
            >
              <FaTimes className="md:text-lg" />
            </button>

            <p className=" text-slate-700 font-bold">
              Are you sure you want to proceed?
            </p>

            <div className="flex justify-center items-center gap-6 mt-10 ">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-sm text-sm text-white bg-green-600"
              >
                <span className="ml-2">Cancel</span>
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-5 py-2 rounded-sm text-sm text-white bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </ShowModal>
      ) : null}
    </>
  );
};

export default memo(CategoryTable);

const ShowModal: FC<{ children: ReactNode; cancelModel: () => void }> = memo(
  ({ children, cancelModel }) => (
    <div
      // onClick={cancelModel}
      className={
        "fixed flex justify-center items-center z-30 top-0 left-0 w-screen h-screen bg-black/50 py-10"
      }
    >
      {children}
    </div>
  )
);
