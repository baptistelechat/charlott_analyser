"use client";

import DataTableContainer from "@/components/dataTable/DataTableContainer";
import useAuthStore from "@/lib/store/auth.store";
import useConsumersStore from "@/lib/store/consumers.store";
import getConsumers from "@/lib/utils/getConsumers";
import logout from "@/lib/utils/logout";
import {
  AtSignIcon,
  MailboxIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const consumers = useConsumersStore((s) => s.consumers);
  const setConsumers = useConsumersStore((s) => s.setConsumers);
  const auth = useAuthStore((s) => s.auth);
  const router = useRouter();

  const refreshConsumers = () => {
    setConsumers([]);
    const data = getConsumers({
      sessionToken: auth.appSessionToken,
      vendorCode: auth.login,
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
  };

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

  return (
    <DataTableContainer
      data={consumers}
      tableHead={tableHead}
      tableCell={tableCell}
      dataType="clients"
      refreshData={refreshConsumers}
    />
  );
};
export default page;
