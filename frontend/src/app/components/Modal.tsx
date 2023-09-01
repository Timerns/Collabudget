"use client"
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import InputButton from './Inputs/InputButton';

type ModalProps = {
  title: string,
  text_bt: string,
  children: string | JSX.Element | JSX.Element[]
}

export type ModalHandle = {
  closeModal: () => void;
};


const Modal = forwardRef<ModalHandle, ModalProps>(({ title, text_bt, children }, ref) => {
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
        className="hover:text-primary text-left"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {text_bt}
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
                <div className="relative px-6 flex-auto overflow-y-auto">
                  {children}
                </div>
                {/*footer*/}

                <div className="flex flex-col items-center justify-end mx-5 mb-5 rounded-b">
                <div className='mt-5 hover:text-primary cursor-pointer' onClick={() => setShowModal(false)}>
                  Annuler
                </div>
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