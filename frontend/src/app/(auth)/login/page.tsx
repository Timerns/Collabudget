"use client"
import InputButton from "@/app/components/Inputs/InputButton";
import StringInput from "@/app/components/Inputs/StringInput";
import React from 'react';
import { useForm } from "react-hook-form";

export type LoginForm = {
  username: string,
  password: string
};

export default function Page() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div className="bg-secondary w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-3">
          <img className="max-w-xs" src="/collabudget-light.png" />
        </div>
        <div className="bg-light-secondary">
          <form className="rounded px-16 py-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 w-full text-center">
              <h1 className="text-primary text-2xl">Connexion</h1>
            </div>
            <StringInput title="Nom d'utilisateur" placeholder="Nom d'utilisateur" {...register("username")} />
            <div className="mb-4">
              <StringInput title="Mot de passe" placeholder="Mot de passe" {...register("password")} />
            </div>
            <div className="mb-3">
              <InputButton text="Se connecter" />
            </div>
            <div className="text-sm text-white text-center w-full">
              Pas encore de compte ?&nbsp;
              <a className="text-primary hover:text-dark-primary underline" href="#">
                S'enregistrer ici
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}