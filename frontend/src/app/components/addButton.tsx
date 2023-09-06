"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import TransactionGroupeMondal from './Modals/TransactionGroupe';
import LabelGroupeModal from './Modals/LabelGroupe';
import LabelSoloModal from './Modals/LabelSolo';
import TransactionSoloModal from './Modals/TransactionSolo';



export default function AddButton(props: { groups: boolean }) {
  const [menu, setMenu] = useState(false);
  const pathname: string = usePathname()

  function show() {
    setMenu(!menu);
  }

  return (
    <div className="fixed bottom-5 right-5 flex flex-col">
      <div className={"bg-light-secondary p-2 sm:mx-5 flex flex-col" + (menu ? "" : " hidden")}>
        {
          props.groups &&
          <>
            <LabelGroupeModal title='Nouveau label' button='Nouveau label' show={show} groupId={Number(pathname.split("/").pop())} />
            <TransactionGroupeMondal title='Ajouter une transaction' button='Ajouter une transaction' show={show} groupId={Number(pathname.split("/").pop())} />
          </>
        }

        {
          !props.groups &&
          <>
            <LabelSoloModal title='Nouveau label' button='Nouveau label' show={show}/>
            <TransactionSoloModal title='Ajouter une transaction' button='Ajouter une transaction' show={show}/>
          </>

        }

      </div>
      <div className="flex bg-primary rounded-full p-2 sm:m-5 sm:ml-auto mt-5 ml-auto h-30 w-30" onClick={() => setMenu(!menu)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
          <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
        </svg>
      </div>
    </div>

  )
}