"use client" 
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import Input, { SharedProps } from "./Input";
import { readFirstFile } from "@/app/utils/fileReader";
type ImageInputProps = SharedProps & {
  
}
const ImageInput = React.forwardRef<HTMLInputElement, ImageInputProps & ReturnType<UseFormRegister<any>>>((props, ref) => {
  const defaultImage = "/no-image.svg";
  const [image, setImage] = useState(defaultImage);
  
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange(e);

    readFirstFile(e.target.files ?? undefined)
      .then((value) => setImage(value))
      .catch(() => setImage(defaultImage));
  };
  
  return (
    <Input {...props}>
      <label className="block cursor-pointer bg-white appearance-none border rounded w-full" htmlFor={props.name}>
        <div className="w-full items-center justify-center flex">
          <svg className="absolute w-10 h-10 text-dark dark:text-dark stroke-light-secondary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
          </svg>
          <img className="object-contain p-3 max-w-xxs" src={image} />
        </div>
      </label>
      <input ref={ref} onChange={onChange} onBlur={props.onBlur} name={props.name} type="file" accept="image/*" className="hidden" id={props.name} placeholder={props.placeholder} />
    </Input>
  )
});
export default ImageInput