"use client";

import { usePathname } from "next/navigation";
const page = () => {
  const pathname = usePathname();

  return <p>{pathname}</p>;
};
export default page;
