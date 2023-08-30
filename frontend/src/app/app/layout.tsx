import AppMenu from "@/app/components/Menus/AppMenu";

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
        <div className={"font-primary bg-secondary text-white mt-20 sm:mt-0 sm:ml-64 min-h-screen"}>
            <AppMenu />
            <div className={"px-10 pt-16"}>
                {children}
            </div>
        </div>
    )
}
