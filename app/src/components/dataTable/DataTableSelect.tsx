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
  dataType?: string;
}

const DataTableSelect = ({
  itemPerPage,
  setItemPerPage,
  dataType,
}: IDataTableSelectProps) => {
  const options = ["10", "20", "50", "100"];

  return (
    <div className="flex gap-2 items-center text-base font-normal">
      <p className="hidden md:block">
        Nombre de {dataType ?? "objet"} par page :
      </p>
      <Select
        onValueChange={setItemPerPage}
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
