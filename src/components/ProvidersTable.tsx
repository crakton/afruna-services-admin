import React, {
  HTMLProps,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  // Column,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  // Table,
  useReactTable,
} from "@tanstack/react-table";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { ProviderData } from "@/constants/data";
import { T_Providers } from "@/types/providers";
import Link from "next/link";

const AllProviders = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...ProviderData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_Providers>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "productName",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <Image
              src={row.original.img}
              alt={row.original.providerName}
              width={45}
              height={45}
              className="rounded"
            />
            <div className="flex flex-col text-slate-600">
              <span className="">{row.original.providerName}</span>
              <span className="">{row.original.email}</span>
            </div>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-8">Provider Name</span>
        ),
      },
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Mobile Number</span>
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
                  <span className="text-amber-500">Pending</span>
                </span>
              );
            case "Verified":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-lime-600 mr-1" />
                  <span className="text-lime-600">Verified</span>
                </span>
              );
            case "Rejected":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-red-200 mr-1" />
                  <span className="text-purple-400">Rejected</span>
                </span>
              );
            case "Deleted":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-red-500 mr-1" />
                  <span className="text-red-500">Deleted</span>
                </span>
              );
            case "Under review":
              return (
                <span className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-blue-500 mr-1" />
                  <span className="text-blue-500">Under review</span>
                </span>
              );
          }
        },
        header: () => <span className="">Status</span>,
      },
      {
        accessorKey: "dateListed",
        cell: ({ row }) => (
          <div className="flex flex-col justify-start items-start">
            <span className="text-afruna-blue text-xs">01 Oct 2023</span>
            <span className=" text-afruna-blue text-xs">11:29 am</span>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Date Date</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center">
            <Link
              href={`/providers/gsdgh7638mndjk`}
              className="hover:scale-90 border-none transition duration-300"
            >
              <MdRemoveRedEye size={24} />
            </Link>
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
    <div className="mt-4 pb-12 w-full">
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[60vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
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
                          <span className="flex flex-col">
                            <RxChevronUp
                              onClick={header.column.getToggleSortingHandler()}
                              size={24}
                              className="relative top-2 text-slate-400"
                            />
                            <RxChevronDown
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

export default memo(AllProviders);
