"use client";
import React from "react";
import SpeedTestDataTablePagination from "./DataTablePagination";
import SpeedTestDataTableSelect from "./DataTableSelect";

interface IDataTableControlsProps {
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxPageIndex: number;
  style?: string;
}

const DataTableControls = ({
  itemPerPage,
  setItemPerPage,
  pageIndex,
  setPageIndex,
  maxPageIndex,
  style,
}: IDataTableControlsProps) => {
  return (
    <div className={`${style} flex gap-4`}>
      <SpeedTestDataTableSelect
        itemPerPage={itemPerPage}
        setItemPerPage={setItemPerPage}
      />
      <SpeedTestDataTablePagination
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        maxPageIndex={maxPageIndex}
      />
    </div>
  );
};

export default DataTableControls;
