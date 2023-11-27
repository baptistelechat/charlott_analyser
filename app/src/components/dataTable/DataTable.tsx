"use client";
import Consumer from "@/lib/types/Consumer";
import { Skeleton } from "@ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import { CalendarDays, Link } from "lucide-react";

interface IDataTableProps {
  data: Consumer[];
  itemPerPage: string;
  pageIndex: number;
  setMaxPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const DataTable = ({
  data,
  itemPerPage,
  pageIndex,
  setMaxPageIndex,
}: IDataTableProps) => {
  const pageData = () => {
    if (data.length > 0) {
      const maxFullPage = Math.floor(data.length / Number(itemPerPage));
      setMaxPageIndex(maxFullPage + 1);

      if (maxFullPage >= pageIndex) {
        return data.slice(
          data.length - Number(itemPerPage) * pageIndex,
          data.length - Number(itemPerPage) * pageIndex + Number(itemPerPage)
        );
        // .reverse();
      } else {
        return data.slice(0, data.length - maxFullPage * Number(itemPerPage));
        // .reverse();
      }
    }
    return [];
  };

  if (pageData().length === 0) {
    return (
      <>
        <div className="w-full h-8"/>
        {Array.from({ length: 11 }, (_, index) => (
          <div
          key={index}
          className="w-full flex flex-row justify-between mb-4"
          >
            <Skeleton className="w-1/4 h-4 rounded-full" />
            <Skeleton className="w-1/4 h-4 rounded-full" />
            <Skeleton className="w-1/4 h-4 rounded-full" />
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
          <TableHead>
            <div className="flex gap-2 items-center">
              <CalendarDays />
              Prenom
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <Link />
              Nom
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <Link />
              Code Postal
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageData().map((d, index) => (
          <TableRow key={index}>
            <TableCell>{d.prenom}</TableCell>
            <TableCell>{d.nom}</TableCell>
            <TableCell>{d.code_postal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
