import Transaction from "@/app/components/transaction/transaction";
import ListContainer from "@/app/components/listContainer";
import TransactionType from "@/app/types/transactionType";
import LabelType from "@/app/types/labelType";

export default function TransactionList({transactions, labels, doubleRow = false}: {
  transactions: TransactionType[],
  labels: LabelType[],
  doubleRow?: boolean,
  props?: any
}) {

  return (
      <ListContainer doubleRow={doubleRow}>
        {transactions.map((t, i) => {
          return (
              <div key={i} className={`${i < transactions.length - 1 ? "mb-3" : ""}`}>
                <Transaction label={labels.find(x => x.id === Number(t.LabelId))} transaction={t}/>
              </div>
          )
        })}
      </ListContainer>
  )
}