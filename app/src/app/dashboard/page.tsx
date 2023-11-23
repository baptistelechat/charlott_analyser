"use client";
import useAppSessionTokenStore from "@/lib/store/AppSessionToken.store";
import { redirect } from "next/navigation";

const page = () => {
  const appSessionToken = useAppSessionTokenStore((s) => s.appSessionToken);

  if (appSessionToken === "") {
    redirect("/");
  }

  return (
    <div>
      <p>{appSessionToken}</p>
    </div>
  );
};

export default page;
