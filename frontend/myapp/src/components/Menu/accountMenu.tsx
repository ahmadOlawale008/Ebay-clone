import React, { MouseEventHandler, ReactNode, useEffect, useRef, useState } from "react"
import SettingsIcon from "../../assets/icons/settingsIcon"
import UserIcon from "../../assets/icons/userIcon"
import { motion } from "framer-motion"
import "./account-menu.css"
interface AccountMenuProps {
    anchorOrigin?: HTMLDivElement | null,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type modeProps = "light" | "dark"
const AccountMenu: React.FC<AccountMenuProps> = ({ anchorOrigin, setOpen }) => {
    const popMenuRef = useRef<HTMLDivElement | null>(null)
    const [mode, setMode] = useState<modeProps>(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
    const clickedOutsideMenu = (e: MouseEvent) => {
        if (!popMenuRef.current?.contains(e.target as Node)) {
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", clickedOutsideMenu)
        return (() => document.removeEventListener("click", clickedOutsideMenu))
    }, [])
    return (
        <div ref={popMenuRef} className="absolute top-0 overflow-hidden translate-x-[-13px] shadow-2xl  translate-y-[30px] rounded-2xl z-20 right-0 bg-white min-w-[350px]  pb-8">
            <div className="w-full mx-auto  items-center">
                <div className="w-full flex flex-col ashau8 gap-y-4 justify-center mx-auto">
                    <span className='border ring-2 ring-slate-300 inline-flex items-center justify-center m-auto size-20 rounded-full bg-slate-500 p-1 '>
                        <UserIcon className='  text-5xl content-[1] relative cursor-pointer fill-white' />
                    </span>
                    <div className="text-center tracking-wide block">
                        <p className="text-center text-lg ">
                            <span className="italic mr-1 font-black">@</span>user
                        </p>
                        <small className="text-lg">
                            user12@gmail.com
                        </small>
                    </div>
                </div>
                <div className="my-3">
                    <div className="px-2 items-center gap-x-3 flex cursor-pointer hover:bg-slate-300/30 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 stroke-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <div className="">
                            View your profile
                        </div>
                    </div>
                    <div className="px-2 items-center gap-x-3 flex cursor-pointer hover:bg-slate-300/30 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 stroke-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <div className="">
                            Favorites
                        </div>
                    </div>
                    <hr className="bg-slate-700/20 h-[2px]" />
                    <div className="px-2 items-center gap-x-3 flex cursor-pointer hover:bg-slate-300/30 py-3">
                        <SettingsIcon className="text-3xl fill-gray-500" />
                        <div className="">
                            Settings
                        </div>
                    </div>
                    <div className="px-2 items-center gap-x-3 flex cursor-pointer hover:bg-slate-300/30 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 stroke-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        <div className="">
                            Logout
                        </div>
                    </div>
                    <hr className="bg-slate-700/20 h-[2px]" />
                </div>
                <div className="px-2 gap-x-3 flex  items-baseline justify-between ">
                    <div className="flex items-center gap-x-4">
                        {mode == "dark" ? <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 fill-gray-500">
                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                            </svg>
                            <small className="text-base basis-1/4 text-nowrap">Dark Mode</small>
                        </>
                            :
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 stroke-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                                <small className="text-base basis-1/4 text-nowrap">Light Mode</small>
                            </>
                        }
                    </div>
                    <motion.div onClick={() => setMode(mode == "light" ? "dark" : "light")} className={`capsule flex  shadow-md ${mode == "light" ? "justify-end" : "justify-start"} basis-1/5 w-full cursor-pointer  rounded-full mt-6 bg-slate-300`}>
                        <motion.div className={`capsule-login size-10 rounded-full flex items-center justify-center bg-gray-400`}>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
export default AccountMenu
