import ListContainer from "@/app/components/listContainer";
import UserGroup from "@/app/components/userGroup/userGroup";
import UserGroupType from "@/app/types/userGroupType";

export default function UserGroupList({soldes, ...props}: { soldes: UserGroupType[], props?: any }) {

    return (
        <ListContainer>
            {soldes.map((s, i) => {
                return (
                    <div className={`${i < soldes.length - 1 ? "mb-3" : ""}`}>
                        <UserGroup solde={s}/>
                    </div>
                )
            })}
        </ListContainer>
    )
}