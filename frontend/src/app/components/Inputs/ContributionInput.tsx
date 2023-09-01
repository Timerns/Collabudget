"use client" 
import React, { FC, createRef, useState, useEffect } from 'react';
import { ChangeHandler, Control, Controller, FieldArrayWithId, UseFormRegister, UseFormSetValue, useFieldArray } from 'react-hook-form';
import Input, { SharedProps } from "./Input";
import NumberInput from "./NumberInput";
import DropdownInput from "./DropdownInput";
import { LoginForm } from "@/app/(auth)/login/page";

type ContributionInputProps = SharedProps & {
  register: UseFormRegister<any>,
  control: Control<any, any>,
  currency: string,
  users: string[],
  totalValue: number,
  transactionName: string,
  isContributingName: string,
  usernameName: string,
  valueName: string
}
const ContributionInput: FC<ContributionInputProps> = ((props) => {
  const onChange: ChangeHandler & React.ChangeEventHandler<HTMLInputElement> = (e) => {
    return new Promise<boolean>((acc, rej) => {
      acc(true);
    });
  }

  const { fields, append, remove, update } = useFieldArray({ control: props.control, name: "transaction" });

  useEffect(() => {
    remove();
    append(props.users.map((user) => {
      var obj: any = {};
      obj[props.usernameName] = user;
      obj[props.isContributingName] = true;
      obj[props.valueName] = props.totalValue / props.users.length;
      return obj;
    }));
  }, []);

  return (
    <Input {...props} onChange={onChange} onBlur={onChange} name={props.transactionName}>
      <div className="grid grid-cols-1 bg-white appearance-none text-sm border rounded w-full justify-between overflow-hidden px-1 pt-1">
        {
          fields.map((field: any, index) => (
            <div key={field.id} className="w-full flex mb-1">
              <input className="w-5 h-5 mr-1 focus:outline-none" type="checkbox" {...props.register(`${props.transactionName}.${index}.${props.isContributingName}`)} onChange={(e) => { 
                var contributing = e.target.checked;
                var currentlyChecked = fields.map<number>((f: any) => f[props.isContributingName] === true ? 1 : 0).reduce((prev, curr) => prev + curr) + (contributing ? 1 : -1);
                
                if (currentlyChecked === 0) {
                  contributing = true;
                  currentlyChecked = 1;
                }

                var val: any = field;
                delete val.id;
                val[props.isContributingName] = contributing;
                update(index, val);

                fields.forEach((f, i) => {
                  var v: any = f;
                  delete v.id;
                  v[props.valueName] = v[props.isContributingName] ? props.totalValue / currentlyChecked : 0;
                  update(i, v);
                });
              }} />
              <span className="grow">{field[props.usernameName]}</span>
              <span className="grow text-right">{Math.round(field[props.valueName] * 100) / 100} {props.currency}</span>
            </div>
          ))
        }
      </div>
    </Input>
  )
});
export default ContributionInput