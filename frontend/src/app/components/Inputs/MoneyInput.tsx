"use client" 
import React, { FC, createRef, useState } from 'react';
import { ChangeHandler, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Input, { SharedProps } from "./Input";
import NumberInput from "./NumberInput";
import DropdownInput from "./DropdownInput";


type MoneyInputProps = SharedProps & {
  register: UseFormRegister<any>,
  setValueForm: UseFormSetValue<any>
  currencies: string[],
  baseFormName: string,
  valueName: string,
  currencyName: string
}
const MoneyInput: FC<MoneyInputProps> = ((props) => {
  const onChange: ChangeHandler & React.ChangeEventHandler<HTMLInputElement> = (e) => {
    return new Promise<boolean>((acc, rej) => {
      acc(true);
    });
  }

  return (
    <Input {...props} onChange={onChange} onBlur={onChange} name="">
      <div className="flex bg-white appearance-none text-sm border rounded w-full justify-between overflow-hidden">
        <NumberInput {...props} {...props.register(`${props.baseFormName}.${props.valueName}`, { valueAsNumber: true, value: 0 })} onlyComponent={true} />
        <DropdownInput {...props} {...props.register(`${props.baseFormName}.${props.currencyName}`, { value: props.currencies[0] })} setValueForm={props.setValueForm} choices={props.currencies} show={(c) => (<span>{c}</span>)} onlyComponent={true} />
      </div>
    </Input>
  )
});
export default MoneyInput