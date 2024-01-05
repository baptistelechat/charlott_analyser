"use server";

const getUserData = async (data: { login: string; sessionToken: string }) => {
  try {
    const response = await fetch("https://appli.charlott.fr/ws/fr_profil_vdi", {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `dos=gch&code=${data.login}&format=json&locale=fr-FR&token=${data.sessionToken}&photo_format=small`,
      method: "POST",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData.erreur) {
      if (responseData.erreur.code === 1003) {
        return null;
      }
    }

    const res = {
      image: responseData.image.origin ?? "",
      nom: responseData.personne.nom ?? "",
      prenom: responseData.personne.prenom ?? "",
      nom_complet: `${responseData.personne.prenom} ${responseData.personne.nom}`,
      email: responseData.personne.email ?? "",
      telephone_fixe: responseData.personne.telephone_fixe ?? "",
      telephone_mobile: responseData.personne.telephone_mobile ?? "",
      titre: responseData.titre.libelle ?? "",
      date_demarrage: responseData.personne.date_demarrage ?? "",
      secteur: responseData.secteur.libelle ?? "",
      adresse: {
        denomination: `${responseData.adresse.ligne_1 ?? ""} ${
          responseData.adresse.ligne_2 ?? ""
        } ${responseData.adresse.ligne_3 ?? ""}`,
        code_postal: responseData.adresse.code_postal ?? "",
        ville: responseData.adresse.ville ?? "",
        cp_ville: `${responseData.adresse.code_postal} ${responseData.adresse.ville}`,
      },
      parrain: {
        id: responseData.parrain_actuel.code.replace(/^0+/, ""),
        nom: responseData.parrain_actuel.nom,
        prenom: responseData.parrain_actuel.prenom,
        nom_complet: `${responseData.parrain_actuel.prenom} ${
          responseData.parrain_actuel.nom
        } (${responseData.parrain_actuel.code.replace(/^0+/, "")})`,
      },
    };

    // console.log("");
    // console.log("👤 App - User Data :", res);

    return res;
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

export default getUserData;
