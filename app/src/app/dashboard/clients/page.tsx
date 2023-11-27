"use client";

import DataTableContainer from "@/components/dataTable/DataTableContainer";
import useAuthStore from "@/lib/store/auth.store";
import Consumer from "@/lib/types/Consumer";
import getConsumers from "@/lib/utils/getConsumers";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const auth = useAuthStore((s) => s.auth);
  const pathname = usePathname();

  useEffect(() => {
    const data = getConsumers({
      sessionToken: auth.appSessionToken,
      vendorCode: auth.login,
    });
    if (data) {
      data.then((consumers) => {
        consumers ? setConsumers(consumers) : setConsumers([]);
      });
    }
  }, [auth]);

  return (
    <>
      <p>{pathname}</p>
      <DataTableContainer data={consumers} />
    </>
  );
};
export default page;
