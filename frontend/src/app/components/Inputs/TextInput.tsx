"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SharedProps } from "./Input";
import BasicInput from "./BasicInput";
type TextInputProps = SharedProps & {
  type?: "password" | "email" | "tel" | "text"
}
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  return (
    <BasicInput {...props} ref={ref} type={props.type ?? "text"} />
  )
});
export default TextInput