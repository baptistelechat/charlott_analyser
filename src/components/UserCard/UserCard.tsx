"use client";

import useAuthStore from "@/lib/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import UserCardItem from "./UserCardItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCard = () => {
  const auth = useAuthStore((s) => s.auth);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div>
            <UserCardItem value={`${auth.userData.nom_complet}`} />
            <UserCardItem value={auth.userData.adresse.denomination} />
            <UserCardItem value={`${auth.userData.adresse.cp_ville}`} />
          </div>
          {auth.userData.image ? (
            <Avatar>
              <AvatarImage src={auth.userData.image} />
              <AvatarFallback>{`${auth.userData.prenom[0]}${auth.userData.nom[0]}`}</AvatarFallback>
            </Avatar>
          ) : (
            <></>
          )}
        </div>

        <div>
          <UserCardItem
            title="Téléphone mobile"
            value={`${auth.userData.telephone_mobile}`}
          />
          <UserCardItem
            title="Téléphone fixe"
            value={`${auth.userData.telephone_fixe}`}
          />
          <UserCardItem title="Email" value={`${auth.userData.email}`} />
        </div>
        <div>
          <UserCardItem title="Titre" value={`${auth.userData.titre}`} />
          <UserCardItem title="Secteur" value={`${auth.userData.secteur}`} />
          <UserCardItem
            title="Date de démarrage"
            value={`${auth.userData.date_demarrage}`}
          />
          <UserCardItem
            title="Parrain actuel"
            value={`${auth.userData.parrain.nom_complet}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
