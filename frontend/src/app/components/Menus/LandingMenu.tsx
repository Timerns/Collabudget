"use client"
import React, { useState, FC } from 'react'
import { usePathname } from 'next/navigation';

type pageProps = {}

const LandingMenu: FC<pageProps> = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname  = usePathname ()
  return (
    <nav className="bg-secondary md:px-10">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src="/collabudget-light.png" className="h-12 mr-8" alt="Collabudget Logo" />
        </a>
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
              <a href="/" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Accueil</a>
            </li> 
            <li>
              <a href="/test" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/test" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Solution</a>
            </li>
            <li>
              <a href="/propos" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/propos" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">A propos</a>
            </li>
            <li>
              <a href="/contact" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/contact" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Contact</a>
            </li>
            <li className="lg:ml-20">
              <a href="/signin" className={"block py-2 pl-3 pr-4 rounded hover:text-primary" + (pathname == "/signin" ? " text-primary underline decoration-primary underline-offset-4": " text-white")} aria-current="page">Connexion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default LandingMenu