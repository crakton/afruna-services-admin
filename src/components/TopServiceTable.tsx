"use client";

import React, { FC, memo, useMemo, useState } from "react";
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

interface TopServiceTableProps {
  topServices: IService[];
}

const TopServiceTable: FC<TopServiceTableProps> = ({ topServices }) => {
  const [rowSelection, setRowSelection] = useState({});
  const iterableTopServices = topServices || []; //Default to an empty array if topServices is undefined
  const [data, setData] = useState([...iterableTopServices]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IService>[]>(
    () => [
      {
        accessorKey: "customId",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      /**\
       * <Image
                 src={profile_data?.avatar?`https://${profile_data?.avatar}` :imgs.seller1}
                alt="Your image"
                fill
              />
       */
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 ml-3 items-center ">
            <div className=" w-[35px] h-[35px] relative overflow-hidden flex justify-center items-center">
              <Image
                src={imgs.provider1 ? imgs.provider1 : imgs.seller1}
                alt="Your image"
                fill
              />
            </div>
            <span className=" text-slate-600 text-xs">{row.original.name}</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3 ">Service</span>
        ),
      },
      {
        accessorKey: "provider",
        cell: ({ row }) => (
          <div className="flex justify-start items-center gap-1">
            <div className="relative overflow-hidden rounded-full w-[35px] h-[35px] flex justify-center items-center">
              {row.original.providerId?.avatar ? (
                <Image
                  src={`${row.original.providerId?.avatar}`}
                  alt="Your image"
                  fill
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-slate-200 text-xs">{`${row.original.providerId.firstName
                  .charAt(0)
                  .toUpperCase()} ${row.original.providerId?.lastName
                  .charAt(0)
                  .toUpperCase()}`}</div>
              )}
            </div>

            <span key={row.id} className=" text-slate-500 text-xs ml-3">
              {`${row.original.providerId?.firstName} ${row.original.providerId?.lastName}`}
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Service Provider</span>
        ),
      },
      {
        accessorKey: "price",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">
            #{row.original.price}
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
    <div className="h-[40vh] px-4 bg-white relative rounded-lg overflow-auto">
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
