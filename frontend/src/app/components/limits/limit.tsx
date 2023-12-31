import LabelType from "@/app/types/labelType";
import { LimitType } from "@/app/types/limitType";
import TransactionCategorieType from "@/app/types/transactionCategorieType";
import TransactionType from "@/app/types/transactionType";
import { formatCurrency } from "@/app/utils/numberFormatter";

export default function Limit({ limit, ...props }: { limit: LimitType, props?: any }) {
  return (
    <div className={"grid grid-cols-2 bg-secondary p-3"}>
      <div className={"col-span-1 font-semibold flex items-center"}>
        <div className="mr-2">
          {
            <div className="w-5 h-5 rounded-full" style={{background: limit.labelColor}}></div>
          }
        </div>
        <span>
          {limit.name || "Autres"}
        </span>
      </div>
      <div className={`col-span-1 text-right ${-limit.currentValue >= limit.maxValue && limit.maxValue !== -1 ? "text-red" : "text-green"}`}>
        {Math.round(-limit.currentValue * 100) / 100} / {formatCurrency(limit.maxValue === -1 ? undefined : limit.maxValue, undefined, false)}
      </div>
    </div>
  )
}