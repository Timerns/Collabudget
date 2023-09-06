"use client"
import ListContainer from "@/app/components/listContainer";
import RefoundType from "@/app/types/refoundType";
import Refound from "@/app/components/refound/refound";
import SoldeType from "@/app/types/soldeType";
import { useEffect, useState } from "react";

export default function RefoundList({refounds, groupId}: { refounds: SoldeType[], groupId: number}) {
  
  const [transaction, setTransaction] = useState<{s: string, d: string, m: number}[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    var plus:  SoldeType[] = JSON.parse(JSON.stringify(refounds.filter((x) => Number(x.solde) > 0 ).sort((x, y) => Number(y.solde) - Number(x.solde))));
    var moins: SoldeType[] = JSON.parse(JSON.stringify(refounds.filter((x) => Number(x.solde) < 0 ).sort((x, y) => Number(y.solde) - Number(x.solde))));

    let transa = []
    while (moins.length !== 0) {
      if(Number(plus[plus.length - 1].solde) - Number(moins[moins.length - 1].solde) >= 0) {
        transa.push({s: moins[moins.length - 1].UserUsername, d: plus[plus.length - 1].UserUsername, m: Math.abs(Number(moins[moins.length - 1].solde))});
        plus[plus.length - 1].solde = String(Number(plus[plus.length - 1].solde) - Number(moins[moins.length - 1].solde)); 
        moins.pop();
      } else {
        transa.push({s: moins[moins.length - 1].UserUsername, d: plus[plus.length - 1].UserUsername, m: Number(plus[plus.length - 1].solde)});
        moins[moins.length - 1].solde = String(Number(moins[-1].solde) + Number(plus[plus.length - 1].solde));
        plus.pop(); 
      }
    }
    
    setTransaction(transa)
    setIsLoaded(true)
  }, [refounds])
  
  return (
      <ListContainer>
        {isLoaded && 
        transaction.length === 0 ? <p>Aucun remboursement</p> :
        transaction.map((r, i) => {
          return (
              <div key={i} className={`${i < transaction.length - 1 ? "mb-3" : ""}`}>
                <Refound refound={r} groupId={groupId}/>
              </div>
          )
        })}
      </ListContainer>
  )
}