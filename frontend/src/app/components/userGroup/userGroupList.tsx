import ListContainer from "@/app/components/listContainer";
import UserGroup from "@/app/components/userGroup/userGroup";
import SoldeType from "@/app/types/soldeType";
import UserGroupType from "@/app/types/userGroupType";

export default function UserGroupList({soldes, ...props}: { soldes: SoldeType[], props?: any }) {
    return (
        <ListContainer>
            {soldes.map((s, i) => {
                return (
                    <div key={i} className={`${i < soldes.length - 1 ? "mb-3" : ""}`}>
                        <UserGroup solde={s}/>
                    </div>
                )
            })}
        </ListContainer>
    )
}