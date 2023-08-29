import Transaction from "@/app/components/transaction/transaction";
import ListContainer from "@/app/components/listContainer";
import TransactionType from "@/app/types/transactionType";

export default function TransactionList({transactions, ...props}: { transactions: TransactionType[], props?: any }) {

    return (
        <ListContainer>
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