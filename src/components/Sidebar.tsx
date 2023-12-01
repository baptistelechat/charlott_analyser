"use client";
import logout from "@/lib/utils/logout";
import {
  HomeIcon,
  LogOutIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Accueil", href: "/dashboard", icon: HomeIcon },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: UsersIcon,
  },
  {
    name: "Articles",
    href: "/dashboard/articles",
    icon: TagIcon,
  },
  {
    name: "Bon de commande",
    href: "/dashboard/bon-de-commande",
    icon: ShoppingCartIcon,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-2/12 h-full flex flex-col justify-between gap-2 bg-background shadow-2xl dark:shadow-gray-700/50">
      <div>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-start gap-2 rounded-md p-4
              ${
                pathname === link.href
                  ? "bg-primary text-purple-50 cursor-default"
                  : // ? "bg-purple-50 dark:bg-primary text-primary dark:text-purple-50"
                    "hover:bg-purple-50 dark:hover:bg-gray-900 hover:text-pink-500 transition-all duration-300 ease-in-out"
              }
                
              `}
            >
              <LinkIcon className="w-6" />
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
      <div
        className="flex items-center justify-start gap-2 rounded-md p-4 cursor-pointer"
        onClick={() => logout(router)}
      >
        <LogOutIcon className="w-6" />
        <p>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Sidebar;
