"use client"
import AppMenu from "@/app/components/Menus/AppMenu";
import Page from "../(auth)/login/page";
import { isLoggedIn } from "../utils/account";

export default function RootLayout({children,}: {children: React.ReactNode}) {
  if (!isLoggedIn()) {
    return <Page />
  }

  return (
    <div className={"font-primary bg-secondary text-white pt-20 sm:pt-0 sm:pl-64 min-h-screen"}>
      <AppMenu />
      <div className={"px-10 pt-16"}>
        {children}
      </div>
    </div>
  )
}
