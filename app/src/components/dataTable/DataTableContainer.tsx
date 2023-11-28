"use client";
import Consumer from "@/lib/types/Consumer";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DataTable from "./DataTable";
import DataTableControls from "./DataTableControls";

interface IDataTableContainerProps {
  data: Consumer[];
  tableHead: {
    title: string;
    icon: JSX.Element;
  }[];
  tableCell: {
    parameter: string | string[];
    action?: string;
  }[];
  title?: string;
  dataType?: string;
}

const DataTableContainer = ({
  data,
  title,
  dataType,
  tableHead,
  tableCell,
}: IDataTableContainerProps) => {
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(1);
  }, []);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title ?? "Tableau de données"}
          {data.length > 0 ? ` - ${data.length}` : ""}
          {data.length > 0 ? ` ${dataType}(s)` : ""}
          {maxPageIndex !== 0 ? (
            <DataTableControls
              itemPerPage={itemPerPage}
              setItemPerPage={setItemPerPage}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              maxPageIndex={maxPageIndex}
              style="hidden sm:flex"
              dataType={dataType}
            />
          ) : (
            <p className="text-red-300 italic font-normal text-base">
              Données indisponibles
            </p>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <DataTable
          data={data}
          tableHead={tableHead}
          tableCell={tableCell}
          itemPerPage={itemPerPage}
          pageIndex={pageIndex}
          setMaxPageIndex={setMaxPageIndex}
        />
        {maxPageIndex !== 0 ? (
          <DataTableControls
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            maxPageIndex={maxPageIndex}
            dataType={dataType}
          />
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTableContainer;
