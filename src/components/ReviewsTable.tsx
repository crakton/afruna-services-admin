"use Client";

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
import { reviewData } from "@/constants/data";
import { imgs } from "@/constants/images";
import { T_Review } from "@/types/review";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ReviewTable = () => {
  const reviews = useSelector((state: RootState )=> state.reviews.reviews) 
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...reviewData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_Review>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-xs text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "bookingdate",
        cell: ({ row }) => (
          <div className="flex flex-col justify-start ml-4 items-start">
            <span className="text-afruna-blue text-xs">01 Oct 2023</span>
            <span className=" text-afruna-blue text-xs">11:29 am</span>
          </div>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ml-4">Booking Date</span>
        ),
      },
      {
        accessorKey: "provider",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-4 ">
            <Image
              src={imgs.provider2}
              alt={"pro"}
              width={35}
              height={35}
              className="rounded"
            />
            <span className=" text-slate-600 text-xs">Smith Shenier</span>
          </div>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ml-4 ">Provider</span>
        ),
      },
      {
        accessorKey: "user",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-4 mr-">
            <Image
              src={imgs.provider3}
              alt={"user"}
              width={35}
              height={35}
              className="rounded"
            />
            <span className=" text-slate-500 text-xs">Lativari dress</span>
          </div>
        ),
        header: () => <span className="text-xs text-[#7C7C7C] ml-4">User</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-4">
            <span className=" text-slate-600 text-xs">Plumbing repair</span>
          </div>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ml-4">Service</span>
        ),
      },
      {
        accessorKey: "type",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "Normal":
              return <span className="text-xs text-slate-600">Normal</span>;
            case "Excellent":
              return <span className="text-xs text-slate-600">Excellent</span>;
            case "High":
              return <span className="text-xs text-slate-600">High</span>;
          }
        },
        header: () => <span className="text-xs">Type</span>,
      },
      {
        accessorKey: "ratings",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center ml-4">
            <BsStarFill className="text-afruna-gold text-xs" />
            <span className=" text-slate-600 text-xs">
              {row.original.ratings}
            </span>
          </div>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ml-4">Ratings</span>
        ),
      },
      {
        accessorKey: "comment",
        cell: ({ row }) => (
          <span className=" text-slate-600 text-xs">
            {row.original.description}
          </span>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ">Comment</span>
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
    <div className="mt-4 pb-12 w-full">
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[67vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
        <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
          <table className="w-screen lg:w-full px-8 relative">
            <thead className="sticky top-0 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left  font-medium pt-3 text-[#7C7C7C] text-sm"
                      key={header.id}
                    >
                      {header.index > 0 && header.id !== "actions" ? (
                        <span className="flex min-w-[9.5rem] pr-4 justify-between gap-2 items-center w-fit">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span className="flex flex-col gap-[0.2rem]">
                            <RxChevronUp
                              onClick={header.column.getToggleSortingHandler()}
                              size={19}
                              className="relative top-2 text-slate-400"
                            />
                            <RxChevronDown
                              onClick={header.column.getToggleSortingHandler()}
                              size={19}
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
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200 "
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="" />
      </ScrollArea.Root>
    </div>
  );
};

export default memo(ReviewTable);
