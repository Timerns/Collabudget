"use client"
import InputButton from "@/app/components/Inputs/InputButton";
import TextInput from "@/app/components/Inputs/TextInput";
import { getStatus } from "@/app/utils/account";
import { request } from "@/app/utils/database";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type LoginForm = {
  username: string,
  password: string
};

export default function Page() {
  const { register, handleSubmit } = useForm<LoginForm>();
  
  useEffect(() => {
    getStatus()
      .then(username => {
        if (username !== null) {
          window.location.href = "/app";
        }
      })
      .catch(e => toast.error(e));
  }, [])

  const onSubmit = async (data: LoginForm) => {
    console.log(data);

    request<string>("/api/login", "POST", { username: data.username, password: data.password })
      .then(val => {
        window.location.href = "/app";
      })
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
              <a className="text-primary hover:text-dark-primary underline" href="/register">
                S'enregistrer ici
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}