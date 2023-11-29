"use server";

const getAppSessionToken = async (data: {
  login: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      "https://appli.charlott.fr/ws/fr_verifie_authentification",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `id=${data.login}&mdp=${data.password}&format=json&code_vendeur=${data.login}&authenticate=1`,
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData.erreur) {
      if (responseData.erreur.code === 1003) {
        return responseData;
      }
    }
    
    // console.log("");
    // console.log("🔑 App - Session Token :", responseData);
    return responseData;
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

export default getAppSessionToken;
