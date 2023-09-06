import LabelType from "@/app/types/labelType";
import TransactionCategorieType from "@/app/types/transactionCategorieType";
import TransactionType from "@/app/types/transactionType";
import { formatCurrency } from "@/app/utils/numberFormatter";
import LabelGroupeModal from "../Modals/LabelGroupe";
import { useState } from "react";
import LabelSoloModal from "../Modals/LabelSolo";

export default function TransactionCategorie({ transactionCategorie, ...props }: { transactionCategorie: TransactionCategorieType, props?: any }) {
  const [menu, setMenu] = useState(false);

  function show() {
    setMenu(!menu);
  }
  return (
    <div className={"grid grid-cols-2 bg-secondary p-3"}>
      <div className={"col-span-1 font-semibold flex items-center"}>
        <div className="mr-2">
          {
            transactionCategorie.isGroup ?
            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
            </svg> :
            <div className="w-5 h-5 rounded-full" style={{background: transactionCategorie.labelColor}}></div>
          }
        </div>
        <span>
          {
            transactionCategorie.isGroup || transactionCategorie.name === undefined ?
              transactionCategorie.name || "Aucun label"
            :
              transactionCategorie.groupeId ?
                <LabelGroupeModal show={show} title="Modifer label" button={transactionCategorie.name} groupId={transactionCategorie.groupeId!} label={{id: transactionCategorie.labelId!, color: transactionCategorie.labelColor!, name: transactionCategorie.name!}}/>
                :
                <LabelSoloModal show={show} title="Modifer label" button={transactionCategorie.name} label={{id: transactionCategorie.labelId!, color: transactionCategorie.labelColor!, name: transactionCategorie.name!}}/>
          }
          
        </span>
      </div>
      {
        !transactionCategorie.groupeId ?
        <div className={`col-span-1 text-right`}>
          {formatCurrency(-transactionCategorie.value, undefined, false)}
        </div> :
        <div></div>
      }
    </div>
  )
}