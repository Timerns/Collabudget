"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export type SharedProps = {
  title: string,
  placeholder?: string,
  onlyComponent?: boolean
}

type InputProps = SharedProps & {
  
}
const Input = React.forwardRef<HTMLInputElement, InputProps & ReturnType<UseFormRegister<any>> & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>((props, ref) => {
  return props.onlyComponent === true ? (
    <span ref={ref} className="flex-auto">
      {props.children}
    </span>
  ) : (
    <div ref={ref} className="mb-2">
      <label className="block text-white text-sm mb-1">
        {props.title}
      </label>
      {props.children}
    </div>
  )
});
export default Input