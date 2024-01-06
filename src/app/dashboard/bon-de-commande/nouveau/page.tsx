"use client";

import SellerCard from "@/components/Order/SellerCard";
import useAuthStore from "@/lib/store/auth.store";

const page = () => {
  const auth = useAuthStore(s=>s.auth)

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="w-1/2">
          <SellerCard auth={auth}/>
        </div>
        <div className="w-1/2">
          <SellerCard auth={auth}/>
        </div>
      </div>
    </div>
  );
};
export default page;
