import { create } from "zustand";

type AppSessionTokenStoreType = {
  appSessionToken: string;
  setAppSessionToken: (newAppSessionToken: string) => void;
};

const useAppSessionTokenStore = create<AppSessionTokenStoreType>((set) => ({
  appSessionToken: "",
  setAppSessionToken: (newAppSessionToken: string) => {
    set({ appSessionToken: newAppSessionToken });
  },
}));

export default useAppSessionTokenStore;
