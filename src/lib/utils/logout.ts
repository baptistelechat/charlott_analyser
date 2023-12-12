import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useAuthStore from "../store/auth.store";
import useConsumersStore from "../store/consumers.store";

const logout = (router: AppRouterInstance) => {
  const localStorageKeysToRemove = ["APP_SESSION_TOKEN", "AUTH_LOGIN"];
  localStorageKeysToRemove.forEach((key) => localStorage.removeItem(key));
  useAuthStore.getState().resetAuth();
  useConsumersStore.getState().resetConsumers();
  router.push("/");
};

export default logout;
