export type ImageData = {
  url: string;
  width: number;
  height: number;
};

type Lookbook = {
  image_data: ImageData[];
  ligne_code: string;
  ligne_lib: string;
  forme_code: string;
  forme_lib: string;
  sous_lignes_secondaire: Article[];
};

export type Article = {
  collection: string;
  images_data: ImageData[];
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

export type Collection = {
  libelle: string;
  lookbooks: Lookbook[];
};
