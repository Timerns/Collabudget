"use client"
import React, { useState, FC } from 'react'
import { usePathname } from 'next/navigation';
import Link from "next/link";

type pageProps = {}

const LandingMenu: FC<pageProps> = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname  = usePathname ()
  return (
    <nav className="bg-secondary md:px-10">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img src="/collabudget-light.png" className="h-12 mr-8" alt="Collabudget Logo" />
        </Link>
        <button data-collapse-toggle="navbar-default" 
                type="button" 
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-light-gray" 
                aria-controls="navbar-default" 
                aria-expanded="false"
                onClick={() => setNavbarOpen(!navbarOpen)}>

          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>

        </button>

        <div className={"w-full md:block md:w-auto" + (navbarOpen ? "" : " hidden")} 
             id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0 md:w-full">
            <li>
              <Link href="/" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Accueil</Link>
            </li> 
            <li>
              <Link href="/solution" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/solution" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Solution</Link>
            </li>
            <li>
              <Link href="/a-propos" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/a-propos" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">A propos</Link>
            </li>
            <li>
              <Link href="/contact" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/contact" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Contact</Link>
            </li>
            <li className="lg:ml-20">
              <Link href="/login" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/signin" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Connexion</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default LandingMenu