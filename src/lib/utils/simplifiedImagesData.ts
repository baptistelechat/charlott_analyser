import { ImageData } from "../types/Article";

const simplifiedImagesData = (images: ImageData[]) => {
  const newImagesData = images.filter((image, index, array) => {
    const splitUrl = image.url.split("/"); // Sépare l'URL par "/"
    const fileName = splitUrl[splitUrl.length - 1]; // Récupère le nom de fichier de l'URL

    // Vérifie si le nom de fichier n'apparaît qu'une seule fois dans l'array
    return array.filter((img) => img.url.endsWith(fileName)).length === 1;
  });
  return newImagesData;
};

export default simplifiedImagesData;
