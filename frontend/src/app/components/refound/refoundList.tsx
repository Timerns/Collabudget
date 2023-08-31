import ListContainer from "@/app/components/listContainer";
import RefoundType from "@/app/types/refoundType";
import Refound from "@/app/components/refound/refound";

export default function RefoundList({refounds}: { refounds: RefoundType[]}) {

  return (
      <ListContainer>
        {refounds.map((r, i) => {
          return (
              <div className={`${i < refounds.length - 1 ? "mb-3" : ""}`}>
                <Refound refound={r}/>
              </div>
          )
        })}
      </ListContainer>
  )
}