"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import Input, { SharedProps } from "./Input";

type BasicInputProps = SharedProps & {
  type: React.HTMLInputTypeAttribute
}
const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  return (
    <Input {...props}>
      <input ref={ref} onChange={props.onChange} onBlur={props.onBlur} name={props.name} type={props.type} className={(props.onlyComponent === true ? "h-full " : "border rounded ") + "appearance-none text-sm w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} id={props.name} placeholder={props.placeholder} />
    </Input>
  )
});
export default BasicInput