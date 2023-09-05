import Footer from "@/app/components/footer";
import Team from "@/app/(landingpage)/team";

export default function Page() {
    return (
        <>
            <div className="container mx-auto px-4">
                <h1 className={"text-2xl text-center my-16"}>Contactez la team Collabudget</h1>
                <hr className={"border-secondary mx-16"}/>
                <div className={"grid grid-cols-1 md:grid-cols-3 my-16"}>
                    <div className={"col-span-2 text-justify my-auto mx-8 md:mx-32"}>
                        Durant l'été 2023, la team Collabudget a monter ce projet dans le cadre du cours "Projet De Groupe"
                        dispensé à la HEIG-VD. Nous sommes tous quatres étudiant en dernière année de bachelors en Informatique et
                        système de communication. Vous trouverez ci-dessous les différents moyens de contacter chacun d'entre nous
                        pour diverses informations et/ou collaboration.
                    </div>
                    <div className={"col-span-1"}>
                        <img src={"/collabudget.png"} className={"w-3/4"}/>
                    </div>
                </div>
                <hr className={"border-secondary mx-16"}/>
                <div className={"col-span-1 my-16 text-center"}>
                    <div className={"text-xl underline-primary inline-block mb-8 font-semibold"}>L'équipe</div>
                    <Team />
                </div>
            </div>
            <Footer/>
        </>
    )
}