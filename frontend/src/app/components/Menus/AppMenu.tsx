"use client"
import React, { useState, FC } from 'react'
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";

type pageProps = {}

const AppMenu: FC<pageProps> = (props) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const pathname  = usePathname()

    const logout = () => {
        request<string>("/api/logout", "GET")
            .then(val => {
                window.location.href = "/login";
            })
            .catch(e => toast.error(e));
    }

    return (
        <div>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="fixed top-0 right-0 inline-flex items-center p-2 mt-6 mr-3 text-sm text-light-gray rounded-lg sm:hidden hover:bg-secondary z-50 "
                onClick={() => setNavbarOpen(!navbarOpen)}
            >
                <span className="sr-only">Open sidebar</span>
                {
                    navbarOpen ?
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1L1 11M1 1L11 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        :
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                }
            </button>


            <div className='fixed top-0 left-0 z-40 w-full bg-light-secondary sm:hidden'>
                <div className='flex flex-col w-64 h-20 px-3 py-4 '>
                    <a href="/" className="flex justify-center w-full mx-auto">
                        <img src="/collabudget-light.png" className="h-14" alt="Collabudget Logo" />
                    </a>
                </div>
            </div>

            <aside id="sidebar-multi-level-sidebar" className={"fixed top-0 left-0 z-30 w-64 h-screen transition-transform  sm:translate-x-0" + (navbarOpen ? "" : " -translate-x-full")} aria-label="Sidebar">
                <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-light-secondary ">

                    <Link href="/app" className="flex justify-center w-full mx-auto invisible sm:visible h-20 ">
                        <img src="/collabudget-light.png" className="h-14" alt="Collabudget Logo" />
                    </Link>
                    <hr className="w-48 h-1 mx-auto my-4 bg-primary border-0 rounded" />
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/app" className="flex items-center p-2 text-light-gray group">
                                <svg className="w-5 h-5" viewBox="0 0 31 34" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7083 10.875V3.625H26.375V10.875H16.7083ZM4.625 15.7083V3.625H14.2917V15.7083H4.625ZM16.7083 25.375V13.2917H26.375V25.375H16.7083ZM4.625 25.375V18.125H14.2917V25.375H4.625Z" />
                                </svg>
                                <span className={"ml-3 text-light-gray  hover:text-primary" + (pathname == "/app" ? " text-primary underline decoration-primary underline-offset-4": " text-white")}>Tableau de bord</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/app/mes-depenses" className="flex items-center p-2 text-light-gray group">
                                <svg className="w-5 h-5" width="29" height="29" viewBox="0 0 29 29" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.0312 14.5C19.0312 15.3962 18.7655 16.2723 18.2676 17.0174C17.7697 17.7626 17.062 18.3434 16.234 18.6863C15.4061 19.0293 14.495 19.119 13.616 18.9442C12.737 18.7693 11.9296 18.3378 11.2959 17.7041C10.6622 17.0704 10.2307 16.263 10.0558 15.384C9.88098 14.505 9.97071 13.5939 10.3137 12.766C10.6566 11.938 11.2374 11.2303 11.9826 10.7324C12.7277 10.2345 13.6038 9.96875 14.5 9.96875C15.7018 9.96875 16.8543 10.4461 17.7041 11.2959C18.5539 12.1457 19.0312 13.2982 19.0312 14.5ZM28.0938 7.25V21.75C28.0938 21.9904 27.9983 22.2209 27.8283 22.3908C27.6584 22.5608 27.4279 22.6562 27.1875 22.6562H1.8125C1.57215 22.6562 1.34164 22.5608 1.17168 22.3908C1.00173 22.2209 0.90625 21.9904 0.90625 21.75V7.25C0.90625 7.00965 1.00173 6.77914 1.17168 6.60918C1.34164 6.43923 1.57215 6.34375 1.8125 6.34375H27.1875C27.4279 6.34375 27.6584 6.43923 27.8283 6.60918C27.9983 6.77914 28.0938 7.00965 28.0938 7.25ZM26.2812 12.5006C25.2522 12.1963 24.3156 11.6394 23.5569 10.8806C22.7981 10.1219 22.2412 9.18529 21.9369 8.15625H7.06309C6.75882 9.18529 6.20193 10.1219 5.44315 10.8806C4.68436 11.6394 3.74779 12.1963 2.71875 12.5006V16.4994C3.74779 16.8037 4.68436 17.3606 5.44315 18.1194C6.20193 18.8781 6.75882 19.8147 7.06309 20.8438H21.9369C22.2412 19.8147 22.7981 18.8781 23.5569 18.1194C24.3156 17.3606 25.2522 16.8037 26.2812 16.4994V12.5006Z" fill="#F5F5F5" />
                                </svg>

                                <span className={"ml-3 text-light-gray  hover:text-primary" + (pathname == "/app/mes-depenses" ? " text-primary underline decoration-primary underline-offset-4": " text-white")}>Mes dépenses</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">

                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 group-hover:text-gray-900" width="29" height="28" viewBox="0 0 29 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.95677 13.5322C7.32552 13.5825 5.99132 14.2269 4.95417 15.4654H2.93021C2.10451 15.4654 1.40972 15.2615 0.845833 14.8537C0.281944 14.4459 0 13.8494 0 13.064C0 9.5098 0.624306 7.73269 1.87292 7.73269C1.93333 7.73269 2.15234 7.83841 2.52995 8.04985C2.90755 8.26129 3.39844 8.47525 4.0026 8.69172C4.60677 8.9082 5.2059 9.01643 5.8 9.01643C6.47465 9.01643 7.14427 8.90064 7.80885 8.66907C7.75851 9.0416 7.73333 9.37387 7.73333 9.66586C7.73333 11.0654 8.14115 12.3542 8.95677 13.5322ZM25.1333 23.1528C25.1333 24.361 24.7658 25.315 24.0307 26.0148C23.2957 26.7145 22.3189 27.0644 21.1005 27.0644H7.89948C6.68108 27.0644 5.70434 26.7145 4.96927 26.0148C4.2342 25.315 3.86667 24.361 3.86667 23.1528C3.86667 22.6191 3.88429 22.0981 3.91953 21.5896C3.95477 21.0811 4.02526 20.5324 4.13099 19.9434C4.23672 19.3544 4.37014 18.8081 4.53125 18.3047C4.69236 17.8013 4.90885 17.3104 5.18073 16.8322C5.4526 16.3539 5.76476 15.9461 6.11719 15.6089C6.46962 15.2716 6.90009 15.0022 7.40859 14.8008C7.9171 14.5995 8.47847 14.4988 9.09271 14.4988C9.1934 14.4988 9.4099 14.607 9.74219 14.8235C10.0745 15.04 10.442 15.2816 10.8448 15.5484C11.2476 15.8153 11.7863 16.0569 12.4609 16.2734C13.1356 16.4899 13.8153 16.5981 14.5 16.5981C15.1847 16.5981 15.8644 16.4899 16.5391 16.2734C17.2137 16.0569 17.7524 15.8153 18.1552 15.5484C18.558 15.2816 18.9255 15.04 19.2578 14.8235C19.5901 14.607 19.8066 14.4988 19.9073 14.4988C20.5215 14.4988 21.0829 14.5995 21.5914 14.8008C22.0999 15.0022 22.5304 15.2716 22.8828 15.6089C23.2352 15.9461 23.5474 16.3539 23.8193 16.8322C24.0911 17.3104 24.3076 17.8013 24.4688 18.3047C24.6299 18.8081 24.7633 19.3544 24.869 19.9434C24.9747 20.5324 25.0452 21.0811 25.0805 21.5896C25.1157 22.0981 25.1333 22.6191 25.1333 23.1528ZM9.66667 3.86634C9.66667 4.93362 9.28906 5.84482 8.53385 6.59997C7.77865 7.35511 6.86736 7.73269 5.8 7.73269C4.73264 7.73269 3.82135 7.35511 3.06615 6.59997C2.31094 5.84482 1.93333 4.93362 1.93333 3.86634C1.93333 2.79907 2.31094 1.88786 3.06615 1.13272C3.82135 0.377573 4.73264 0 5.8 0C6.86736 0 7.77865 0.377573 8.53385 1.13272C9.28906 1.88786 9.66667 2.79907 9.66667 3.86634ZM20.3 9.66586C20.3 11.2668 19.7336 12.6336 18.6008 13.7663C17.468 14.899 16.101 15.4654 14.5 15.4654C12.899 15.4654 11.532 14.899 10.3992 13.7663C9.26641 12.6336 8.7 11.2668 8.7 9.66586C8.7 8.06495 9.26641 6.69814 10.3992 5.56542C11.532 4.4327 12.899 3.86634 14.5 3.86634C16.101 3.86634 17.468 4.4327 18.6008 5.56542C19.7336 6.69814 20.3 8.06495 20.3 9.66586ZM29 13.064C29 13.8494 28.7181 14.4459 28.1542 14.8537C27.5903 15.2615 26.8955 15.4654 26.0698 15.4654H24.0458C23.0087 14.2269 21.6745 13.5825 20.0432 13.5322C20.8589 12.3542 21.2667 11.0654 21.2667 9.66586C21.2667 9.37387 21.2415 9.0416 21.1911 8.66907C21.8557 8.90064 22.5253 9.01643 23.2 9.01643C23.7941 9.01643 24.3932 8.9082 24.9974 8.69172C25.6016 8.47525 26.0924 8.26129 26.4701 8.04985C26.8477 7.83841 27.0667 7.73269 27.1271 7.73269C28.3757 7.73269 29 9.5098 29 13.064ZM27.0667 3.86634C27.0667 4.93362 26.6891 5.84482 25.9339 6.59997C25.1786 7.35511 24.2674 7.73269 23.2 7.73269C22.1326 7.73269 21.2214 7.35511 20.4661 6.59997C19.7109 5.84482 19.3333 4.93362 19.3333 3.86634C19.3333 2.79907 19.7109 1.88786 20.4661 1.13272C21.2214 0.377573 22.1326 0 23.2 0C24.2674 0 25.1786 0.377573 25.9339 1.13272C26.6891 1.88786 27.0667 2.79907 27.0667 3.86634Z" fill="#F5F5F5" />
                                </svg>

                                <span className="flex-1 ml-3 text-left text-light-gray whitespace-nowrap">Groupes</span>

                            </button>
                            <ul className="py-2 space-y-2">
                                <li>
                                    <Link href="/app/groupe/vacance" className={"flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group text-light-gray hover:text-primary"+ (pathname == "/app/groupe/vacance" ? " text-primary underline decoration-primary underline-offset-4": " text-white")}>Vacance</Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                    {/* bottom nav */}
                    <ul className="self-end space-y-2 font-medium mt-auto mr-auto">
                        <li>
                            <Link href="#" onClick={() => { logout() }} className="flex items-center p-2 text-light-gray group">

                                <svg className="w-5 h-5" width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.04167 22.375C2.37709 22.375 1.80796 22.1382 1.33429 21.6645C0.860627 21.1908 0.624196 20.6221 0.625002 19.9583V3.04167C0.625002 2.37709 0.861835 1.80796 1.3355 1.33429C1.80917 0.860627 2.37789 0.624196 3.04167 0.625002H11.5V3.04167H3.04167V19.9583H11.5V22.375H3.04167ZM16.3333 17.5417L14.6719 15.7896L17.7531 12.7083H7.875V10.2917H17.7531L14.6719 7.21042L16.3333 5.45834L22.375 11.5L16.3333 17.5417Z" />
                                </svg>

                                <span className={"ml-3 text-light-gray  hover:text-primary" + (pathname == "/deconnection" ? " text-primary underline decoration-primary underline-offset-4": " text-white")}>Déconnection</span>
                            </Link>
                        </li>
                        <hr className="w-48 h-1 mx-auto my-4 bg-primary border-0 rounded md:my-10" />
                        <li>
                            <Link href="/app/mon-compte" className="flex items-center p-2 text-light-gray group">
                                <svg className="w-5 h-5" width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5002 0.833252C11.782 0.833252 13.0114 1.34248 13.9178 2.2489C14.8243 3.15533 15.3335 4.38471 15.3335 5.66659C15.3335 6.94847 14.8243 8.17784 13.9178 9.08427C13.0114 9.99069 11.782 10.4999 10.5002 10.4999C9.21828 10.4999 7.98891 9.99069 7.08248 9.08427C6.17605 8.17784 5.66683 6.94847 5.66683 5.66659C5.66683 4.38471 6.17605 3.15533 7.08248 2.2489C7.98891 1.34248 9.21828 0.833252 10.5002 0.833252ZM10.5002 12.9166C15.841 12.9166 20.1668 15.0795 20.1668 17.7499V20.1666H0.833496V17.7499C0.833496 15.0795 5.15933 12.9166 10.5002 12.9166Z" />
                                </svg>

                                <span className={"ml-3 text-light-gray  hover:text-primary" + (pathname == "/app/mon-compte" ? " text-primary underline decoration-primary underline-offset-4": " text-white")}>Mon compte</span>
                            </Link>
                        </li>

                    </ul>

                </div>
            </aside>

        </div>
    )
}
export default AppMenu

