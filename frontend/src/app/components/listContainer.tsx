export default function ListContainer(props: any) {
    return (
        <div className={"bg-light-secondary h-96 p-3 text-white overflow-y-scroll"}>
            {props.children}
        </div>
    )
}