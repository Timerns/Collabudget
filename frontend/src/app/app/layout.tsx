import AppMenu from "@/app/components/Menus/AppMenu";

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
        <div className={"font-primary bg-secondary text-white pt-20 sm:pt-0 sm:pl-64 min-h-screen"}>
            <AppMenu />
            <div className={"px-10 pt-16"}>
                {children}
            </div>
        </div>
    )
}
