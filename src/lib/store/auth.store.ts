import { create } from "zustand";
import AuthCredentials from "../types/AuthCredentials";

type AuthStoreType = {
  auth: {
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
  setAuth: (newAuth: Partial<AuthCredentials>) => void;
  resetAuth: () => void;
};

const defaultAuth: AuthCredentials = {
  appSessionToken: "",
  login: "",
  userData: {
    image: "",
    nom: "",
    prenom: "",
    nom_complet: "",
    email: "",
    telephone_fixe: "",
    telephone_mobile: "",
    titre: "",
    date_demarrage: "",
    secteur: "",
    adresse: {
      denomination: "",
      code_postal: "",
      ville: "",
      cp_ville: "",
    },
    parrain: {
      id: "",
      nom: "",
      prenom: "",
      nom_complet: "",
    },
  },
};

const useAuthStore = create<AuthStoreType>((set) => ({
  auth: defaultAuth,
  setAuth: (newAuth: Partial<AuthCredentials>) => {
    set((state) => ({
      auth: {
        ...state.auth,
        ...newAuth,
      },
    }));
  },
  resetAuth: () => {
    set({ auth: defaultAuth });
  },
}));

export default useAuthStore;
