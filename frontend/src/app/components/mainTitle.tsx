export default function MainTitle({title, subtitle}:{title:string,subtitle?:string}) {
    return (
        <>
            <h1 className={"text-3xl font-light"}>{title}</h1>
            <h2 className={"text-xl text-primary font-light mb-10"}>{subtitle}</h2>
        </>
    )
}