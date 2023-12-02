"use client";

import { FC, memo, useMemo, useState } from "react";
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
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { OtherTransactionsData } from "@/constants/data";
import { T_Other_Transactions_data } from "@/types/transactions";
import ItemPicker from "./ItemPicker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ImSpinner3 } from "react-icons/im";

interface OtherTransactionstableProps {
  transaction: any;
}

const OtherTransactionstable: FC<OtherTransactionstableProps> = ({
  transaction,
}) => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...OtherTransactionsData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<any>[]>(
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
      <header className="flex justify-start items-center py-2 mb-2 border-b border-slate-300">
        <h1 className="font-bold text-slate-700 text-lg">
          Transactions history
        </h1>
        {/* <div className="flex justify-end items-center gap-3">
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
        </div> */}
      </header>
      <div className="h-[48vh] px-4 bg-white relative rounded-lg overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ImSpinner3 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : transaction?.length > 0 ? (
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
        ) : (
          <h3 className="flex justify-center text-sm text-slate-500 h-full items-center">
            Currently, No transaction as drop on the platform 
          </h3>
        )}
      </div>
    </div>
  );
};

export default memo(OtherTransactionstable);
