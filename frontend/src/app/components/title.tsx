export default function Title({title}:{title:string}) {
    return (
        <h3 className={"text-xl font-light border-b border-primary pb-2 mb-6 mt-5"}>{title}</h3>
    )
}