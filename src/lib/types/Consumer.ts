type Consumer = {
  dernier_atelier_style_id: number | null;
  dernier_atelier_style: string | null;
  code: string;
  nom: string;
  prenom: string;
  u_nom: string;
  u_prenom: string;
  email: string | null;
  telephone: string;
  lig1: string | null;
  lig2: string | null;
  lig3: string | null;
  lig4: string | null;
  pays: string;
  code_postal: string;
  ville: string;
  anniversaire: string | null;
  commentaire: string | null;
  adr_valid: boolean;
  actif: boolean;
  taille_haut: number | null;
  taille_bas: number | null;
  tour_poitrine: number | null;
  profondeur_bonnet: number | null;
  [key: string]: number | string | boolean | null;
};

export default Consumer;
