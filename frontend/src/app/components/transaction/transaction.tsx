import TransactionType from "@/app/types/transactionType";
import {formatCurrency} from "@/app/utils/numberFormatter";

export default function Transaction({transaction, ...props}: { transaction: TransactionType, props?: any }) {
    return (
        <div className={"grid grid-cols-4 bg-secondary p-3"}>
            <div className={"col-span-3 font-semibold"}>
                {transaction.title}
            </div>
            <div className={`col-span-1 text-right ${transaction.montant < 0 ? "text-red" : "text-green"}`}>
                {formatCurrency(transaction.montant)}
            </div>
            <div className={"col-span-3 text-sm"}>
                {transaction.label && <div>
                        <div className={"rounded px-2 inline-block"} style={{background: transaction.label.color}}>{transaction.label.title}</div>
                    </div>}

                {transaction.groupe?.name}
            </div>
            <div className={"col-span-1 text-right"}>
                {transaction.date.toLocaleDateString()}
            </div>
        </div>
    )
}