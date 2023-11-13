'use client'

import React, { memo, useMemo, useState } from "react";
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
import { bookingsData, service } from "@/constants/data";
import { T_Bookings } from "@/types/bookings";
import { imgs } from "@/constants/images";
import { T_Service } from "@/types/services";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const ServicesTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...service]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_Service>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-3 ">
            <Image
              src={imgs.provider2}
              alt={'pro'}
              width={35}
              height={35}
              className="rounded"
            />
            <span className=" text-slate-600 text-xs">
            Plumbing repair
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Service</span>
        ),
      },
      {
        accessorKey: "category",
        cell: ({ row }) => (
            <span key={row.id} className=" text-slate-500 text-xs ml-3">
              Household
            </span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ml-3">Category</span>,
      },
      {
        accessorKey: "Sub_category",
        cell: ({ row }) => ( <span key={row.id} className=" text-slate-600 text-xs ml-3">Plumbing</span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Sub Category</span>
        ),
      },
      {
        accessorKey: "amount",
        cell: ({ row }) => ( <span key={row.id} className=" text-slate-800 text-xs">#64,550</span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Amount</span>
        ),
      },
      {
        accessorKey: "date",
        cell: ({ row }) => (
            <span className="text-afruna-blue text-xs ml-3">21 Oct, 2023</span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Date</span>
        ),
      },
      {
        accessorKey: "status",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "Pending":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-amber-500 mr-1" />
                  <span className="text-amber-500 text-xs">Pending</span>
                </span>
              );
            case "Inactive":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#9B9999] mr-1" />
                  <span className="text-[#9B9999] text-xs">Inactive</span>
                </span>
              );
            case "Active":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-lime-600 mr-1" />
                  <span className="text-lime-600 text-xs">Active</span>
                </span>
              );
            case "Deleted":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-red-500 mr-1" />
                  <span className="text-red-500 text-xs">Deleted</span>
                </span>
              );
            case "Processing":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-blue-500 mr-1" />
                  <span className="text-blue-500 text-xs">Processing</span>
                </span>
              );
          }
        },
        header: () => <span className="">Status</span>,
      },
      {
        accessorKey: "created_by",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">{row.original.created_by}</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Created By</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center">
            <button className="hover:scale-90 border-none transition duration-300">
              <MdRemoveRedEye size={24} />
            </button>
            <button
              className="hover:scale-90 border-none transition duration-300"
              onClick={() => {
                const newData = data.filter((_, idx) => idx !== row.index);
                setData(newData);
              }}
            >
              <MdDeleteOutline size={24} />
            </button>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Action</span>,
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
      <div className="h-[60vh] px-4 bg-white relative rounded-lg overflow-y-auto">
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
      </div>
    // </div>
  );
};

export default memo(ServicesTable);
