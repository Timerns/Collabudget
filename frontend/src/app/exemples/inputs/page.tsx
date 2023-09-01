"use client"
import InputButton from "@/app/components/Inputs/InputButton";
import React from 'react';
import { useForm } from "react-hook-form";
import TextInput from "@/app/components/Inputs/TextInput";
import NumberInput from "@/app/components/Inputs/NumberInput";
import ColorInput from "@/app/components/Inputs/ColorInput";
import ImageInput from "@/app/components/Inputs/ImageInput";
import { readFirstFile } from "@/app/utils/fileReader";
import DropdownInput from "@/app/components/Inputs/DropdownInput";
import DateInput from "@/app/components/Inputs/DateInput";
import MoneyInput from "@/app/components/Inputs/MoneyInput";
import ContributionInput from "@/app/components/Inputs/ContributionInput";

type Label = {
  name: string, 
  color: string
}

type Money = {
  currency: string,
  value: number
}

type Transaction = {
  isContributing: boolean,
  username: string,
  value: number,
  currency: string
}

export type LoginForm = {
  username: string,
  password: string,
  num: number,
  color: string,
  image: FileList,
  choice: Label,
  date: Date,
  money: Money,
  transaction: Transaction[]
};

export default function Page() {
  const { control, register, handleSubmit, setValue } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);

    readFirstFile(data.image)
      .then((value) => {
        console.log(value);
      })
      .catch(() => {});
  };

  const show = (elem: Label) => (
    <div className="px-2 py-1" style={{
      backgroundColor: elem.color,
      borderRadius: "25px"
    }}>
      {elem.name}
    </div>
  )

  const choices = [
    {name: "Vacances", color: "#FF4545"}, 
    {name: "Vacancy", color: "#004545"},
    {name: "Vacances", color: "#FF0000"}
  ]

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
            <NumberInput title="Number" placeholder="Chiffre" {...register("num", { valueAsNumber: true })} />
            <ColorInput title="Color" {...register("color")} />
            <ImageInput title="Image" {...register("image")} />
            <DropdownInput title="Choice" setValueForm={setValue} show={show} choices={choices} {...register("choice", { value: choices[0] })} />
            <DateInput title="Date" {...register("date", { valueAsDate: true })} />
            <MoneyInput title="Date" placeholder="date" baseFormName="money" valueName="value" currencyName="currency" setValueForm={setValue} register={register} currencies={["CHF", "EUR", "USD"]} />
            <ContributionInput title="Participants" register={register} control={control} transactionName="transaction" usernameName="username" valueName="value"  isContributingName="isContributing" currency="CHF" totalValue={50} users={["Green", "Red", "Blue", "Sus"]} />
            <div className="mb-4">
              <TextInput type="password" title="Mot de passe" placeholder="Mot de passe" {...register("password")} />
            </div>
            <div className="mb-3">
              <InputButton text="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}