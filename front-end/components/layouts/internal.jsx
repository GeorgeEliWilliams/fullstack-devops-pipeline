import Link from "next/link";
import {useContext} from "react";
import axios from "axios";
import {AppContext} from "@/components/context";

export default function Layout(props) {
    const activeLink = props.location;

    const {user} = useContext(AppContext);


    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/logout");
            if (response.status === 200) {
                window.location.assign('');
            }
        } catch (err) {

        }
    }

    return (
        <div className="drawer lg:drawer-open bg-red-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content bg-white my-2 mx-2 rounded-lg">
                <div className="container px-4 lg:px-10 py-4 lg:py-4">
                    {props.children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex flex-col justify-between min-h-screen">
                    <ul className="menu p-4 w-64 min-h-full  text-primary ">
                        <li className="mb-10">
                            <div className="text-4xl text-gray-600">
                                CLM
                            </div>
                        </li>
                        <li className={`rounded-lg  ${activeLink === "/" ? 'sidebar-menu-active' : ''}`}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a href="/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path
                                        d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"/>
                                    <path
                                        d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"/>
                                    <path
                                        d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"/>
                                    <path
                                        d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"/>
                                </svg>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className={`rounded-lg ${activeLink === "users" ? 'sidebar-menu-active mt-4' : 'mt-4'}`}>
                            <Link href="/users/">

                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                     viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="icon icon-tabler icons-tabler-outline icon-tabler-users">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
                                </svg>

                                <span>Users</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="menu p-4 w-64 min-h-full text-primary ">
                        <li className={`bg-transparent dropdown dropdown-top rounded-lg ${activeLink === "account" ? 'sidebar-menu-active mt-20' : 'mt-20'}`}>
                            <div tabIndex={0} role="button" className=" m-1">
                                {user.first_name.at(0).toUpperCase()}. {user.last_name.toUpperCase()}
                            </div>
                            <ul tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow">
                                <li><Link href={"/account/settings"}>Settings</Link></li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}