"use client";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React, { useEffect, useState } from "react";
import { DataTablePagination } from "./DataTablePagination";

type Params = {
  page: string;
  limit: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: {
    data: TData[];
    meta: {
      total: string | number;
      page?: number;
      limit?: number;
    };
  };
  setParams: React.Dispatch<React.SetStateAction<Params>>;
  params: Params;
  isPagination?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  setParams,
  params,
  isPagination = true,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(params.page) - 1,
    pageSize: parseInt(params.limit),
  });

  const table = useReactTable<TData>({
    data: data.data,
    columns,
    rowCount: typeof data.meta.total === 'string' ? parseInt(data.meta.total) : data.meta.total,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      pageIndex: page - 1
    }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination(prev => ({
      pageIndex: 0,
      pageSize: limit
    }));
  };

  useEffect(() => {
    setParams({
      page: (pagination.pageIndex + 1).toString(),
      limit: pagination.pageSize.toString(),
    });
  }, [pagination, setParams]);

  const totalPages = Math.ceil(
    (typeof data.meta.total === 'string' ? parseInt(data.meta.total) : data.meta.total) / pagination.pageSize
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-card hover:bg-card"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="cursor-pointer" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Aucune résultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isPagination && (
        <DataTablePagination
          currentPage={pagination.pageIndex + 1}
          totalPages={totalPages}
          totalItems={typeof data.meta.total === 'string' ? parseInt(data.meta.total) : data.meta.total}
          limit={pagination.pageSize}
          currentItems={table.getRowModel().rows.length}
          onPageChange={handlePageChange}
          onlimitChange={handleLimitChange}
        />
      )}
    </div>
  );
}
