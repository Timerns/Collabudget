"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SharedProps } from "./Input";
import BasicInput from "./BasicInput";
type NumberInputProps = SharedProps & {

}
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  return (
    <BasicInput {...props} ref={ref} type="number" />
  )
});
export default NumberInput