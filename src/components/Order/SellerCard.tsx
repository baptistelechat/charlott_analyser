"use client";

import AuthCredentials from "@/lib/types/AuthCredentials";
import { Facebook, Instagram, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface ISellerCardProps {
  auth: AuthCredentials;
}

const SellerCard = (props: ISellerCardProps) => {
  const [siret, setSiret] = useState("");

  const handleSiretChange = (newSiret: string) => {
    localStorage.setItem(`SIRET_${props.auth.login}`, newSiret);
    setSiret(newSiret);
  };

  useEffect(() => {
    const isWindowDefined = typeof window !== "undefined";

    if (isWindowDefined) {
      const siret = localStorage.getItem(`SIRET_${props.auth.login}`) as string;
      setSiret(siret);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Votre Conseillère de Style Charlott’ vendeuse à domicile indépendant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>{`${props.auth.userData.nom_complet} (${props.auth.login})`}</p>
        <Input
          className="w-1/2"
          type="text"
          placeholder="SIRET"
          value={siret}
          onChange={(e) => handleSiretChange(e.target.value)}
        />
        <div>
          <p>{props.auth.userData.adresse.denomination}</p>
          <p>{props.auth.userData.adresse.cp_ville}</p>
          <p>
            {`${props.auth.userData.telephone_mobile.replaceAll("+33", "0")}${
              props.auth.userData.telephone_fixe
                ? " / " +
                  props.auth.userData.telephone_fixe.replaceAll("+33", "0")
                : ""
            }`}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <p>{props.auth.userData.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            <p>{props.auth.userData.social.facebook}</p>
          </div>
          {props.auth.userData.social.instagram && (
            <div>
              <Instagram className="h-4 w-4" />
              <p>{props.auth.userData.social.instagram}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerCard;
