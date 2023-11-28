"use client";

import DataTableContainer from "@/components/dataTable/DataTableContainer";
import useAuthStore from "@/lib/store/auth.store";
import Consumer from "@/lib/types/Consumer";
import getAppSessionToken from "@/lib/utils/getAppSessionToken";
import getConsumers from "@/lib/utils/getConsumers";
import {
  AtSignIcon,
  MailboxIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);

  const tableHead: {
    title: string;
    icon: JSX.Element;
  }[] = [
    {
      title: "Client",
      icon: <UserIcon />,
    },
    {
      title: "Email",
      icon: <AtSignIcon />,
    },
    {
      title: "Téléphone",
      icon: <PhoneIcon />,
    },
    {
      title: "Adresse postale",
      icon: <MailboxIcon />,
    },
    {
      title: "Ville",
      icon: <MapPinIcon />,
    },
  ];

  const tableCell: {
    parameter: string | string[];
    action?: string;
  }[] = [
    {
      parameter: ["nom", "prenom"],
    },
    { parameter: "email", action: "mail" },
    { parameter: "telephone" },
    { parameter: ["lig1", "lig2", "lig3", "lig4"], action: "address" },
    { parameter: ["code_postal", "ville"], action: "address" },
  ];

  useEffect(() => {
    const data = getConsumers({
      sessionToken: auth.appSessionToken,
      vendorCode: auth.login,
    });

    if (data) {
      data.then((consumers) => {
        if (consumers === null) {
          // AppSessionToken is outdated
          getAppSessionToken({
            login: auth?.login as string,
            password: auth.login as string,
          }).then((newAuth) => {
            console.log("pass");
            if (newAuth) {
              localStorage.setItem(
                "APP_SESSION_TOKEN",
                newAuth.appSessionToken
              );

              setAuth({
                appSessionToken: newAuth.appSessionToken,
              });

              const data = getConsumers({
                sessionToken: newAuth.appSessionToken,
                vendorCode: auth.login,
              });

              data.then((consumers) => {
                if (consumers) {
                  setConsumers(consumers);
                }
              });
            }
          });
        } else {
          // AppSessionToken is not outdated
          setConsumers(consumers);
        }
      });
    }
  }, [auth]);

  return (
    <DataTableContainer
      data={consumers}
      tableHead={tableHead}
      tableCell={tableCell}
      dataType="clients"
    />
  );
};
export default page;
