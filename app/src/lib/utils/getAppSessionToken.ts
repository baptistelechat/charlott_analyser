"use server";

import AuthCredentials from "../types/AuthCredentials";

const getAppSessionToken = async (data: {
  login: string;
  password: string;
}) => {
  try {
    const localBaseApiUrl = process.env.API_URL as string;

    const response = await fetch(`${localBaseApiUrl}/api/charlott/app/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const responseData = (await response.json()) as AuthCredentials;
    // console.log("")
    // console.log("🔑 App - Session Token :", responseData.appSessionToken);
    return responseData;
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

export default getAppSessionToken;
