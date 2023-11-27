"use client";

import DataTableContainer from "@/components/dataTable/DataTableContainer";
import useAuthStore from "@/lib/store/auth.store";
import Consumer from "@/lib/types/Consumer";
import getAppSessionToken from "@/lib/utils/getAppSessionToken";
import getConsumers from "@/lib/utils/getConsumers";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);
  const pathname = usePathname();

  useEffect(() => {
    const data = getConsumers({
      sessionToken: auth.appSessionToken,
      vendorCode: auth.login,
    });

    if (data) {
      data.then((consumers) => {
        if (consumers === null) {
          // AppSessionToken is outdated
          getAppSessionToken({
            login: auth?.login as string,
            password: auth.login as string,
          }).then((newAuth) => {
            console.log("pass");
            if (newAuth) {
              localStorage.setItem(
                "APP_SESSION_TOKEN",
                newAuth.appSessionToken
              );

              setAuth({
                appSessionToken: newAuth.appSessionToken,
              });

              const data = getConsumers({
                sessionToken: newAuth.appSessionToken,
                vendorCode: auth.login,
              });

              data.then((consumers) => {
                if (consumers) {
                  setConsumers(consumers);
                }
              });
            }
          });
        } else {
          // AppSessionToken is not outdated
          setConsumers(consumers);
        }
      });
    }
  }, [auth]);

  return <DataTableContainer data={consumers} />;
};
export default page;
