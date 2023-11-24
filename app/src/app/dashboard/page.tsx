"use client";
import GradientHeading from "@/components/GradientHeading";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/store/auth.store";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const router = useRouter();

  const logout = () => {
    const localStorageKeysToRemove = [
      "APP_SESSION_TOKEN",
      "AUTH_LOGIN",
      "AUTH_PASSWORD",
    ];
    localStorageKeysToRemove.forEach((key) => localStorage.removeItem(key));
    resetAuth();
    router.push("/");
  };

  useEffect(() => {
    const isAuthEmpty =
      auth.appSessionToken === "" || auth.login === "" || auth.password === "";

    const isWindowDefined = typeof window !== "undefined";

    if (isAuthEmpty && isWindowDefined) {
      const appSessionToken = localStorage.getItem(
        "APP_SESSION_TOKEN"
      ) as string;
      const login = localStorage.getItem("AUTH_LOGIN") as string;
      const password = localStorage.getItem("AUTH_PASSWORD") as string;
      if (appSessionToken && login && password) {
        setAuth({
          appSessionToken,
          login,
          password,
        });
      } else {
        redirect("/");
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <GradientHeading title="Dashboard" />
      <Button onClick={() => console.log(auth)}>Auth</Button>
      <Button onClick={() => logout()}>Se déconnecter</Button>
    </div>
  );
};

export default page;
