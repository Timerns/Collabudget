"use client"
import InputButton from "@/app/components/Inputs/InputButton";
import TextInput from "@/app/components/Inputs/TextInput";
import { request } from "@/app/utils/database";
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type LoginForm = {
  username: string,
  password: string,
  passwordConfirm: string,
};

export default function Page() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    if (data.password !== data.passwordConfirm) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    await request<string>("/api/register", "POST", { username: data.username, password: data.password })
      .then(val => toast.success(val))
      .catch(e => toast.error(e));
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
              <h1 className="text-primary text-2xl">S'enregistrer</h1>
            </div>
            <TextInput title="Nom d'utilisateur" placeholder="Nom d'utilisateur" {...register("username")} />
            <TextInput title="Mot de passe" type="password" placeholder="Mot de passe" {...register("password")} />
            <div className="mb-4">
              <TextInput title="Confirmation du mot de passe" type="password" placeholder="Confirmation du mot de passe" {...register("passwordConfirm")} />
            </div>
            <div className="mb-3">
              <InputButton text="S'enregistrer" />
            </div>
            <div className="text-sm text-white text-center w-full">
              Déjà un compte ?&nbsp;
              <a className="text-primary hover:text-dark-primary underline" href="/login">
                Se connecter ici
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}