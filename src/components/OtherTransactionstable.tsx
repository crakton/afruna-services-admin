"use client";

import { FC, memo, useMemo, useState } from "react";
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
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { OtherTransactionsData } from "@/constants/data";
import Link from "next/link";
import { T_Other_Transactions_data } from "@/types/transactions";
import { FaArrowRight } from "react-icons/fa";
import ItemPicker from "./ItemPicker";

interface OtherTransactionstableProps {}

const OtherTransactionstable: FC<OtherTransactionstableProps> = ({}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...OtherTransactionsData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_Other_Transactions_data>[]>(
    () => [
      {
        accessorKey: "transactionId",
        cell: (info) => info.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">TransactionId</span>
        ),
      },
      {
        accessorKey: "event",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "Credited":
              return (
                <span className="flex justify-between items-center ml-4 w-fit">
                  <span className="p-1 rounded-full bg-lime-600 mr-1" />
                  <span className="text-lime-600 text-xs">Credited</span>
                </span>
              );
            case "Listing fee":
              return (
                <span className="flex justify-between items-center ml-4 w-fit">
                  <span className="p-1 rounded-full bg-red-500 mr-1" />
                  <span className="text-red-500 text-xs">Listing fee</span>
                </span>
              );
            case "Withdrawal":
              return (
                <span className="flex justify-between items-center ml-4 w-fit">
                  <span className="p-1 rounded-full bg-blue-500 mr-1" />
                  <span className="text-blue-500 text-xs">Withdrawal</span>
                </span>
              );
          }
        },
        header: () => <span className="ml-4">Event</span>,
      },
      {
        accessorKey: "summary",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C] ">Summary</span>,
      },
      {
        accessorKey: "date",
        cell: ({ row }) => (
          <span className="text-afruna-blue text-xs">01 Oct | 11:29 am</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ml-3">Date</span>,
      },
      {
        accessorKey: "amount",
        cell: ({ row }) => (
          <span className=" text-slate-600 text-xs">#3500</span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center">
            <Link
              href={`/users/gdshjskjjk`}
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
    <div className="mt-4 pb-12 overflow-hidden w-full bg-white px-4 max-w-[100%] md:max-w-[85%] rounded-xl border shadow-sm border-slate-300">
      <header className="flex justify-between items-center py-2 mb-2 border-b border-slate-300">
        <h1 className="font-bold text-slate-700 text-lg">
          Transactions history
        </h1>
        <div className="flex justify-end items-center gap-3">
        <fieldset className="flex">
            <ItemPicker
              items={["A", "B"]}
              placeholder={"All"}
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset>
          <fieldset className="flex">
            <ItemPicker
              items={["A", "B"]}
              placeholder={"Select date"}
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset>
        </div>
      </header>
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[48vh]  pb-2 overflow-auto">
        <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
          <table className="w-screen lg:w-full px-8 relative">
            <thead className="sticky top-0 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left font-medium text-[#7C7C7C] text-sm"
                      key={header.id}
                    >
                      {header.index > 0 && header.id !== "actions" ? (
                        <span className="flex min-w-[10rem] pr-8 justify-between gap-2 items-center w-full">
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

export default memo(OtherTransactionstable);
