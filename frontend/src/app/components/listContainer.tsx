import {ReactNode} from "react";

export default function ListContainer({doubleRow = false, children}: {doubleRow?: boolean, children: ReactNode}) {
    return (
        <div className={`bg-light-secondary ${doubleRow && "lg:h-212"} h-96 p-3 text-white overflow-y-scroll`}>
            {children}
        </div>
    )
}