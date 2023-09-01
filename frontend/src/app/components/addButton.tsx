"use client"
import React, { useState } from 'react'
import Modal, { ModalHandle } from "@/app/components/Modal";
import { FormEventHandler, useRef } from "react";
import InputButton from '@/app/components/Inputs/InputButton';

export default function AddButton() {
  const [menu, setMenu] = useState(false);

  const modalRef = useRef<ModalHandle>(null);
  const handelSumbit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    modalRef.current?.closeModal();
  }

  return (
    <div className="fixed bottom-5 right-5 flex flex-col">
      <div className={"bg-light-secondary p-2 sm:mx-5 flex flex-col" + (menu? "": " hidden")}>
        <Modal title='Nouveau label' text_bt='Nouveau label' >
        <form onSubmit={handelSumbit}>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <InputButton text='Sauvegarder'></InputButton>
        </form>
        </Modal>

        <Modal title='Ajouter une transaction' text_bt='Ajouter une transaction'>
        <form onSubmit={handelSumbit}>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm mb-1">
              Titre
            </label>
            <input className="shadow appearance-none text-sm py-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titre" />
          </div>
          <InputButton text='Sauvegarder' ></InputButton>
        </form>
        </Modal>
      </div>
      <div className="flex bg-primary rounded-full p-2 sm:m-5 sm:ml-auto mt-5 ml-auto h-30 w-30" onClick={() => setMenu(!menu)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
          <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
        </svg>
      </div>
    </div>

  )
}