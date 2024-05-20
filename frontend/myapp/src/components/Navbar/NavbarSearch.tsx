import React, { SelectHTMLAttributes, useEffect, useRef, useState } from 'react'
import Searchicon from '../../assets/icons/searchicon'
import ShoppingCartIcon from '../../assets/icons/shopping-cart'
import { motion } from "framer-motion"
const NavbarSearch = () => {
    const [menu, setMenu] = useState(1)
    const filterSelectRef = useRef<null | HTMLSelectElement>(null)
    const [selectedCategory, setSelectCategory] = useState<string | undefined>("")
    useEffect(() => {
        setSelectCategory(filterSelectRef.current?.options[menu - 1].innerHTML)
    }, [menu, filterSelectRef])
    return (
        <div className='grid items-center px-8 py-3 border-b border-gray-400/45 grid-cols-5'>
            <div className=' col-span-1'>
                <h1 className='text-xl font-semibold font-serif text-orange-600'>#1 Top Seller</h1>
            </div>
            <div className='col-span-3 '>
                <form className='h-fit rounded-md'>
                    <div className="flex items-center flex-1">
                        <div onClick={() => { filterSelectRef.current?.click() }} className="relative cursor-pointer  ring-slate-400/15 ring-inset ring-2 rounded-md z-[1] bg-gray-200  py-3.5 px-2">
                            <div className="flex items-center gap-x-1">
                                <span className='text-base font-semibold text-nowrap text-slate-700'>
                                    {selectedCategory}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <select value={menu} tabIndex={0} ref={filterSelectRef} className='h-full absolute cursor-pointer block left-0 opacity-0 bg-transparent  outline-none top-0' onChange={(e) => {
                                setMenu(Number(e.target.value))
                            }} name="categories-filter" id="">
                                <option className=" text-lg tracking-wide" value="1">All categories</option>
                                <option className=" text-lg tracking-wide" value="2">Electricity</option>
                                <option className=" text-lg tracking-wide" value="3">Home appliances</option>
                                <option className=" text-lg tracking-wide" value="4">Food stuffs</option>
                                <option className=" text-lg tracking-wide" value="5">Work </option>
                            </select>
                        </div>
                        <div className='relative bg-gray-100 w-full'>
                            <input type="search" name="" className='w-full bg-gray-100 focus:bg-slate-50  pl-10 outline-none bg-transparent relative py-3 px-2  tracking-wider text-lg' placeholder='Search' id="" />
                            <Searchicon className='absolute left-2 w-7 fill-gray-500 h-full top-0' />
                        </div>
                    </div>
                </form>
            </div>
            <div className='col-span-1 ml-auto items-end'>
                <div className='flex ping-wrapper items-center gap-x-2 text-theme-primary cursor-pointer'>
                    <span className='ping-pong after:content-["1"]'>
                        <ShoppingCartIcon className='size-8' />
                    </span>
                    <span className='font-medium'>
                        Cart
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NavbarSearch