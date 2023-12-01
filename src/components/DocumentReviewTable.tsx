"use client";

import React, { memo, useMemo, useState } from "react";
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
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ItemPicker from "./ItemPicker";
import { TbDownload } from "react-icons/tb";

const documentData = [
  {
    type: "Licences & Ehfkfhd",
  },
  {
    type: "Qualified Document",
  },
  {
    type: "Qualified Document",
  },
  {
    type: "Qualified Document",
  },
  {
    type: "Qualified Document",
  },
  {
    type: "Qualified Document",
  },
];
type T_document = {
  type: string;
};

const DocumentReviewTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...documentData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_document>[]>(
    () => [
      {
        accessorKey: "type",
        cell: (info) => info.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Document Type</span>
        ),
      },
      {
        accessorKey: "date",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <span className=" text-slate-600 text-xs">05/08/2023</span>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ml-8">Date</span>,
      },
      {
        accessorKey: "status",
        cell: ({ row }) => (
          <fieldset className="flex">
            <ItemPicker
              items={["Not aproved", "reviewed", "Under review"]}
              placeholder={"Status"}
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.59rem] rounded min-w-[8rem] w-full"
            />
          </fieldset>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Status</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center">
            <button className="hover:scale-90 border-none transition duration-300">
              <MdRemoveRedEye size={24} />
            </button>
            <button className="hover:scale-90 border-none transition duration-300">
              <TbDownload size={24} />
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
    <div className="h-[30.5vh] px- bg-white relative rounded-lg overflow-auto">
      <table className=" w-screen lg:w-full px-4 relative">
        <thead className="sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-left font-medium pt-2 pb-4 text-afruna-blue text-sm"
                  key={header.id}
                >
                  {header.index >= 3 &&
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
  );
};

export default memo(DocumentReviewTable);
