"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SharedProps } from "./Input";
import BasicInput from "./BasicInput";
type NumberInputProps = SharedProps & {
  step: string
}
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  return (
    <BasicInput {...props} step= {props.step} ref={ref} type="number" />
  )
});
export default NumberInput