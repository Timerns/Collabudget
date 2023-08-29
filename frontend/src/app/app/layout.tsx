import AppMenu from "@/app/components/Menus/AppMenu";

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
        <div className={"font-primary bg-secondary text-white mt-24 md:mt-0 md:ml-64 min-h-screen"}>
            <AppMenu />
            <div>
                {children}
            </div>
        </div>
    )
}
