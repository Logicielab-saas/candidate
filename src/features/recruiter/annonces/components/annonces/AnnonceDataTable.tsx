"use client";

import {
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
} from "@/components/ui/table";
import { getColumns } from "./AnnonceColumn";

// interface VehiclesTableProps {
//     data: Vehicle[];
// }

export function AnnonceDataTable({
  data
}: {
  data: any
}) {

  const table = useReactTable({
    data,
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="w-full rounded-b-xl border border-t-2 border-zinc-200 bg-white/50 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/50">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-zinc-200 dark:border-zinc-700"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-12 bg-zinc-50/50 font-medium text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
                >
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
              <TableRow
                key={row.id}
                className="border-zinc-200 transition-colors hover:bg-zinc-50/50 dark:border-zinc-700 dark:hover:bg-zinc-700/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-3 text-zinc-700 dark:text-zinc-300"
                  >
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
                colSpan={getColumns().length}
                className="h-24 text-center text-zinc-500 dark:text-zinc-400"
              >
                Aucun véhicule trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
