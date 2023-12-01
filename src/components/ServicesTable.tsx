"use client";

import React, { FC, memo, useEffect, useMemo, useState } from "react";
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
import Image from "next/image";
import { imgs } from "@/constants/images";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IService } from "@/interfaces/IService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ImSpinner3 } from "react-icons/im";
import Service from "@/services/service.service";
import { toast } from "react-toastify";
import * as Switch from "@radix-ui/react-switch";
import useSearchService from "@/hooks/useSearchService";

interface ServicesTableProps {
  data: IService[]
}

const ServicesTable: FC<ServicesTableProps> = ({}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<IService[]>([]);
  const services = useSelector((state: RootState) => state.service.services);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const serviceApis = new Service();
  const {searchResult} = useSearchService({data: services })
  

  useEffect(() => {
    setData(searchResult);
    // Trigger table re-rendering to reflect filtered data
    // table.dispatch('dataChange');
    console.log(searchResult);
  }, [searchResult]);

  // const handleBlockService = (serviceId: string) => {
  //   // "6558a87fac38c3836470019a"
  //   serviceApis
  //     .blockService(serviceId)
  //     .then((data) => console.log(data));
  //   // serviceApis.getServices();
  // };

  const columns = useMemo<ColumnDef<IService>[]>(
    () => [
      {
        accessorKey: "id",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-500 text-xs">
            {row.original.customId}
          </span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-3 ">
            <div className="overflow-hidden w-[35px] h-[35px] rounded-md relative flex justify-center items-center">
              <Image src={imgs.provider2} alt={"pro"} fill />
            </div>
            <span className=" text-slate-600 text-xs">{row.original.name}</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Service</span>
        ),
      },
      {
        accessorKey: "provider",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-500 text-xs ml-3">
            {`${row.original.providerId?.firstName} ${row.original.providerId?.lastName}`}
          </span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Provider</span>
        ),
      },
      {
        accessorKey: "category",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-500 text-xs ml-3">
            {row.original.category.name}
          </span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Category</span>
        ),
      },
      {
        accessorKey: "Sub_category",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-600 text-xs ml-3">
            {row.original.subCategory.name}
          </span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Sub Category</span>
        ),
      },
      {
        accessorKey: "amount",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-800 text-xs">
            #{row.original.price}
          </span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
      },
      {
        accessorKey: "date",
        cell: ({ row }) => {
          const createdAtDate = new Date(row.original.createdAt);
          const year = createdAtDate.getFullYear();
          const day = createdAtDate.getDate();
          const monthIndex = createdAtDate.getMonth(); // Months are zero-indexed
          const month = new Date(year, monthIndex).toLocaleString("en-US", {
            month: "short",
          });
          return (
            <span className="text-afruna-blue text-xs ml-3">{`${day} ${month}, ${year}`}</span>
          );
        },
        header: () => <span className="text-sm text-[#7C7C7C] ml-3">Date</span>,
      },
      // {
      //   accessorKey: "status",
      //   cell: ({ row }) => {
      //     switch (row.original.status) {
      //       case "pending":
      //         return (
      //           <span className="flex justify-between items-center w-fit">
      //             <span className="p-1 rounded-full bg-amber-500 mr-1" />
      //             <span className="text-amber-500 text-xs">Pending</span>
      //           </span>
      //         );
      //       case "inactive":
      //         return (
      //           <span className="flex justify-between items-center w-fit">
      //             <span className="p-1 rounded-full bg-[#9B9999] mr-1" />
      //             <span className="text-[#9B9999] text-xs">Inactive</span>
      //           </span>
      //         );
      //       case "active":
      //         return (
      //           <span className="flex justify-between items-center w-fit">
      //             <span className="p-1 rounded-full bg-lime-600 mr-1" />
      //             <span className="text-lime-600 text-xs">Active</span>
      //           </span>
      //         );
      //       case "deleted":
      //         return (
      //           <span className="flex justify-between items-center w-fit">
      //             <span className="p-1 rounded-full bg-red-500 mr-1" />
      //             <span className="text-red-500 text-xs">Deleted</span>
      //           </span>
      //         );
      //       case "processing":
      //         return (
      //           <span className="flex justify-between items-center w-fit">
      //             <span className="p-1 rounded-full bg-blue-500 mr-1" />
      //             <span className="text-blue-500 text-xs">Processing</span>
      //           </span>
      //         );
      //     }
      //   },
      //   header: () => <span className="">Status</span>,
      // },
      {
        accessorKey: "verified",
        cell: ({ row }) => {
          const verified = row.original.verified;
          const serviceId = row.original._id!;
          const publish = row.original.publish;

          const handleVerificaton = () => {
            if (publish) {
              serviceApis
                .verifyService(serviceId)
                .then((data) => console.log(data));
              serviceApis.getServices();
            } else {
              toast.info(`Service is yet to be publish`);
            }
          };
          return (
            <div className="flex justify-start ml-3">
              {!verified ? (
                <button
                  onClick={handleVerificaton}
                  type="button"
                  className="text-white py-2 px-2 rounded-md bg-gradient-to-t from-blue-500 to-blue-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500"
                >
                  Allow Verification
                </button>
              ) : verified === true ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <button
                  onClick={handleVerificaton}
                  type="button"
                  className="text-white px-2 rounded-md bg-gradient-to-t py-2 from-blue-500 to-blue-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500"
                >
                  Allow Verification
                </button>
              )}
            </div>
          );
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Verification</span>
        ),
      },
      {
        accessorKey: "blocked",
        cell: ({ row }) => {
          const blocked = row.original.blocked;
          const serviceId = row.original?._id;
          // console.log(blocked);
          const handleBlockService = (serviceId: string) => {
            serviceApis
              .blockService(serviceId)
              .then((data) => console.log(data));
            serviceApis.getServices();
          };

          return (
            <div className="ml-3">
              <Switch.Root
                // defaultChecked={!blocked}
                // onCheckedChange={() => handleBlockService(serviceId)}
                onCheckedChange={async () => {
                  const serviceApis = new Service();
                  await serviceApis
                    .blockService(serviceId)
                    .then((data) => console.log(data))
                    .finally(() => {
                      toast.success("action successul.");
                    });
                }}
                className={`${
                  blocked && "data-[state=checked]:bg-rose-400"
                } bg-gray-300 w-[50px] h-[23px] rounded-full relative outline-none cursor-pointer`}
              >
                <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[30px]" />
              </Switch.Root>
            </div>
          );
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Blocked</span>
        ),
      },
      // {
      //   id: "actions",
      //   cell: ({ row }) => (
      //     <div className="flex justify-start gap-1 items-center">
      //       <button
      //         className="hover:scale-90 border-none transition duration-300"
      //         onClick={() => {
      //           const newData = data.filter((_, idx) => idx !== row.index);
      //           setData(newData);
      //         }}
      //       >
      //         <MdDeleteOutline size={24} />
      //       </button>
      //     </div>
      //   ),
      //   header: () => <span className="text-sm text-[#7C7C7C]">Action</span>,
      // },
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
    <div className="h-[60vh] px-4 bg-white relative rounded-lg overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ImSpinner3 className="h-10 w-10 animate-spin text-slate-400" />
        </div>
      ) : services?.length > 0 ? (
        <table className=" w-screen lg:w-full px-4 relative">
          <thead className="sticky top-0 bg-white">
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
                      <span className="flex justify-between items-center w-fit">
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
          Currently, No services is yet to be created on the platform
        </h3>
      )}
    </div>
  );
};

export default memo(ServicesTable);
