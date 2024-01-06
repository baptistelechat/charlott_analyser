"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


const page = () => {
  const router = useRouter();
  
  return (
    <Button variant="outline" onClick={()=> router.push("/dashboard/bon-de-commande/nouveau")}>
      <Plus className="mr-2 h-4 w-4" /> Ajouter
    </Button>
  );
};
export default page;
