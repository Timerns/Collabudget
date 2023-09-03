"use client"
import AppMenu from "@/app/components/Menus/AppMenu";
import Page from "../(auth)/login/page";
import { getStatus } from "../utils/account";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState<string | null>(null)
  
  useEffect(() => {
    getStatus()
      .then(username => {
        setUsername(username);
        setIsLoaded(true);
      })
      .catch(e => toast.error(e));
  }, [])

  return (
    <>
      {!isLoaded &&
        <div className={"font-primary bg-secondary text-white min-h-screen items-center content-start flex"}>
          <div className={"w-full center text-center h-fit text-3xl"}>
            Loading...
          </div>
        </div>
      }
      {isLoaded && (
        username === null ?
        <Page /> :
        <div className={"font-primary bg-secondary text-white pt-20 sm:pt-0 sm:pl-64 min-h-screen"}>
          <AppMenu />
          <div className={"px-10 pt-16"}>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
