"use client"
import ListContainer from "@/app/components/listContainer";
import RefoundType from "@/app/types/refoundType";
import Refound from "@/app/components/refound/refound";
import SoldeType from "@/app/types/soldeType";
import { useEffect, useState } from "react";

export default function RefoundList({refounds, groupId, username}: { refounds: SoldeType[], groupId: number, username: string}) {
  
  const [transaction, setTransaction] = useState<{s: string, d: string, m: number}[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    var plus: SoldeType[] = JSON.parse(JSON.stringify(refounds.filter((x) => Number(x.solde) > 0).sort((x, y) => Number(y.solde) - Number(x.solde))));
    var moins: SoldeType[] = JSON.parse(JSON.stringify(refounds.filter((x) => Number(x.solde) < 0).sort((x, y) => Number(x.solde) - Number(y.solde)))).map((v: SoldeType) => {
      v.solde = String(-Number(v.solde));
      return v;
    });

    if (plus.length === 0 || moins.length === 0) {
      return;
    }

    let transa = []
    let moinsCurr: SoldeType | undefined = undefined;
    while (moinsCurr = moins.pop()) {
      var plusCurr = plus[0];
      var plusSolde = Number(plusCurr.solde);
      var moinsSolde = Number(moinsCurr.solde);

      if (plusSolde > moinsSolde) {
        moinsCurr.solde = "0";
        transa.push({s: moinsCurr.UserUsername, d: plusCurr.UserUsername, m: moinsSolde})
      } else {
        var solde = moinsSolde - plusSolde;
        if (solde !== 0) {
          moinsCurr.solde = String(solde);
          moins.push(moinsCurr);
        }
        transa.push({s: moinsCurr.UserUsername, d: plusCurr.UserUsername, m: plusSolde})
        plus.splice(0, 1);
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
                <Refound username={username} refound={r} groupId={groupId}/>
              </div>
          )
        })}
      </ListContainer>
  )
}