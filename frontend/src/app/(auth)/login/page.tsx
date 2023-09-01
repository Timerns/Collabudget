"use client"
import InputButton from "@/app/components/Inputs/InputButton";
import TextInput from "@/app/components/Inputs/TextInput";
import React from 'react';
import { useForm } from "react-hook-form";

export type LoginForm = {
  username: string,
  password: string
};

export default function Page() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-3 mt-5">
          <img className="max-w-xs" src="/collabudget-light.png" />
        </div>
        <div className="bg-light-secondary mb-5">
          <form className="rounded px-16 py-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 w-full text-center">
              <h1 className="text-primary text-2xl">Connexion</h1>
            </div>
            <TextInput title="Nom d'utilisateur" placeholder="Nom d'utilisateur" {...register("username")} />
            <div className="mb-4">
              <TextInput title="Mot de passe" type="password" placeholder="Mot de passe" {...register("password")} />
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