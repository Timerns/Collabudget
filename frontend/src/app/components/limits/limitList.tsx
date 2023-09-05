import ListContainer from "@/app/components/listContainer";
import Limit from "./limit";
import LimitType from "@/app/types/limitType";

export default function LimitList({limits}: {
  limits: LimitType[],
  props?: any
}) {

  return (
      <ListContainer doubleRow={false}>
        {limits.map((t, i) => {
          return (
            <div key={i} className={`${i < limits.length - 1 ? "mb-3" : ""}`}>
              <Limit limit={t}/>
            </div>
          )
        })}
      </ListContainer>
  )
}