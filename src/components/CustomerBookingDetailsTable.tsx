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
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { imgs } from "@/constants/images";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ImSpinner3 } from "react-icons/im";
import { T_Bookings } from "@/types/bookings";
import { T_booking_data } from "@/app/(authenticatedRoutes)/(routes)/dashboard/page";
interface CustomerBookingDetailsTableProps {
  loadingBookings: boolean; 
  customerBookings: T_Bookings[]
}

const CustomerBookingDetailsTable: FC<CustomerBookingDetailsTableProps> = ({
  loadingBookings,customerBookings
}) => {
 
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<T_Bookings[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const assignUniqueIds = (
    data: T_Bookings[]
  ): T_Bookings[] => {
    // Create a new array to store the updated data
    const updatedData: T_Bookings[] = [];
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
    const updatedDataWithIds = assignUniqueIds(customerBookings);
    setData(updatedDataWithIds);
  }, [customerBookings]);

  const columns = useMemo<ColumnDef<T_Bookings>[]>(
    () => [
      {
        accessorKey: "id",
          cell: ({ row }) => (
            <div key={row.id} className="flex gap-4 items-center">
              <span className=" text-slate-800 text-xs">#{row.original.id}</span>
            </div>
          ),
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
                src={imgs.provider2}
                alt={"pro"}
                fill
                className="rounded"
              />
            </div>
            <span className=" text-slate-600 text-xs">{`Akande Idris`}</span>
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
          <span className=" text-slate-600 text-xs">#{row.original.amount}</span>
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
    <div className="mt-4 pb-12 w-full max-w-[100%] md:max-w-[90%]">
      <div className="h-[48vh] px-4 bg-white relative w-full rounded-xl border shadow-sm border-slate-300">
        {loadingBookings ? (
          <div className="flex justify-center items-center text-center h-full">
            <ImSpinner3 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : customerBookings.length > 0 ? (
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
        ) : (
          <h3 className="flex justify-center text-sm text-slate-500 items-center text-center h-full">
            This customer hasn't book for any service yet
          </h3>
        )}
      </div>
    </div>
  );
};

export default memo(CustomerBookingDetailsTable);
