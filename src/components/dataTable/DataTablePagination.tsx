"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

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
    <div className="flex flex-row gap-4 items-center text-base font-normal">
      <Button
        disabled={pageIndex === 1}
        variant="outline"
        size="icon"
        onClick={handlePreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <p className="flex gap-1">
        <span className="hidden md:block">Page</span> {pageIndex}/{maxPageIndex}
      </p>
      <Button
        disabled={pageIndex === maxPageIndex}
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
