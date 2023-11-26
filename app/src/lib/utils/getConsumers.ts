import Consumer from "../types/Consumer";

const getConsumers = async (data: {
  sessionToken: string;
  vendorCode: string;
}) => {
  try {
    const localBaseApiUrl = process.env.API_URL as string;

    const response = await fetch(
      `${localBaseApiUrl}/api/charlott/app/consumers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const responseData = await response.json() as Consumer[];
    console.log("")
    console.log("👥 Consumers :", responseData);
    return responseData;
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

export default getConsumers;
