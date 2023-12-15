"use client";
import { Skeleton } from "@ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";

interface IDataTableProps {
  data: any[];
  tableHead: {
    title: string;
    icon: JSX.Element;
  }[];
  tableCell: {
    parameter: string | string[];
    action?: string;
  }[];
  itemPerPage: string;
  pageIndex: number;
  setMaxPageIndex: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
}

const DataTable = ({
  data,
  tableHead,
  tableCell,
  itemPerPage,
  pageIndex,
  setMaxPageIndex,
  searchValue,
}: IDataTableProps) => {
  const pageData = () => {
    if (data.length > 0) {
      if (searchValue.length > 3) {
        if (data.every((consumer) => consumer.nom || consumer.prenom)) {
          const filteredData = data
            .filter((consumer) => {
              const name = `${consumer.nom} ${consumer.prenom}`.toUpperCase();
              return name.includes(searchValue.toUpperCase());
            })
            .slice()
            .sort((a, b) => {
              const nomA = String(a.nom || "").toLowerCase();
              const nomB = String(b.nom || "").toLowerCase();

              return nomB.localeCompare(nomA);
            });
          const maxFullPage = Math.floor(
            filteredData.length / Number(itemPerPage)
          );
          setMaxPageIndex(maxFullPage);
          return filteredData;
        }
      }

      const sortedData = data.slice().sort((a, b) => {
        const nomA = String(a.nom || "").toLowerCase();
        const nomB = String(b.nom || "").toLowerCase();

        return nomB.localeCompare(nomA);
      });

      const maxFullPage = Math.floor(sortedData.length / Number(itemPerPage));
      setMaxPageIndex(maxFullPage);

      if (maxFullPage > pageIndex) {
        return sortedData
          .slice(
            sortedData.length - Number(itemPerPage) * pageIndex,
            sortedData.length -
              Number(itemPerPage) * pageIndex +
              Number(itemPerPage)
          )
          .reverse();
      } else {
        return sortedData
          .slice(0, sortedData.length - maxFullPage * Number(itemPerPage))
          .reverse();
      }
    }
    return [];
  };

  const handleAction = (
    cell: { parameter: string | string[]; action?: string },
    content: string | number | boolean | null
  ) => {
    if (cell.action) {
      if (cell.action === "mail") {
        window.open(`mailto:${content}`);
      }
      // if (cell.action === "tel") {
      //   window.open(`tel:${content}`);
      // }
      if (cell.action === "address") {
        window.open(`https://www.google.fr/maps/place/${content}/`);
      }
    }
  };

  if (pageData().length === 0) {
    return (
      <>
        <div className="w-full h-8" />
        {Array.from({ length: 11 }, (_, index) => (
          <div
            key={index}
            className="w-full flex flex-row justify-between mb-4"
          >
            <Skeleton className="w-1/6 h-4 rounded-full" />
            <Skeleton className="w-1/6 h-4 rounded-full" />
            <Skeleton className="w-1/6 h-4 rounded-full" />
            <Skeleton className="w-1/6 h-4 rounded-full" />
            <Skeleton className="w-1/6 h-4 rounded-full" />
          </div>
        ))}
        <div className="w-full flex justify-center items-center mt-6 mb-6">
          <Skeleton className="w-1/2 h-4 rounded-full" />
        </div>
      </>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHead.map(
            (
              head,
              index // Utilisation de map pour générer les en-têtes
            ) => (
              <TableHead key={index} className="w-1/6">
                <div className="flex gap-2 items-center">
                  {head.icon}
                  {head.title}
                </div>
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageData().map((d, index) => (
          <TableRow key={index}>
            {tableCell.map((cell, cellIndex) => {
              const content = Array.isArray(cell.parameter)
                ? cell.parameter
                    .map((propertyName: string) => d[propertyName])
                    .join(" ")
                : d[cell.parameter];

              return (
                <TableCell key={cellIndex}>
                  <p
                    onClick={() =>
                      handleAction(
                        cell,
                        cell.action === "address"
                          ? `${d.lig1 ?? ""} ${d.lig2 ?? ""} ${d.lig3 ?? ""} ${
                              d.lig4 ?? ""
                            } - ${d.code_postal} ${d.ville}`
                          : content
                      )
                    }
                    className={
                      cell.action ? "cursor-pointer hover:underline" : ""
                    }
                  >
                    {content}
                  </p>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
