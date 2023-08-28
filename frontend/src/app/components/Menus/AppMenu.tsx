import React, { FC } from 'react'

type pageProps = {}

const AppMenu: FC<pageProps> = (props) => {
  return (
    <div>
        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-light-secondary ">

                <a href="/" className="flex justify-center w-full mx-auto">
                    <img src="/logo.png" className="h-20" alt="Collabudget Logo" />
                </a>
                <hr className="w-48 h-1 mx-auto my-4 bg-primary border-0 rounded md:my-10" />
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" className="flex items-center p-2 text-light-gray rounded-lg hover:bg-gray-100  group">
                        {/* <svg className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg> */}

                            {/* <svg className="w-5 h-5" viewBox="0 0 31 34" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7083 10.875V3.625H26.375V10.875H16.7083ZM4.625 15.7083V3.625H14.2917V15.7083H4.625ZM16.7083 25.375V13.2917H26.375V25.375H16.7083ZM4.625 25.375V18.125H14.2917V25.375H4.625Z"/>
                            </svg> */}


                        {/* <span className="ml-3 text-light-gray">Tableau de bord</span> */}
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

    </div>
  )
}

export default AppMenu

