import AppMenu from "@/app/components/Menus/AppMenu";
import LandingMenu from "../components/Menus/LandingMenu";

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
        <div>
            <LandingMenu />
            <div>
                {children}
            </div>
        </div>
    )
}
