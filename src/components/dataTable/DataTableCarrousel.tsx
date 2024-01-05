import { ImageData } from "@/lib/types/Article";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

interface IDataTableCarrouselProps {
  images: ImageData[];
}

const DataTableCarrousel = ({ images }: IDataTableCarrouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePreviousPage = () => {
    setCurrentImageIndex(currentImageIndex - 1);
  };
  const handleNextPage = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={images[currentImageIndex].url}
        width={images[currentImageIndex].width}
        height={images[currentImageIndex].height}
        alt={`image`}
      />
      {images.length > 1 ? <div className="flex flex-row gap-2 items-center text-base font-normal">
        <Button
          disabled={currentImageIndex === 0}
          variant="outline"
          size="icon"
          onClick={handlePreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          disabled={currentImageIndex === images.length-1}
          variant="outline"
          size="icon"
          onClick={handleNextPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> : <></>}
    </div>
  );
};

export default DataTableCarrousel;
