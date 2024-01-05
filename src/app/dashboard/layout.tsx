"use client";
import GradientHeading from "@/components/GradientHeading";
import Sidebar from "@/components/Sidebar";
import User from "@/components/User";
import { ScrollArea } from "@/components/ui/scroll-area";
import useArticlesStore from "@/lib/store/articles.store";
import useAuthStore from "@/lib/store/auth.store";
import useConsumersStore from "@/lib/store/consumers.store";
import formatTitle from "@/lib/utils/formatTitle";
import getArticles from "@/lib/utils/getArticles";
import getConsumers from "@/lib/utils/getConsumers";
import getUserData from "@/lib/utils/getUserData";
import logout from "@/lib/utils/logout";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);
  // Consumers
  const consumers = useConsumersStore((s) => s.consumers);
  const setConsumers = useConsumersStore((s) => s.setConsumers);
  // Articles
  const articles = useArticlesStore((s) => s.articles);
  const setArticles = useArticlesStore((s) => s.setArticles);
  // Navigation
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAuthEmpty = auth.appSessionToken === "" || auth.login === "";

    const isWindowDefined = typeof window !== "undefined";

    if (isAuthEmpty && isWindowDefined) {
      const appSessionToken = localStorage.getItem(
        "APP_SESSION_TOKEN"
      ) as string;
      const login = localStorage.getItem("AUTH_LOGIN") as string;
      // Set Auth Credentials
      if (appSessionToken && login) {
        const data = getUserData({
          login: login,
          sessionToken: appSessionToken,
        });

        data.then((userData) => {
          if (userData) {
            setAuth({
              appSessionToken,
              login,
              userData,
            });
          } else {
            redirect("/");
          }
        });
      } else {
        redirect("/");
      }
      // Set Consumers
      if (consumers.length === 0) {
        const data = getConsumers({
          sessionToken: appSessionToken,
          vendorCode: login,
        });

        if (data) {
          data.then((consumers) => {
            if (consumers === null) {
              // AppSessionToken is outdated
              logout(router);
            } else {
              // AppSessionToken is not outdated
              setConsumers(consumers);
            }
          });
        }
      }
      // Set Articles
      if (articles.length === 0) {
        const data = getArticles({
          sessionToken: appSessionToken,
        });

        if (data) {
          data.then((articles) => {
            if (articles === null) {
              // AppSessionToken is outdated
              logout(router);
            } else {
              // AppSessionToken is not outdated
              setArticles(articles);
            }
          });
        }
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex p-6 pr-0 gap-6">
      <Sidebar />
      <ScrollArea className="w-10/12 h-full pl-2 pr-6">
        <div className="w-full h-full flex flex-col justify-center items-start gap-4">
          <div className="w-full flex flex-between justify-between items-center">
            <GradientHeading title={formatTitle(pathname)} heading={2} />
            <User/>
          </div>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
