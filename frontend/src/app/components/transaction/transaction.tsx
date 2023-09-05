import LabelType from "@/app/types/labelType";
import TransactionType from "@/app/types/transactionType";
import { formatCurrency } from "@/app/utils/numberFormatter";

export default function Transaction({ transaction, label, info, ...props }: { transaction: TransactionType, label: LabelType | undefined, props?: any, info: string }) {
  return (
    <div className={"grid grid-cols-4 bg-secondary p-3"}>
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
  )
}