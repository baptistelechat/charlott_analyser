"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DataTable from "./DataTable";
import DataTableControls from "./DataTableControls";

const DataTableContainer = () => {
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  const data = [
    {
      id: "0",
      name: "Baptiste",
    },
    {
      id: "1",
      name: "Baptiste1",
    },
    ,
    {
      id: "2",
      name: "Baptiste2",
    },
  ];

  useEffect(() => {
    setPageIndex(1);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Tableau de données
          {data.length !== 0 ? (
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
        {data.length !== 0 ? (
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
