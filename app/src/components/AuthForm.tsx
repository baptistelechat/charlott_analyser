"use client";
import auth from "@/lib/auth";
import AutoForm, { AutoFormSubmit } from "@ui/auto-form";
import { useState } from "react";
import * as z from "zod";
import AuthFormSkeleton from "./AuthFormSkeleton";
import useAppSessionTokenStore from "@/lib/store/AppSessionToken.store";

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
  const { appSessionToken } = useAppSessionTokenStore();


  const handleSubmit = async (data: { login: string; password: string }) => {
    setWaitSessionToken(true);
    auth(data)
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
      <p>{appSessionToken}</p>
    </AutoForm>
  );
};

export default AuthForm;
