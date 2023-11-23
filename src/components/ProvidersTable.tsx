import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { T_Providers } from "@/types/providers";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ImSpinner3 } from "react-icons/im";

const AllProviders = () => {
  const providers = useSelector((state: RootState) => state.provider.providers);
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<T_Providers[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  useEffect(() => {
    setData(providers)
  }, [providers])
  
  const columns = useMemo<ColumnDef<T_Providers>[]>(
    () => [
      {
        accessorKey: "id",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <span className=" text-slate-600 text-xs">{row.original._id}</span>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "productName",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <div className="flex relative rounded-full w-[40px] h-[40px] overflow-hidden justify-center items-center">
              {row.original.avatar ? (
                <Image
                  src={row.original.avatar}
                  alt={row.original.firstName}
                  fill
                  className="rounded"
                />
              ) : (
                <div className=" h-full w-full bg-slate-300 flex justify-center items-center text-sm">
                  {`${row.original.firstName
                    .charAt(0)
                    .toUpperCase()} ${row.original.lastName
                    .charAt(0)
                    .toUpperCase()}`}
                </div>
              )}
            </div>
            <div className="flex flex-col text-slate-600">
              <span className="">
                {row.original.firstName} {row.original.lastName}
              </span>
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
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <span className=" text-slate-600 text-xs">
              {row.original.phoneNumber}
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Mobile Number</span>
        ),
      },
      {
        accessorKey: "status",
        cell: ({ row }) => {
          switch (row.original.online) {
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
        header: () => <span className="text-sm text-[#7C7C7C]">Date Date</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-1 items-center">
            <Link
              href={`/providers/${row.original._id}`}
              className="hover:scale-90 border-none transition duration-300"
            >
              <MdRemoveRedEye size={24} />
            </Link>
            {/* <button
              className="hover:scale-90 border-none transition duration-300"
              onClick={() => {
                const newData = data.filter((_, idx) => idx !== row.index);
                setData(newData);
              }}
            >
              <MdDeleteOutline size={24} />
            </button> */}
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
      <div className="h-[67vh] px-4 bg-white relative w-full rounded-xl border shadow-sm border-slate-300">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ImSpinner3 className="h-10 w-10 animate-spin text-slate-400" />
          </div>
        ) : providers?.length > 0 ? (
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
        ) : (
          <h3 className="flex justify-center text-sm text-slate-500 h-full items-center">
            Currently, there is no provider on the platform yet
          </h3>
        )}
      </div>
    </div>
  );
};

export default memo(AllProviders);
