"use server";

import Consumer from "../types/Consumer";

const getConsumers = async (data: {
  sessionToken: string;
  vendorCode: string;
}) => {
  try {
    console.log(data.sessionToken, data.vendorCode);

    const formatVendorCode = data.vendorCode.padStart(8, "0");

    const response = await fetch(
      "https://appli.charlott.fr/ws/fr_liste_consommateur",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `format=json&token=${data.sessionToken}&limit=0&locale=fr-FR&dos=gch&page=0&code_vendeur=${formatVendorCode}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const responseData = await response.json();
    if (responseData.erreur) {
      if (responseData.erreur.code === 1025) {
        return null;
      }
    }
    // console.log("");
    // console.log(responseData);
    // console.log("👥 Consumers :", responseData.length);
    return responseData as Consumer[];
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

export default getConsumers;
