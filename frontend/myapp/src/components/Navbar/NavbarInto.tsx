import { HTMLAttributes, useRef, useState } from 'react'
import NotificationIcon from '../../assets/icons/notificationicon'
import UserIcon from '../../assets/icons/userIcon'
import AccountMenu from '../Menu/accountMenu'
import { motion } from "framer-motion"
const NavbarInto = () => {
    const [accountMenuState, setOpenAccountMenuState] = useState(false)
    const accountMenuRef = useRef<HTMLDivElement | null>(null)
    return (
        <nav className='bg-white px-12 py-3 border-b border-gray-400/40'>
            <div className='flex flex-row'>
                <h4 className='text-xl flex-1 font-black font-petit'><span className='  text-theme-secondary'>Eaze</span> sales</h4>
                <div className=''>
                    <div className='flex flex-row items-center relative flex-nowrap gap-x-6'>
                        <span className='text-base'>
                            <a href="">About</a>
                        </span>
                        <span className='text-base'>
                            <a href="">Categories</a>
                        </span>
                        <span className='text-base'>
                            <a href="">Products</a>
                        </span>
                        <hr className='w-[1px] h-5 bg-gray-500' />
                        <span>
                            <button className='text-base inline-flex font-medium px-3 py-1 ease-in-out transition-all rounded-md hover:bg-gray-100/55 bg-transparent border-none'>
                                Sign in
                            </button>
                        </span>
                        <span>
                            <button className='text-base px-3 inline-flex font-medium py-1 ease-in-out transition-all rounded-md hover:bg-gray-100/55 bg-transparent border-none'>
                                Sign Up
                            </button>
                        </span>
                        <span className='after:content-[""] cursor-pointer size-7 after:rounded-full  after:size-1 after:animate-ping after:bg-theme-secondary after:absolute after:right-1 after:top-1 relative'>
                            <NotificationIcon className='size-7  hover:fill-slate-700  fill-slate-500' />
                        </span>
                        <div ref={accountMenuRef} className="">
                            <motion.div onMouseEnter={() => setOpenAccountMenuState(true)} className='flex cursor-pointer relative items-center'>
                                <span className='border inline-flex items-center justify-center m-auto size-9 rounded-full bg-theme-customPrimary p-1 '>
                                    <UserIcon className='size-9 content-[1] relative cursor-pointer fill-white' />
                                </span>
                                User
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </motion.div>
                            {accountMenuState && <AccountMenu setOpen={setOpenAccountMenuState} anchorOrigin={accountMenuRef.current} />}
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default NavbarInto
