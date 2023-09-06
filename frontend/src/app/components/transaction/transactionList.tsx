import Transaction from "@/app/components/transaction/transaction";
import ListContainer from "@/app/components/listContainer";
import TransactionType from "@/app/types/transactionType";
import LabelType from "@/app/types/labelType";

export default function TransactionList({transactions, forGroup = false, doubleRow = false, getInfo, getLabel}: {
  forGroup?: boolean
  transactions: TransactionType[],
  doubleRow?: boolean,
  getInfo: (t: TransactionType) => string,
  getLabel: (t: TransactionType) => LabelType | undefined,
  props?: any
}) {

  return (
      <ListContainer doubleRow={doubleRow}>
        {
        transactions.length === 0 ? <p>Aucune transaction</p> :
        transactions.map((t, i) => {
          return (
            <div key={i} className={`${i < transactions.length - 1 ? "mb-3" : ""}`}>
              <Transaction forGroup={forGroup} label={getLabel(t)} info={getInfo(t)} transaction={t}/>
            </div>
          )
        })}
      </ListContainer>
  )
}