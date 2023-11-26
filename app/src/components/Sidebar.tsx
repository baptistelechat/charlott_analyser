"use client";
import useAuthStore from "@/lib/store/auth.store";
import { HomeIcon, LogOutIcon, TagIcon, UsersIcon } from "lucide-react";
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
];

const Sidebar = () => {
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    const localStorageKeysToRemove = [
      "APP_SESSION_TOKEN",
      "AUTH_LOGIN",
      "AUTH_PASSWORD",
    ];
    localStorageKeysToRemove.forEach((key) => localStorage.removeItem(key));
    resetAuth();
    router.push("/");
  };

  return (
    <div className="w-2/12 h-full flex flex-col justify-between gap-2 bg-background shadow-lg dark:shadow-gray-900/50">
      <div>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-start gap-2 rounded-md p-4 hover:text-primary 
              ${
                pathname === link.href
                  ? "bg-purple-50 dark:bg-primary text-primary dark:text-purple-50"
                  : ""
              }`}
            >
              <LinkIcon className="w-6" />
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
      <div
        className="flex items-center justify-start gap-2 rounded-md p-4 cursor-pointer"
        onClick={() => logout()}
      >
        <LogOutIcon className="w-6" />
        <p>Se déconnecter</p>
      </div>
    </div>
  );
};

export default Sidebar;
