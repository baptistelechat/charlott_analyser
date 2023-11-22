"use client";
import { Input } from "@/components/ui/input";
import useAppSessionTokenStore from "@/lib/store/AppSessionToken.store";
import { useRouter } from "next/navigation";

const page = () => {
  // const router = useRouter();
  const {appSessionToken} = useAppSessionTokenStore();

  // if (appSessionToken === "") {
  //   router.replace("/");
  // }

  return (
    <div>
      <p className="text-primary">{appSessionToken}</p>
      <Input
        value={appSessionToken}
        onChange={(e) =>
          useAppSessionTokenStore
            .getState()
            .setAppSessionToken(e.target.value)
        }
      />
    </div>
  );
};

export default page;
