"use client";
import GradientHeading from "@/components/GradientHeading";
import useAuthStore from "@/lib/store/auth.store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);

  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <GradientHeading title="Dashboard" />
    </div>
  );
};

export default page;
