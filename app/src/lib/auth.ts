"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import useAppSessionTokenStore from "./store/AppSessionToken.store";
import getAppSessionToken from "./utils/getAppSessionToken";

const auth = async (data: { login: string; password: string }) => {
  const token = await getAppSessionToken(data);
  console.log(token.appSessionToken !== "");
  if (token.appSessionToken !== "") {
    useAppSessionTokenStore
      .getState()
      .setAppSessionToken(token.appSessionToken);
      
    revalidatePath("/dashboard");
    redirect("/dashboard");
  } else {
    redirect("/");
  }
};

export default auth;
