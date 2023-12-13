type ImageData = {
  url: string;
  width: number;
  height: number;
};

type Lookbook = {
  image_data: {
    zoom: ImageData;
    desktop: ImageData;
    mobile: ImageData;
    sous_ligne: ImageData;
  };
  ligne_code: string;
  ligne_lib: string;
  forme_code: string;
  forme_lib: string;
  sous_lignes_secondaire: ArticleWithoutAvailability[];
};

export type ArticleWithoutAvailability = {
  collection: string;
  image_data: {
    zoom: ImageData;
    desktop: ImageData;
    mobile: ImageData;
    sous_ligne: ImageData;
  };
  ligne_code: string;
  ligne_libelle: string;
  forme_code: string;
  forme_libelle: string;
};

export type Reference = {
  code: string;
  disponibilite: string;
  taile: { code: string; libelle: string };
  tarif: Tarif;
};

export type Tarif = {
  solde: boolean;
  promo_type: number;
  promo_libelle: string;
  pu_net: string;
  pu_brut: string;
  qvp_nette: string;
  qvp_brute: string;
};

export type Article = ArticleWithoutAvailability & {
  references?: Reference[] | null;
};

export type Collection = {
  libelle: string;
  lookbooks: Lookbook[];
};
