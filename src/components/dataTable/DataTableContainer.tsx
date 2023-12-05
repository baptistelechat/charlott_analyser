"use client";
import Consumer from "@/lib/types/Consumer";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { RotateCcwIcon } from "lucide-react";
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
  refreshData: () => void;
}

const DataTableContainer = ({
  data,
  title,
  dataType,
  tableHead,
  tableCell,
  refreshData,
}: IDataTableContainerProps) => {
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setPageIndex(1);
  }, []);

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Recherche ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-4">
            {title ?? "Tableau de données"}
            {searchValue.length <= 3 && data.length > 0
              ? ` - ${data.length}`
              : ""}
            {searchValue.length <= 3 && data.length > 0 ? ` ${dataType}(s)` : ""}
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                refreshData();
              }}
            >
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
          </div>
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
          ) : searchValue !== "" ? (
            <></>
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
          searchValue={searchValue}
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
