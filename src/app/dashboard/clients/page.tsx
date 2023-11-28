"use client";

import DataTableContainer from "@/components/dataTable/DataTableContainer";
import useConsumersStore from "@/lib/store/consumers.store";
import {
  AtSignIcon,
  MailboxIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

const page = () => {
  const {consumers} = useConsumersStore();

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
    />
  );
};
export default page;
