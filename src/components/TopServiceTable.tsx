"use client";

import React, { memo, useMemo, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
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
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { TopService } from "@/constants/data";
import { imgs } from "@/constants/images";
import { T_Top_Service } from "@/types/services";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const TopServiceTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...TopService]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_Top_Service>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 ml-3 items-center ">
            <Image
              src={imgs.provider2}
              alt={"pro"}
              width={35}
              height={35}
              className="roun"
            />
            <span className=" text-slate-600 text-xs">Plumbing repair</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3 ">Service</span>
        ),
      },
      {
        accessorKey: "category",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">Home</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Category</span>,
      },
      {
        accessorKey: "amount",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">
            {row.original.amount}
          </span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
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
    <div className="h-[40vh] px-4 bg-white relative rounded-lg overflow-y-auto">
      <table className="w-screen lg:w-full px- relative">
        <thead className="sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-left font-medium text-[#7C7C7C] text-sm"
                  key={header.id}
                >
                  {header.index > 0 && header.id !== "actions" ? (
                    <span className="flex justify-between gap-2 items-center w-fit">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="flex flex-col">
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
                      className="py-4 font-semibold text-left text-[0.8rem]"
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
  );
};

export default memo(TopServiceTable);
