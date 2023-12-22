"use client";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IDataTablePaginationProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxPageIndex: number;
}

const DataTablePagination = ({
  pageIndex,
  setPageIndex,
  maxPageIndex,
}: IDataTablePaginationProps) => {
  const handlePreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  return (
    <div className="flex flex-row gap-2 items-center text-base font-normal">
      <Button
        disabled={pageIndex === 1}
        variant="outline"
        size="icon"
        onClick={handlePreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <p className="flex items-center gap-1">
        <span className="hidden md:block">Page</span>
        <Input
          value={pageIndex}
          onChange={(e) => setPageIndex(Number(e.target.value))}
          className="w-11"
        />
        / {maxPageIndex === 0 ? 1 : maxPageIndex}
      </p>
      <Button
        disabled={pageIndex === maxPageIndex || maxPageIndex === 0}
        variant="outline"
        size="icon"
        onClick={handleNextPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DataTablePagination;
