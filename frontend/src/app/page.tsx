import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";

export default function Landing() {
    console.log("Hello World " + process.env.HELLO);
    return (
        <>
            <Menu/>
            <div className="container mx-auto px-4">
                <h1 className={"text-2xl text-center my-16"}>Gérez vos dépenses</h1>
                <hr className={"border-secondary mx-16"}/>
                <div className={"grid grid-cols-1 md:grid-cols-3"}>
                    <div className={"col-span-1"}>
                        <img src={"/web/landing-hero.png"}/>
                    </div>
                    <div className={"col-span-2 text-justify my-auto mx-8 md:mx-32"}>
                        Collabudget est une application conçue pour simplifier la gestion de votre budget mensuel. Vous
                        pouvez facilement enregistrer vos dépenses et il vous est également possible de spécifier une
                        limite de dépense pour le mois courant. De plus, notre application vous offre également la
                        possibilité de créer des groupes de partage de budgets avec vos amis, votre famille ou vos
                        collègues facilitant ainsi la répartition équitables de vos finances. Les dépenses au sein de
                        ces groupes sont ensuite automatiquement ajoutée sur votre profil personnel afin d'avoir un
                        suivi des dépenses exactes et localisé dans une seule application.
                    </div>
                </div>
                <hr className={"border-secondary mx-16"}/>
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-8 my-16"}>
                    <div className={"col-span-1 text-center"}>
                        <div className={"text-xl underline-primary inline-block mb-8 font-semibold"}>Transparent</div>
                        <img src={"/web/transparent.png"} className={"rounded"}/>
                    </div>
                    <div className={"col-span-1 text-center"}>
                        <div className={"text-xl underline-primary inline-block mb-8 font-semibold"}>Collaboratif</div>
                        <img src={"/web/collaboratif.png"} className={"rounded"}/>
                    </div>
                    <div className={"col-span-1 text-center"}>
                        <div className={"text-xl underline-primary inline-block mb-8 font-semibold"}>Simple</div>
                        <img src={"/web/simple.png"} className={"rounded"}/>
                    </div>
                </div>
                <hr className={"border-secondary mx-16"}/>
                <div className={"col-span-1 my-16 text-center"}>
                    <div className={"text-xl underline-primary inline-block mb-8 font-semibold"}>L'équipe</div>
                    <div className={"md:w-1/2 mx-auto mb-16"}>
                        Nous sommes tous quatre étudiants à la HEIG-vD en dernière année de bachelor en Informatique. Ce
                        projet a été réalisé durant l’été 2023 dans le cadre du cours Projet De Groupe (PDG)
                    </div>
                    <div className={"grid md:grid-cols-4"}>
                        <div className={"col-span-1 mb-6"}>
                            <img src={"/web/user1.png"} className={"w-1/2 mx-auto mb-3"}/>
                            <h3 className={"text-lg"}>Tim Ernst</h3>
                            <h3 className={"text-lg"}>Président Directeur Général</h3>
                            <h4 className={"text-sm"}>tim.ersnt@heig-vd.ch</h4>
                        </div>
                        <div className={"col-span-1 mb-6"}>
                            <img src={"/web/user1.png"} className={"w-1/2 mx-auto mb-3"}/>
                            <h3 className={"text-lg"}>Tim Ernst</h3>
                            <h3 className={"text-lg"}>Président Directeur Général</h3>
                            <h4 className={"text-sm"}>tim.ersnt@heig-vd.ch</h4>
                        </div>
                        <div className={"col-span-1 mb-6"}>
                            <img src={"/web/user1.png"} className={"w-1/2 mx-auto mb-3"}/>
                            <h3 className={"text-lg"}>Tim Ernst</h3>
                            <h3 className={"text-lg"}>Président Directeur Général</h3>
                            <h4 className={"text-sm"}>tim.ersnt@heig-vd.ch</h4>
                        </div>
                        <div className={"col-span-1 mb-6"}>
                            <img src={"/web/user1.png"} className={"w-1/2 mx-auto mb-3"}/>
                            <h3 className={"text-lg"}>Tim Ernst</h3>
                            <h3 className={"text-lg"}>Président Directeur Général</h3>
                            <h4 className={"text-sm"}>tim.ersnt@heig-vd.ch</h4>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
