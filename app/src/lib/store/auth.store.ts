import { create } from "zustand";
import AuthCredentials from "../types/AuthCredentials";

type AuthStoreType = {
  auth: {
    appSessionToken: string;
    login: string;
    password: string;
  };
  setAuth: (newAuth: Partial<AuthCredentials>) => void;
  resetAuth: () => void;
};

const defaultAuth: AuthCredentials = {
  appSessionToken: "",
  login: "",
  password: "",
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
