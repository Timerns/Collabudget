"use client" 
import React, { FC } from "react";
type InputButtonProps = {
  text: string
}
const InputButton: FC<InputButtonProps> = (props) => { 
  return (
    <button className="bg-primary w-full hover:bg-dark-primary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      {props.text}
    </button>
  )
}
export default InputButton