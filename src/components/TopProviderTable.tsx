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
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { T_Providers } from "@/types/providers";
import { imgs } from "@/constants/images";

interface TopProviderTableProps {
  topProviders: T_Providers[];
}
const TopProviderTable: FC<TopProviderTableProps> = ({ topProviders }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<T_Providers[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const assignUniqueIds = (data: T_Providers[]): T_Providers[] => {
    // Create a new array to store the updated data
    const updatedData: T_Providers[] = [];
    // Assign unique IDs to each data object
    let uniqueId = 1;
    for (const serviceCategory of data) {
      updatedData.push({
        ...serviceCategory,
        id: uniqueId++,
      });
    }
    return updatedData;
  };

  useEffect(() => {
    const updatedDataWithIds = assignUniqueIds(topProviders);
    setData(updatedDataWithIds);
  }, [topProviders]);

  const columns = useMemo<ColumnDef<T_Providers>[]>(
    () => [
      {
        accessorKey: "id",
        cell: ({ row }) => (
          <span key={row.id} className=" text-slate-900 text-xs">
            {`#${row.original.id}`}
          </span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "providers",
        cell: ({ row }) => (
          <div className="flex justify-start items-center gap-1">
            <div className="relative overflow-hidden rounded-full w-[35px] h-[35px] flex justify-center items-center">
              {row.original.avatar ? (
                <Image
                  src={
                    row.original.avatar.includes("https://")
                      ? row.original.avatar
                      : `https://${row.original.avatar}`
                  }
                  alt="Your image"
                  fill
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-slate-200 text-xs">{`${row.original.firstName
                  .charAt(0)
                  .toUpperCase()} ${row.original.lastName
                  .charAt(0)
                  .toUpperCase()}`}</div>
              )}
            </div>

            <span key={row.id} className=" text-slate-800 text-xs ml-3">
              {`${row.original.fullName}`}
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Providers</span>
        ),
      },
      {
        accessorKey: "phoneNumber",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">
            {row.original.phoneNumber}
          </span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Mobile Number</span>
        ),
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

          const timeString = createdAtDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          return (
            <div className="flex flex-col justify-start items-start">
              <span className="text-afruna-blue text-xs">{`${day} ${month}, ${year}`}</span>
              <span className=" text-afruna-blue text-xs">{timeString}</span>
            </div>
          );
        },
        header: () => <span className="text-sm text-[#7C7C7C]">Reg date</span>,
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
    // <div className="relative h-[75vh] pb-42">
    <div className="h-[40vh] px-4 bg-white relative rounded-lg overflow-auto">
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

export default memo(TopProviderTable);
