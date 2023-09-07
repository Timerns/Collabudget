"use client"
import ListContainer from "@/app/components/listContainer";
import RefoundType from "@/app/types/refoundType";
import Refound from "@/app/components/refound/refound";
import SoldeType from "@/app/types/soldeType";
import { useEffect, useState } from "react";
import { getRefundList } from "@/app/utils/refund";

export default function RefoundList({refounds, groupId, username}: { refounds: SoldeType[], groupId: number, username: string}) {
  const [transaction, setTransaction] = useState<{s: string, d: string, m: number}[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTransaction(getRefundList(refounds))
    setIsLoaded(true)
  }, [refounds])
  
  return (
      <ListContainer>
        {isLoaded && 
        transaction.length === 0 ? <p>Aucun remboursement</p> :
        transaction.map((r, i) => {
          return (
              <div key={i} className={`${i < transaction.length - 1 ? "mb-3" : ""}`}>
                <Refound username={username} refound={r} groupId={groupId}/>
              </div>
          )
        })}
      </ListContainer>
  )
}