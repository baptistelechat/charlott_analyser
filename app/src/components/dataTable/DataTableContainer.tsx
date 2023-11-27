"use client";
import Consumer from "@/lib/types/Consumer";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DataTable from "./DataTable";
import DataTableControls from "./DataTableControls";

interface IDataTableContainerProps {
  data: Consumer[];
}

const DataTableContainer = ({ data }: IDataTableContainerProps) => {
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
          Tableau de données
          {maxPageIndex !== 0 ? (
            <DataTableControls
              itemPerPage={itemPerPage}
              setItemPerPage={setItemPerPage}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              maxPageIndex={maxPageIndex}
              style="hidden sm:flex"
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
          />
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTableContainer;
