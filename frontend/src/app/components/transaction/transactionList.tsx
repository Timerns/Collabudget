import Transaction from "@/app/components/transaction/transaction";
import ListContainer from "@/app/components/listContainer";
import TransactionType from "@/app/types/transactionType";

export default function TransactionList({transactions, doubleRow = false}: {
  transactions: TransactionType[],
  doubleRow?: boolean,
  props?: any
}) {

  return (
      <ListContainer doubleRow={doubleRow}>
        {transactions.map((t, i) => {
          return (
              <div className={`${i < transactions.length - 1 ? "mb-3" : ""}`}>
                <Transaction transaction={t}/>
              </div>
          )
        })}
      </ListContainer>
  )
}