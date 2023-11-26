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
import {
  ArrowDownSquare,
  ArrowUpSquare,
  CalendarDays,
  Gauge,
  Link,
} from "lucide-react";

interface IDataTableProps {
  data: (
    | {
        id: string;
        name: string;
      }
    | undefined
  )[];
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
        return data
          .slice(
            data.length - Number(itemPerPage) * pageIndex,
            data.length - Number(itemPerPage) * pageIndex + Number(itemPerPage)
          )
          .reverse();
      } else {
        return data
          .slice(0, data.length - maxFullPage * Number(itemPerPage))
          .reverse();
      }
    }
    return [];
  };

  if (data.length === 0) {
    return (
      <div className="w-full flex flex-row justify-between">
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex gap-2 items-center">
              <CalendarDays />
              Date et heure
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <Link />
              ID
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <ArrowDownSquare />
              Download (débit descendant)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <ArrowUpSquare />
              Upload (débit ascendant)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <Gauge />
              Ping
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageData().map((d, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{d?.id}</TableCell>
            <TableCell className="font-medium">{d?.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
