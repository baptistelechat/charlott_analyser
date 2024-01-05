"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

interface IDataTableSelectProps {
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  dataType?: string;
}

const DataTableSelect = ({
  itemPerPage,
  setItemPerPage,
  setPageIndex,
  dataType,
}: IDataTableSelectProps) => {
  const options = ["10", "20", "50", "100"];

  const apostrophe = ["a", "e", "i", "o", "u", "y", "h"];

  return (
    <div className="flex gap-2 items-center text-base font-normal">
      <p className="hidden md:block">
        Nombre{" "}
        {dataType !== undefined
          ? apostrophe.includes(dataType[0])
            ? "d'"
            : "de "
          : ""}
        {dataType ?? "objet"} par page :
      </p>
      <Select
        onValueChange={(value) => {
          setItemPerPage(value);
          setPageIndex(1);
        }}
        value={itemPerPage}
      >
        <SelectTrigger className="w-20 ">
          <SelectValue placeholder={itemPerPage} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DataTableSelect;
