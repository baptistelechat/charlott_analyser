"use client";
import useAuthStore from "@/lib/store/auth.store";
import getAppSessionToken from "@/lib/utils/getAppSessionToken";
import AutoForm, { AutoFormSubmit } from "@ui/auto-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";
import AuthFormSkeleton from "./AuthFormSkeleton";

// Define your form schema using zod
const formSchema = z.object({
  login: z
    .string({
      required_error: "Identifiant est requis.",
    })
    .describe("Identifiant")
    .max(8, {
      message: "Identifiant a un maximum de 8 caractères.",
    }),
  password: z
    .string({
      required_error: "Mot de passe est requis.",
    })
    .describe("Mot de passe"),
});

const AuthForm = () => {
  const [waitSessionToken, setWaitSessionToken] = useState(false);
  const router = useRouter();
  const auth = useAuthStore((s) => s.auth);
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const isAuthEmpty = auth.appSessionToken === "" || auth.login === "";

    const isWindowDefined = typeof window !== "undefined";

    if (isAuthEmpty && isWindowDefined) {
      const appSessionToken = localStorage.getItem(
        "APP_SESSION_TOKEN"
      ) as string;
      const login = localStorage.getItem("AUTH_LOGIN") as string;
      if (appSessionToken && login) {
        setAuth({
          appSessionToken,
          login,
        });
        router.push("/dashboard");
      }
    }
  }, []);

  const handleSubmit = async (data: { login: string; password: string }) => {
    setWaitSessionToken(true);
    const appSessionToken = await getAppSessionToken(data);
    if (auth) {
      localStorage.setItem("APP_SESSION_TOKEN", appSessionToken.token);
      localStorage.setItem("AUTH_LOGIN", data.login);
      setAuth(auth);
      router.push("/dashboard");
    }
  };

  if (waitSessionToken) {
    return <AuthFormSkeleton />;
  }

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        password: {
          // Use "inputProps" to pass props to the input component
          // You can use any props that the component accepts
          inputProps: {
            type: "password",
            placeholder: "••••••••",
          },
        },
      }}
      onSubmit={(data) => {
        handleSubmit(data);
      }}
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
      <AutoFormSubmit>Se connecter</AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
    </AutoForm>
  );
};

export default AuthForm;
