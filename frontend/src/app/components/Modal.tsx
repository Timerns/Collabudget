"use client"
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import InputButton from './Inputs/InputButton';

type ModalProps = {
  title: string,
  children: string | JSX.Element | JSX.Element[]
}

export type ModalHandle = {
  closeModal: () => void;
};


const Modal = forwardRef<ModalHandle, ModalProps>(({ title, children }, ref) => {
  console.log(children)
  const [showModal, setShowModal] = useState(false);


  useImperativeHandle(ref, () => ({
    closeModal() {
      setShowModal(false);
    }
  }));
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => setShowModal(false)}></div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-max w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light-secondary text-white ">
                {/*header*/}
                <div className="flex items-start justify-between m-5 rounded-t">
                  <h3 className="text-3xl font-semibold text-center w-full border-b border-solid border-primary text-primary">
                    {title}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto">
                  {children}
                </div>
                {/*footer*/}


                <div className='mt-5 hover:text-primary cursor-pointer' onClick={() => setShowModal(false)}>
                  Annuler
                </div>
              </div>
            </div>
          </div>

        </>
      ) : null}
    </>
  )
})

export default Modal