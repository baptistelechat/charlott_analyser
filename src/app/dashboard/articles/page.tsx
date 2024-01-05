"use client";

import DataTableContainer from "@/components/dataTable/DataTableContainer";
import useArticlesStore from "@/lib/store/articles.store";
import useAuthStore from "@/lib/store/auth.store";
import getArticles from "@/lib/utils/getArticles";
import logout from "@/lib/utils/logout";
import { ShirtIcon, ShoppingBagIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const auth = useAuthStore((s) => s.auth);
  const articles = useArticlesStore((s) => s.articles);
  const setArticles = useArticlesStore((s) => s.setArticles);
  const router = useRouter();

  const refreshArticles = () => {
    setArticles([]);
    const data = getArticles({
      sessionToken: auth.appSessionToken,
    });

    if (data) {
      data.then((consumers) => {
        if (consumers === null) {
          // AppSessionToken is outdated
          logout(router);
        } else {
          // AppSessionToken is not outdated
          setArticles(consumers);
        }
      });
    }
  };

  const tableHead: {
    title: string;
    icon: JSX.Element;
  }[] = [
    {
      title: "Collection",
      icon: <ShoppingBagIcon />,
    },
    {
      title: "Ligne / Forme",
      icon: <ShirtIcon />,
    }
  ];

  const tableCell: {
    parameter: string | string[];
    action?: string;
  }[] = [
    {
      parameter: "collection",
    },
    {
      parameter: ["ligne_libelle", "forme_libelle"],
      action: "available_link",
    },
  ];

  return (
    <DataTableContainer
      data={articles}
      tableHead={tableHead}
      tableCell={tableCell}
      dataType="articles"
      refreshData={refreshArticles}
    />
  );
};
export default page;
