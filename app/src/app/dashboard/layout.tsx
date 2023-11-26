"use client";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/lib/store/auth.store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);


  useEffect(() => {
  const isAuthEmpty =
    auth.appSessionToken === "" || auth.login === "" || auth.password === "";

  const isWindowDefined = typeof window !== "undefined";

  if (isAuthEmpty && isWindowDefined) {
    const appSessionToken = localStorage.getItem("APP_SESSION_TOKEN") as string;
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
    <div className="w-full h-full flex p-4">
      <Sidebar />
      <div className="w-10/12 h-full">{children}</div>
    </div>
  );
}
