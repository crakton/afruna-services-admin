"use client";

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
import { subCategory } from "@/constants/data";
import { imgs } from "@/constants/images";
import { T_SubCategory } from "@/types/services";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import * as Switch from '@radix-ui/react-switch';

const CategoryTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...subCategory]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_SubCategory>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "serviceCategory",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-3 ">
            <Image
              src={imgs.provider2}
              width={35}
              height={35}
              alt="item Image"
              className="rounded-md w-[35px] h-[35px] object-fill shadow-sm"
            />
            <span className=" text-slate-600 text-xs">Plumbing repair</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Service Category</span>
        ),
      },
      {
        accessorKey: "categorySlug",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-500 text-xs ml-3">
            Computer
          </span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Category Slug</span>
        ),
      },
      {
        accessorKey: "date",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs ml-3">21 Oct, 2023</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ml-3">Date</span>,
      },

      {
        accessorKey: "featured",
        cell: ({ cell, row }) => {
          return (
              <Switch.Root
                defaultChecked={row.original.featured}
                onCheckedChange={() => {
                    console.log("=== something ===");
                  }}
                className="w-[50px] h-[23px] bg-gray-300 rounded-full relative data-[state=checked]:bg-green-300 outline-none cursor-pointer"
              >
                <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[30px]" />
              </Switch.Root>
          );
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Featured</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center ml-3">
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
    <div className="h-[70vh] px-4 bg-white relative rounded-lg overflow-y-auto">
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
                    <span className="flex justify-between items-center max-w-[12rem] w-full">
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

export default memo(CategoryTable);
