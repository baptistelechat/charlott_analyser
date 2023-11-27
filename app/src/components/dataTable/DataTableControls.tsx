"use client";
import DataTablePagination from "./DataTablePagination";
import DataTableSelect from "./DataTableSelect";

interface IDataTableControlsProps {
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxPageIndex: number;
  style?: string;
  dataType?: string;
}

const DataTableControls = ({
  itemPerPage,
  setItemPerPage,
  pageIndex,
  setPageIndex,
  maxPageIndex,
  style,
  dataType,
}: IDataTableControlsProps) => {
  return (
    <div className={`${style} flex gap-4`}>
      <DataTableSelect
        dataType={dataType}
        itemPerPage={itemPerPage}
        setItemPerPage={setItemPerPage}
      />
      <DataTablePagination
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        maxPageIndex={maxPageIndex}
      />
    </div>
  );
};

export default DataTableControls;
