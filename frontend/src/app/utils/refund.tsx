import SoldeType from "../types/soldeType";

export function getRefundList(refounds: SoldeType[]): {s: string, d: string, m: number}[]  {
  var plus: SoldeType[] = JSON.parse(JSON.stringify(refounds.filter((x) => Number(x.solde) > 0).sort((x, y) => Number(y.solde) - Number(x.solde))));
  var moins: SoldeType[] = JSON.parse(JSON.stringify(refounds.filter((x) => Number(x.solde) < 0).sort((x, y) => Number(x.solde) - Number(y.solde)))).map((v: SoldeType) => {
    v.solde = String(-Number(v.solde));
    return v;
  });

  if (plus.length === 0 || moins.length === 0) {
    return [];
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

  return transa;
}