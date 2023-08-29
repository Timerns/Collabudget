export default function Menu() {
    return (
        <nav className="bg-secondary shadow shadow-gray-300 w-100 px-8 py-4 md:px-auto" id={"web-menu"}>
            <div
                className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="md:order-1">
                    <img src={"/collabudget-light.png"} className={"h-16"}/>
                </div>
                <div className="text-white order-3 w-full md:w-auto md:order-2">
                    <ul className="flex justify-between">
                        <li className="md:px-4 md:py-2 hover:text-primary activ"><a href="#">Accueil</a></li>
                        <li className="md:px-4 md:py-2 hover:text-primary"><a href="#">Solution</a></li>
                        <li className="md:px-4 md:py-2 hover:text-primary"><a href="#">A propos</a></li>
                        <li className="md:px-4 md:py-2 hover:text-primary"><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="text-white order-2 md:order-3">
                    <a className={"md:px-4 md:py-2 hover:text-primary"}>Connexion</a>
                </div>
            </div>
        </nav>
    )
}
