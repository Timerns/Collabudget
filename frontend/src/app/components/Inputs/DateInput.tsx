"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SharedProps } from "./Input";
import BasicInput from "./BasicInput";
type DateInputProps = SharedProps & {
  
}
const DateInput = React.forwardRef<HTMLInputElement, DateInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  return (
    <BasicInput {...props} ref={ref} type="datetime-local" />
  )
});
export default DateInput