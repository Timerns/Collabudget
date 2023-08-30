import { FC } from "react"

type DisplayStats = "bottom" | "fixe"

type pageProps = {
    display?: DisplayStats
}

const Footer: FC<pageProps> = (props) => {
    return (
        <footer className={" flex items-center justify-center flex-row bottom-0 left-0 z-20 w-full p-3 bg-secondary border-t border-light-secondary shadow" + (props.display == "fixe"? " fixed": "")}>
            <div>
                <span className="text-sm text-primary sm:text-center ">© 2023
                    <a href="/" className="hover:underline"> Collabudget™ </a>
                    - Tous droits réservés.
                </span>
            </div>

        </footer>
    )
}

Footer.defaultProps = {
    display: "fixe"
};

export default Footer;
