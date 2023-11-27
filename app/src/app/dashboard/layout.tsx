"use client";
import GradientHeading from "@/components/GradientHeading";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuthStore from "@/lib/store/auth.store";
import formatTitle from "@/lib/utils/formatTitle";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);
  const pathname = usePathname();

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
    <div className="w-full h-full flex p-6 pr-0 gap-6">
      <Sidebar />
      <ScrollArea className="w-10/12 h-full pl-2 pr-6">
        <div className="w-full h-full flex flex-col justify-center items-start gap-4">
          <GradientHeading title={formatTitle(pathname)} heading={2} />
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
