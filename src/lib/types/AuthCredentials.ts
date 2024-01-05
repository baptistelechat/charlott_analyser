type AuthCredentials = {
  appSessionToken: string;
  login: string;
  userData: {
    image: string;
    nom: string;
    prenom: string;
    nom_complet: string;
    email: string;
    telephone_fixe: string;
    telephone_mobile: string;
    titre: string;
    date_demarrage: string;
    secteur: string;
    adresse: {
      denomination: string;
      code_postal: string;
      ville: string;
      cp_ville: string;
    };
    parrain: {
      id: string;
      nom: string;
      prenom: string;
      nom_complet: string;
    };
  };
};

export default AuthCredentials;
