import Footer from "@/app/components/footer";

export default function Page() {
    return (
        <>
            <div className="container mx-auto px-4">
                <h1 className={"text-2xl text-center my-16"}>Nous avons la solution pour votre porte-monnaie</h1>
                <hr className={"border-secondary mx-16"}/>
                <div className={"grid grid-cols-1 lg:grid-cols-3 my-32"}>
                    <div className={"col-span-2 text-justify my-auto mx-8 lg:mx-32"}>
                        <div className={"text-xl underline-primary  mb-8 font-semibold"}>Transparent</div>
                        Toutes les transactions et actions sont totalement transparentes. Vous pourrez voir qui la faite
                        et à quel moment afin d'en garder des traces du début à la fin.
                    </div>
                    <div className={"col-span-1"}>
                        <img src={"/web/transparent.png"} className={"w-full"}/>
                    </div>
                </div>
                <div className={"grid grid-cols-1 lg:grid-cols-3 my-32"}>
                    <div className={"col-span-1"}>
                        <img src={"/web/collaboratif.png"} className={"w-full"}/>
                    </div>
                    <div className={"col-span-2 text-justify my-auto mx-8 lg:mx-32"}>
                        <div className={"text-xl underline-primary  mb-8 font-semibold"}>Collaboratif</div>
                        En plus de pouvoir gérer vos propres dépenses, vous pourrez contrôller la répartition au sein de
                        votre groupe d'ami, colloc' et autres. Fini les multiples applications, un seul endroit pour
                        tous vos budgets !
                    </div>
                </div>
                <div className={"grid grid-cols-1 lg:grid-cols-3 my-32"}>
                    <div className={"col-span-2 text-justify my-auto mx-8 lg:mx-32"}>
                        <div className={"text-xl underline-primary  mb-8 font-semibold"}>Simple</div>
                        Une interface simple, rapide et intuitive. Pas de prise de tête, Collabuget !
                    </div>
                    <div className={"col-span-1"}>
                        <img src={"/web/simple.png"} className={"w-full"}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}