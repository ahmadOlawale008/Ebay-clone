import { useEffect, useRef, useState } from 'react'
import NotificationIcon from '../../assets/icons/notificationicon'
import UserIcon from '../../assets/icons/userIcon'
import AccountMenu from '../Menu/accountMenu'
import { motion } from "framer-motion"
import Button from '../Button/button'
import EazeSalesLogo from '../../assets/icons/eazeSalesLogo/eazeSalesLogo'

const NavbarInto = () => {
    const [accountMenuState, setOpenAccountMenuState] = useState(false)
    const accountMenuRef = useRef<HTMLDivElement | null>(null)
    const closeMenu = (e: Event) => {
        console.log(e.target, e.currentTarget)
        setOpenAccountMenuState(accountMenuRef.current?.contains(e.target as Node) ? accountMenuRef.current?.contains(e.target as Node) : false)
    }
    
    useEffect(() => {
        document.addEventListener("mousedown", closeMenu)
    })

    return (
        <nav className='bg-white text-black px-9 py-1 border-b border-gray-400/40'>
            <div className='flex items-center justify-between'>
                <div>
                    <div className='flex *:cursor-pointer *:inline-flex *:items-center *:font-custom font-medium items-center gap-x-4'>
                        <span><a className='text-sm' href="">Home</a></span>
                        <span><a className='text-sm' href="">Shop</a></span>
                        <span className='inline-flex items-center gap-x-1'><span className='text-sm'>Store</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg></span>
                        <span><a className='text-sm' href="">Contact</a></span>
                    </div>
                </div>
                <div className='basis-1/2'>
                    <h3 className='font-semibold text-primary-dark font-custom text-center text-xl'>Enjoy your Sales !</h3>
                </div>
                <div className='self-end'>
                    <div className='flex  *:cursor-pointer *:inline-flex *:items-center  items-center gap-x-4'>
                        <span><a className='text-sm font-custom' href="">Sell</a></span>
                        <span className='relative '><svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" d="M10.0156 21.25C10.5445 21.7168 11.2392 22 12 22C12.7608 22 13.4555 21.7168 13.9844 21.25" />
                            <path stroke="currentColor" strokeWidth="1.1" d="M12 3C8.83248 3 6.25 5.56488 6.25 8.72881V12.6697C6.25 13.9666 5.62126 15.183 4.56324 15.933L3.92116 16.3881C3.3248 16.8109 3.62389 17.75 4.3549 17.75H19.6451C20.3761 17.75 20.6752 16.8109 20.0788 16.3881L19.4368 15.933C18.3787 15.183 17.75 13.9666 17.75 12.6697V8.72881C17.75 5.56488 15.1675 3 12 3Z" />
                        </svg>
                        <span className='absolute dot top-0 right-0 size-1 animate-ping bg-green-400 rounded-full'></span>
                        </span>
                        <div onClick={() => setOpenAccountMenuState(true)} className='inline-flex relative items-center'>
                            <div className='mr-1 bg-black rounded-full p-1'>
                                <svg className='size-5 invert' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle cx="12" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                                    <path stroke="currentColor" strokeWidth="1.4" d="M7.96473 13.6977C9.13333 13.2367 10.3783 13 11.6346 13H12.3654C13.6217 13 14.8667 13.2367 16.0353 13.6977L16.7475 13.9787C17.4493 14.2556 18.097 14.6535 18.6612 15.1543L18.7766 15.2568C19.0745 15.5212 19.3406 15.8194 19.5694 16.1454C20.1751 17.0082 20.5 18.0367 20.5 19.0909V19.0909C20.5 19.8691 19.8691 20.5 19.0909 20.5H4.90913C4.13089 20.5 3.5 19.8691 3.5 19.0909V19.0909C3.5 18.0367 3.82494 17.0082 4.43057 16.1454C4.65941 15.8194 4.92547 15.5212 5.22335 15.2568L5.33878 15.1543C5.90299 14.6535 6.55073 14.2556 7.25252 13.9787L7.96473 13.6977Z" />
                                </svg>
                            </div>
                            <div className='text-sm select-none'>
                                <h6 className='font-custom'>Welcome</h6>
                                <b className='inline-flex items-center'>
                                    <span className='text-sm font-medium font-custom text-center'>Sign In/Register</span>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                    </span>
                                </b>
                            </div>
                            <div ref={accountMenuRef} id='account_menu_' className={`absolute select-none ${accountMenuState ? "block" : "hidden"} account-menu space-y-2 divide-y border-spacing-3 divide-neutral-200 px-1 py-2 top-full  shadow-2xl shadow-neutral-900 rounded-xl bg-white  w-[250px]`}>
                                <div className='*:mt-1 px-3 py-2'>
                                    <div className='sign_in_btns_'>
                                        <a href="/login"><Button size='small' color='primary' variant='filled' baseClassName='rounded-2xl py-2' fullWidth>Sign In</Button></a>
                                    </div>
                                    <div className='sign_in_btns_'>
                                        <a href="/signup"> <Button size='small' color='primary' variant='text' baseClassName='rounded-2xl py-2' fullWidth>Register</Button></a>
                                    </div>
                                </div>
                                <ul className='text-[14px] flex flex-col gap-y-2  font-medium *:px-3 *:flex *:items-center *:gap-x-2 *:cursor-pointer *:rounded-lg *:py-2.5'>
                                    <li className='hover:bg-neutral-200 text-[14px]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                        Account
                                    </li>
                                    <li className='hover:bg-neutral-200 text-[14px]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                    </svg>

                                        Your Wallet</li>
                                    <li className='hover:bg-neutral-200 text-[14px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        Favorites
                                    </li>
                                    <li className='hover:bg-neutral-200 text-[14px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                        Settings</li>
                                </ul>
                                <ul className='font-medium'>
                                    {/* <li className='hover:bg-neutral-200 px-3 cursor-pointer rounded-lg py-2.5'>Account</li> */}
                                    <li className='hover:bg-neutral-200 text-[14px] px-3 flex items-center gap-x-2 mt-3  cursor-pointer rounded-lg py-2.5'>
                                        <svg className='size-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#19191a" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path> <path d="M15 12H3.62" stroke="#19191a" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path> <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#19191a" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path> </g></svg>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarInto
