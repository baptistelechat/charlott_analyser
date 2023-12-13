"use client";

import useAuthStore from "@/lib/store/auth.store";
import { Article } from "@/lib/types/Collection";
import getArticles from "@/lib/utils/getArticles";
import { useEffect, useState } from "react";

const page = () => {
  const auth = useAuthStore((s) => s.auth);
  const [articles, setArticles] = useState<Article[] | null>([]);
  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    const isAuthEmpty = auth.appSessionToken === "" || auth.login === "";

    const isWindowDefined = typeof window !== "undefined";

    if (isAuthEmpty && isWindowDefined) {
      const appSessionToken = localStorage.getItem(
        "APP_SESSION_TOKEN"
      ) as string;

      const data = getArticles({
        sessionToken: appSessionToken,
      });
      data.then((articles) => {
        if (articles !== null) {
          console.log(articles)
          setArticles(articles);

          const uniqueCollections = Array.from(
            new Set(articles.map((article) => article.collection))
          );
          setCollections(uniqueCollections);
        }
      });
    }
  }, []);

  return (
    <>
      {collections?.map((collection, index) => (
        <p key={`collection ${index}`}>{collection}</p>
      ))}
      <p className="font-bold">---------------</p>
      {articles?.map((article) => (
        <p key={`${article.ligne_code}${article.forme_code}`}>
          {article.ligne_libelle} {article.forme_libelle} ({article.ligne_code}/
          {article.forme_code})
        </p>
      ))}
    </>
  );
};
export default page;
