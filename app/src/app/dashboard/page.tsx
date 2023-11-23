"use client";
import GradientHeading from "@/components/GradientHeading";
import { Button } from "@/components/ui/button";
import useAppSessionTokenStore from "@/lib/store/appSessionToken.store";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const appSessionToken = useAppSessionTokenStore((s) => s.appSessionToken);
  const setAppSessionToken = useAppSessionTokenStore(
    (s) => s.setAppSessionToken
  );
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("APP_SESSION_TOKEN");
    setAppSessionToken("");
    router.push("/");
  };

  useEffect(() => {
    if (!appSessionToken) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("APP_SESSION_TOKEN")) {
          const token = localStorage.getItem("APP_SESSION_TOKEN") as string;
          setAppSessionToken(token);
        } else {
          redirect("/");
        }
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <GradientHeading title="Dashboard" />
      <Button onClick={() => console.log(appSessionToken)}>
        Logger App Session Token
      </Button>
      <Button onClick={() => logout()}>Se déconnecter</Button>
    </div>
  );
};

export default page;
