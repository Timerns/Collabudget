"use client"
import Footer from "@/app/components/footer";
import InputButton from "@/app/components/Inputs/InputButton";
import Modal, { ModalHandle } from "@/app/components/Modal";
import { FormEventHandler, useRef } from "react";

export default function Page() {
  const modalRef = useRef<ModalHandle>(null);
  const handelSumbit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    modalRef.current?.closeModal();
  }

  return (
    <div>
      WIP
      <Modal title="Super form" ref={modalRef}>
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
      <Footer />
    </div>
  )
}