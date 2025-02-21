import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  limit: number;
  currentItems: number;
  onPageChange: (_page: number) => void;
  onlimitChange?: (_limit: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
  currentItems,
  onPageChange,
  onlimitChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex flex-col gap-4 px-2 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between lg:gap-8">
        <div className="text-sm text-muted-foreground">
          {currentItems} résultat{currentItems > 1 ? "s" : ""} sur{" "}
          {totalItems ?? 0} entrées
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Lignes par page</p>
          <select
            className="h-8 w-[70px] rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={limit.toString()}
            onChange={(value) => {
              onlimitChange?.(Number(value.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="text-sm font-medium">
          Page {currentPage} sur {totalPages}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Première page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Page précédente</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Page suivante</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Dernière page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
