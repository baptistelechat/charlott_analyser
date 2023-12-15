"use server";

import { Article, Collection, Reference, Tarif } from "../types/Article";

const getAvailability = async (data: {
  sessionToken: string;
  ligne_code: string;
  forme_code: string;
}) => {
  try {
    const response = await fetch(
      "https://appli.charlott.fr/ws/fr_detail_sous_ligne",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        referrer: "https://www.charlott.fr/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `format=json&dos=gch&token=${data.sessionToken}&lig=${data.ligne_code}&fo=${data.forme_code}`,
        method: "POST",
        mode: "cors",
        cache: "no-cache",
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

    const articles = responseData.articles as any[];

    if (Array.isArray(articles) && articles.length > 0) {
      return articles.map((article) => {
        return {
          code: article.code,
          disponibilite: article.disponibilite,
          taile: {
            code: article.taille.code,
            libelle: article.taille.libelle,
          },
          tarif: {
            solde: article.tarif.solde,
            promo_type: article.tarif.promo_type,
            promo_libelle: article.tarif.promo_libelle,
            pu_net: article.tarif.pu_net,
            pu_brut: article.tarif.pu_brut,
            qvp_nette: article.tarif.qvp_nette,
            qvp_brute: article.tarif.qvp_brute,
          } as Tarif,
        } as Reference;
      });
    } else {
      // console.error(
      //   "Erreur lors de l'envoi des données :",
      //   "La liste d'articles est vide ou non définie."
      // );
      console.error("Erreur lors de l'envoi des données :", {
        message: "Produit non disponible",
        ligne_code: data.ligne_code,
        forme_code: data.forme_code,
      });
      return null;
    }
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

const getArticles = async (data: { sessionToken: string }) => {
  try {
    const response = await fetch(
      "https://appli.charlott.fr/ws/fr_liste_produits_new",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: `format=json&dos=gch&token=${data.sessionToken}&affichage=1&empty=true`,
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-cache",
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
    // console.log("🛒 Articles :", responseData.length);

    if (responseData.length > 0) {
      const articles: Article[] = [];

      responseData.map((collection: Collection) => {
        collection.lookbooks.map((lookbook) => {
          const article: Article = {
            collection: collection.libelle,
            image_data: lookbook.image_data,
            ligne_code: lookbook.ligne_code,
            ligne_libelle: lookbook.ligne_lib,
            forme_code: lookbook.forme_code,
            forme_libelle: lookbook.forme_lib,
          };
          articles.push(article);

          lookbook.sous_lignes_secondaire?.map((sous_ligne) => {
            const article: Article = {
              collection: collection.libelle,
              image_data: sous_ligne.image_data,
              ligne_code: sous_ligne.ligne_code,
              ligne_libelle: sous_ligne.ligne_libelle,
              forme_code: sous_ligne.forme_code,
              forme_libelle: sous_ligne.forme_libelle,
            };
            articles.push(article);
          });
        });
      });

      return articles as Article[];

      return articles as Article[];
    } else {
      console.error(
        "Erreur lors de l'envoi des données :",
        "responseData is empty"
      );
      return null;
    }
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
};

export default getArticles;
