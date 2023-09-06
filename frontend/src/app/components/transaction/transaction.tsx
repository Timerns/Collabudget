import GroupeType from "@/app/types/groupeType";
import LabelType from "@/app/types/labelType";
import TransactionType from "@/app/types/transactionType";
import { formatCurrency } from "@/app/utils/numberFormatter";
import { useEffect, useState, useRef } from "react";
import UpdateTransactionGroupeModal from "../Modals/UpdateTransactionGroupe";
import UpdateTransactionSoloModal from "../Modals/UpdateTransactionSolo";

export default function Transaction({ transaction, label, info, group, ...props }: {
  transaction: TransactionType,
  label: LabelType | undefined,
  props?: any,
  info: string
  group?: GroupeType
}) {
  const [menu, setMenu] = useState(false);
  function show() {
    setMenu(!menu);
  }

  function triggerClickEvent(transactionId: string) {
    return () => {
      const elem = document.getElementById(transactionId)?.parentElement;
      const button = elem?.getElementsByTagName("button")[0]
      button?.click()
    }
  }

  return (
    <div>
      { 
        group === undefined ?
          transaction.GroupId === null ?
          <div className="w-0 h-0"><UpdateTransactionSoloModal show={show} transaction={transaction} /></div> :
          <div></div> :
        <div className="w-0 h-0"><UpdateTransactionGroupeModal show={show} group={group} transaction={transaction} /></div>
      }
      <div className={"grid grid-cols-4 bg-secondary p-3"} onClick={triggerClickEvent("transaction " + transaction.id.toString())} id={"transaction " + transaction.id.toString()} >
        <div className={"col-span-3 font-semibold"}>
          {transaction.title}
        </div>
        <div className={`col-span-1 text-right ${transaction.value < 0 ? "text-red" : "text-green"}`}>
          {formatCurrency(transaction.value)}
        </div>
        <div className={"col-span-3 text-sm flex"}>
          <span>
            {info}
          </span>
          {
            label && 
            <div className={info ? "ml-1" : ""}>
              <div className={"rounded px-2 inline-block"} style={{ background: label.color }}>{label.name}</div>
            </div>
          }
        </div>
        <div className={"col-span-1 text-right"}>
          {new Date(transaction.date).toLocaleDateString()}
        </div>
      </div>
    </div>
    
  )
}