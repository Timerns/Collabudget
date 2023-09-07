"use client" 
import React, { createRef, useState } from 'react';
import { Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Input, { SharedProps } from "./Input";


type DropdownInputProps = SharedProps & {
  choices: any[],
  show: (elem: any) => any
  setValueForm: UseFormSetValue<any>
}
const DropdownInput = React.forwardRef<HTMLInputElement, DropdownInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  if (props.choices.length === 0) {
    throw Error("There must be at least on choice to choose from !");
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(props.choices[0]);

  const refDropdown = createRef<HTMLDivElement>();
  const refSelector = createRef<HTMLButtonElement>();

  if (typeof window !== "undefined") {
    window.onclick = (e) => {
      var target = ((e.target ?? undefined) as HTMLElement);
      if (refSelector.current?.contains(target) === false && refDropdown.current?.contains(target) === false) {
        setOpen(false);
      }
    }
  }
  
  return (
    <Input {...props}>
      <div>
        <button ref={refSelector} onClick={() => setOpen(!open)} className={(props.onlyComponent ? "" : "border rounded ") + "flex p-3 bg-white appearance-none text-sm w-full items-center justify-center"} type="button">
          <span className="flex grow">
            {value !== undefined && props.show(value)}
          </span> 
          <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div ref={refDropdown} id="dropdown" className={(open ? "" : "hidden ") + "mt-1 absolute z-10 divide-y divide-gray-100 rounded-lg shadow bg-white dark:bg-white"}>
          <ul className="py-2 text-sm text-gray-700 text-black dark:text-black">
            {
              props.choices.map(c => (
                <li key={JSON.stringify(c)}>
                  <button onClick={() => {setValue(c); props.setValueForm(props.name, c); setOpen(false);}} type="button" className="block w-full px-4 py-2 dark:hover:bg-gray-400 dark:hover:text-white">
                    {props.show(c)}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Input>
  )
});
export default DropdownInput