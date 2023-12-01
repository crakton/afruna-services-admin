'use client'

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
import Image from "next/image";
import { service, subCategory } from "@/constants/data";
import { imgs } from "@/constants/images";
import { T_Service, T_SubCategory } from "@/types/services";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const SubCategoryTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...subCategory]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<T_SubCategory>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "subCategory",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-3 ">
            <Image
              src={imgs.provider2}
              alt={'pro'}
              width={35}
              height={35}
              className="rounded"
            />
            <span className=" text-slate-600 text-xs">
            Plumbing repair
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Sub Category</span>
        ),
      },
      {
        accessorKey: "subCategorySlug",
        cell: ({ row }) => (
            <span key={row.id} className=" text-slate-500 text-xs ml-3">
              Anything sha
            </span>
        ),
        header: () => <span className="text-sm text-[#7C7C7C] ml-3">Subcategory Slug</span>,
      },
      {
        accessorKey: "category",
        cell: ({ row }) => ( <span key={row.id} className=" text-slate-600 text-xs ml-3">Home</span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Category</span>
        ),
      },
      {
        accessorKey: "date",
        cell: ({ row }) => (
            <span className="text-afruna-blue text-xs ml-3">21 Oct, 2023</span>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-3">Date</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center ml-3">
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
        header: () => <span className="text-sm text-[#7C7C7C] ml-3">Action</span>,
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
      <div className="h-[70vh] px-4 bg-white relative rounded-lg overflow-auto">
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
                      <span className="flex justify-between items-center max-w-[12rem] w-full">
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

export default memo(SubCategoryTable);
