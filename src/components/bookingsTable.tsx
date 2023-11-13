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
import { bookingsData } from "@/constants/data";
import { T_Providers } from "@/types/providers";
import { T_Bookings } from "@/types/bookings";
import { imgs } from "@/constants/images";

const BookingsTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...bookingsData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_Bookings>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "bookingdate",
        cell: ({ row }) => (
          <div className="flex flex-col justify-start ml-3 items-start">
            <span className="text-afruna-blue text-xs">01 Oct 2023</span>
            <span className=" text-afruna-blue text-xs">11:29 am</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Booking Date</span>
        ),
      },
      {
        accessorKey: "provider",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ">
            <Image
              src={imgs.provider2}
              alt={'pro'}
              width={35}
              height={35}
              className="rounded"
            />
            <span className=" text-slate-600 text-xs">
            Lativari dress
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ">Provider</span>
        ),
      },
      {
        accessorKey: "user",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-8">
            <Image
              src={imgs.provider1}
              alt={'user'}
              width={35}
              height={35}
              className="rounded"
            />
            <span className=" text-slate-500 text-xs">
              Smith Lativari 
            </span>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ml-8">User</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <span className=" text-slate-600 text-xs">Plumbing repair</span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-8">Service</span>
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
                  <span className="p-1 rounded-full bg-lime-600 mr-1" />
                  <span className="text-lime-600 text-xs">Inactive</span>
                </span>
              );
            case "Deleted":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-red-500 mr-1" />
                  <span className="text-red-500 text-xs">Deleted</span>
                </span>
              );
            case "Active":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-blue-500 mr-1" />
                  <span className="text-blue-500 text-xs">Active</span>
                </span>
              );
          }
        },
        header: () => <span className="">Status</span>,
      },
      {
        accessorKey: "amount",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">#2500</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
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
    <div className="my-8 pb-12 w-full">
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[70vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
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

export default memo(BookingsTable);
