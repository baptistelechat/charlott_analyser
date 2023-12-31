"use client";
import { ImageData } from "@/lib/types/Article";
import simplifiedImagesData from "@/lib/utils/simplifiedImagesData";
import { Skeleton } from "@ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import DataTableCarrousel from "./DataTableCarrousel";

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
        // Filter Consumers
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

          if (maxFullPage > pageIndex) {
            return filteredData
              .slice(
                filteredData.length - Number(itemPerPage) * pageIndex,
                filteredData.length -
                  Number(itemPerPage) * pageIndex +
                  Number(itemPerPage)
              )
              .reverse();
          } else {
            return filteredData
              .slice(0, filteredData.length - maxFullPage * Number(itemPerPage))
              .reverse();
          }
        }
        // Filter Articles
        if (
          data.every(
            (article) => article.ligne_libelle || article.forme_libelle
          )
        ) {
          const filteredData = data
            .filter((article) => {
              const name =
                `${article.collection} ${article.ligne_libelle} ${article.forme_libelle}`.toUpperCase();
              return name.includes(searchValue.toUpperCase());
            })
            .slice()
            .sort((a, b) => {
              const collectionA = String(a.collection || "").toLowerCase();
              const collectionB = String(b.collection || "").toLowerCase();

              return collectionB.localeCompare(collectionA);
            });
          const maxFullPage = Math.floor(
            filteredData.length / Number(itemPerPage)
          );

          setMaxPageIndex(maxFullPage);

          if (maxFullPage > pageIndex) {
            return filteredData
              .slice(
                filteredData.length - Number(itemPerPage) * pageIndex,
                filteredData.length -
                  Number(itemPerPage) * pageIndex +
                  Number(itemPerPage)
              )
              .reverse();
          } else {
            return filteredData
              .slice(0, filteredData.length - maxFullPage * Number(itemPerPage))
              .reverse();
          }
        }
      }

      // No Filter
      const sortedData = data
        .slice()
        .sort((a, b) => {
          const nomA = String(a.nom || "").toLowerCase();
          const nomB = String(b.nom || "").toLowerCase();

          return nomB.localeCompare(nomA);
        })
        .slice()
        .sort((a, b) => {
          const collectionA = String(a.collection || "").toLowerCase();
          const collectionB = String(b.collection || "").toLowerCase();

          return collectionB.localeCompare(collectionA);
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
      if (cell.action.includes("link")) {
        const link = content as string;
        window.open(link);
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
                  <HoverCard>
                    <HoverCardTrigger>
                      <p
                        onClick={() =>
                          handleAction(
                            cell,
                            cell.action === "address"
                              ? `${d.lig1 ?? ""} ${d.lig2 ?? ""} ${
                                  d.lig3 ?? ""
                                } ${d.lig4 ?? ""} - ${d.code_postal} ${d.ville}`
                              : cell.action === "available_link"
                              ? `https://www.charlott.fr/dressing/product/${d.ligne_code}/article/${d.forme_code}/`
                              : content
                          )
                        }
                        className={
                          cell.action ? "cursor-pointer hover:underline" : ""
                        }
                      >
                        {content}
                      </p>
                    </HoverCardTrigger>
                    {d.images_data ? (
                      <HoverCardContent>
                        <DataTableCarrousel
                          images={simplifiedImagesData(d.images_data)}
                        />
                      </HoverCardContent>
                    ) : (
                      <></>
                    )}
                  </HoverCard>
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
