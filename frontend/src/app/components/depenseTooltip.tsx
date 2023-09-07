import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";
import {TooltipProps} from "recharts";

export default function DepenseTooltip({active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    return (
        <div className={"bg-secondary p-4"}>
          <h3 className={"text-primary"}>{payload[0]?.payload?.title}</h3>
          <div>{payload[0]?.payload?.date.toLocaleDateString()}</div>
          <div>{Math.round(payload[0]?.payload?.value * 100) / 100} CHF</div>
        </div>
    );
  }

  return null;
};