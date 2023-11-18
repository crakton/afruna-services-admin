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
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { imgs } from "@/constants/images";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CustomerBookingDetailsTable = () => {
  const customerBookings = useSelector(
    (state: RootState) => state.customer.customerBookings
  );
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...customerBookings]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "bookingDate",
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
            <div className="flex flex-col justify-start ml-3 items-start">
              <span className="text-afruna-blue text-xs">{`${day} ${month}, ${year}`}</span>
              <span className=" text-afruna-blue text-xs">{timeString}</span>
            </div>
          );
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Booking Date</span>
        ),
      },
      {
        accessorKey: "provider",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2  items-center ">
            <div className=" relative overflow-hidden rounded-full w-[35px] h-[35px] flex justify-center items-center">
              <Image
                src={row.original.avatar || imgs.provider2}
                alt={"pro"}
                fill
                className="rounded"
              />
            </div>
            <span className=" text-slate-600 text-xs">{`${row.original.firstName} ${row.original.lastName}`}</span>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ">Provider</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <span className=" text-slate-600 text-xs">Plumbing repair</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Services</span>,
      },
      {
        accessorKey: "status",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "Completed":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-lime-600 mr-1" />
                  <span className="text-lime-600 text-xs">Completed</span>
                </span>
              );
            case "Canceled":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-red-500 mr-1" />
                  <span className="text-red-500 text-xs">Canceled</span>
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
        accessorKey: "amount",
        cell: ({ row }) => (
          <span className=" text-slate-600 text-xs">#3500</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
      },
      // {
      //   id: "actions",
      //   cell: ({ row }) => (
      //     <div className="flex justify-start gap-1 items-center">
      //       <Link
      //         href={`/users/gdshjskjjk`}
      //         className="hover:scale-90 border-none transition duration-300"
      //       >
      //         <MdRemoveRedEye size={24} />
      //       </Link>
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
    <div className="mt-4 pb-12 w-full max-w-[100%] md:max-w-[90%]">
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[48vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
        <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
          <table className="w-screen lg:w-full px-8 relative">
            <thead className="sticky top-0 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left font-medium pt-3 text-[#7C7C7C] text-sm"
                      key={header.id}
                    >
                      {header.index > 0 && header.id !== "actions" ? (
                        <span className="flex justify-between gap-2 items-center w-fit">
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

export default memo(CustomerBookingDetailsTable);
