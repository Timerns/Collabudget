"use client" 
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
type StringInputProps = {
  title: string,
  placeholder?: string
}
const StringInput = React.forwardRef<HTMLInputElement, StringInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  return (
    <div className="mb-2">
      <label className="block text-white text-sm mb-1" htmlFor={props.name}>
        {props.title}
      </label>
      <input ref={ref} onChange={props.onChange} onBlur={props.onBlur} name={props.name} className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={props.name} type="text" placeholder={props.placeholder} />
    </div>
  )
});
export default StringInput