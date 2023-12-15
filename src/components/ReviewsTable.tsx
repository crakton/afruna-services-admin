"use Client";

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
import { T_Service_Review } from "@/types/review";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ImSpinner3 } from "react-icons/im";

interface ReviewsTableProps {
  reviews: T_Service_Review[];
}

const ReviewTable: FC<ReviewsTableProps> = ({ reviews }) => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  // const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<T_Service_Review[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const assignUniqueIds = (data: T_Service_Review[]): T_Service_Review[] => {
    // Create a new array to store the updated data
    const updatedData: T_Service_Review[] = [];
    // Assign unique IDs to each data object
    let uniqueId = 1;
    for (const review of data) {
      updatedData.push({
        ...review,
        id: uniqueId++,
      });
    }
    return updatedData;
  };

  useEffect(() => {
    const updatedDataWithIds = assignUniqueIds(reviews);
    setData(updatedDataWithIds);
  }, [reviews]);

  const columns = useMemo<ColumnDef<T_Service_Review>[]>(
    () => [
      {
        accessorKey: "id",
        cell: ({ row }) => {
          return (
            <span key={row.id} className=" text-slate-500 text-xs">
              #{row.original.id}
            </span>
          );
        },
        header: () => <span className="text-xs text-[#7C7C7C]">ID</span>,
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
            <div className="flex flex-col justify-start ml-3 items-start">
              <span className="text-afruna-blue text-xs">{`${day} ${month}, ${year}`}</span>
              <span className=" text-afruna-blue text-xs">{timeString}</span>
            </div>
          );
        },
        header: () => <span className="text-xs text-[#7C7C7C] ml-4">Date</span>,
      },
      {
        accessorKey: "provider",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-4 ">
            <div className="w-[35px] h-[35px] relative overflow-hidden rounded-full flex justify-center items-center">
              {row.original.serviceId?.providerId?.avatar ? (
                <Image
                  src={
                    row.original.serviceId.providerId.avatar.includes(
                      "https://"
                    )
                      ? row.original.serviceId.providerId.avatar
                      : `https://${row.original.serviceId.providerId.avatar}`
                  }
                  alt={"pro"}
                  fill
                />
              ) : (
                <div className="w-full h-full bg-slate-300 text-xs flex justify-center items-center">{`${row.original.serviceId?.providerId?.firstName
                  .charAt(0)
                  .toUpperCase()} ${row.original.serviceId?.providerId?.lastName
                  .charAt(0)
                  .toUpperCase()}`}</div>
              )}
            </div>
            <span className=" text-slate-600 text-xs">{`${row.original.serviceId?.providerId?.firstName} ${row.original.serviceId?.providerId?.lastName}`}</span>
          </div>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ml-4 ">Provider</span>
        ),
      },
      {
        accessorKey: "user",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-2 items-center ml-4 ">
            <div className="w-[35px] h-[35px] relative overflow-hidden rounded-full flex justify-center items-center">
              {row.original.userId?.avatar ? (
                <Image
                  src={
                    row.original.userId.avatar.includes("https://")
                      ? row.original.userId.avatar
                      : `https://${row.original.userId.avatar}`
                  }
                  alt={"pro"}
                  fill
                />
              ) : (
                <div className="w-full h-full bg-slate-300 text-xs flex justify-center items-center">{`${row.original.userId?.firstName
                  ?.charAt(0)
                  .toUpperCase()} ${row.original.userId?.lastName
                  ?.charAt(0)
                  .toUpperCase()}`}</div>
              )}
            </div>
            <span className=" text-slate-600 text-xs">{`${row.original.userId?.firstName} ${row.original.userId?.lastName}`}</span>
          </div>
        ),
        header: () => <span className="text-xs text-[#7C7C7C] ml-4">User</span>,
      },
      {
        accessorKey: "service",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-4">
            <span className=" text-slate-600 text-xs">
              {row.original?.serviceId?.name}
            </span>
          </div>
        ),
        header: () => (
          <span className="text-xs text-[#7C7C7C] ml-4">Service</span>
        ),
      },
      {
        accessorKey: "ratings",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center ml-4">
            {row.original.rating > 0 ? (
              <>
                <BsStarFill className="text-afruna-gold text-xs" />
                <span className=" text-slate-600 text-xs">
                  {row.original.rating}
                </span>
              </>
            ) : null}
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
            {row.original.comment}
          </span>
        ),
        header: () => <span className="text-xs text-[#7C7C7C] ">Comment</span>,
      },
    ],
    []
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
      {loading ? (
        <div className="flex justify-center items-center w-full h-[67vh] bg-white rounded-xl border shadow-sm border-slate-300">
          <ImSpinner3 className="h-10 w-10 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="h-[67vh] px-4 bg-white overflow-auto relative w-full rounded-xl border shadow-sm border-slate-300">
          <table className="w-screen lg:w-full px-8 relative">
            <thead className="sticky top-0 z-20 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left font-medium pt-3 text-[#7C7C7C] text-sm"
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
        </div>
      )}
    </div>
  );
};

export default memo(ReviewTable);
