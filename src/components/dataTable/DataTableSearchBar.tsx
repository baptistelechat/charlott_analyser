import { EraserIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface IDataTableSearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const DataTableSearchBar = ({
  searchValue,
  setSearchValue,
  setPageIndex
}: IDataTableSearchBarProps) => {
  return (
    <div className="flex w-full items-center gap-4">
      <Input
        type="text"
        placeholder="Recherche ..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        disabled={searchValue === ""}
        variant="outline"
        size="icon"
        onClick={() => {
          setSearchValue("");
          setPageIndex(1);
        }}
      >
        <EraserIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DataTableSearchBar;
