import { create } from "zustand";
import { Article } from "../types/Article";

type ArticlesStoreType = {
  articles: Article[];
  setArticles: (newArticles: Article[]) => void;
  resetArticles: () => void;
};

const defaultArticle: Article[] = [];

const useArticlesStore = create<ArticlesStoreType>((set) => ({
  articles: defaultArticle,
  setArticles: (newArticles: Article[]) => {
    set({
      articles: newArticles,
    });
  },
  resetArticles: () => {
    set({ articles: defaultArticle });
  },
}));

export default useArticlesStore;
