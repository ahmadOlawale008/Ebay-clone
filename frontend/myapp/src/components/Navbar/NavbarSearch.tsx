import React, { SelectHTMLAttributes, useEffect, useRef, useState } from 'react'
import {SearchIcon} from '../../assets/icons/icons'
import {ShoppingCartIcon} from '../../assets/icons/icons'
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
                        <div onClick={() => { filterSelectRef.current?.click() }} className="relative cursor-pointer  ring-slate-400/10 ring-inset ring-2 rounded-md z-[1] bg-gray-200  py-3.5 px-2">
                            <div className="flex items-center gap-x-1">
                                <span className='text-base font-semibold text-nowrap text-slate-700'>
                                    {selectedCategory}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <select aria-label='Select product by category'  value={menu} tabIndex={1} ref={filterSelectRef} className='h-full w-full absolute cursor-pointer block left-0 opacity-0 bg-transparent  outline-none top-0' onChange={(e) => {
                                setMenu(Number(e.target.value))
                            }} name="categories-filter" id="">
                                <option className="text-base tracking-wide" value="1">All categories</option>
                                <option className="text-base tracking-wide" value="2">Electricity</option>
                                <option className="text-base tracking-wide" value="3">Home appliances</option>
                                <option className="text-base tracking-wide" value="4">Food stuffs</option>
                                <option className="text-base tracking-wide" value="5">Electronics</option>
                                <option className="text-base tracking-wide" value="6">Clothing</option>
                                <option className="text-base tracking-wide" value="7">Books</option>
                                <option className="text-base tracking-wide" value="8">Food stuffs</option>
                                <option className="text-base tracking-wide" value="9">Home Appliances</option>
                                <option className="text-base tracking-wide" value="10">Furniture</option>
                                <option className="text-base tracking-wide" value="11">Health & Beauty</option>
                                <option className="text-base tracking-wide" value="12">Toys</option>
                                <option className="text-base tracking-wide" value="13">Sports Equipment</option>
                                <option className="text-base tracking-wide" value="14">Automotive</option>
                                <option className="text-base tracking-wide" value="15">Jewelry</option>
                                <option className="text-base tracking-wide" value="16">Garden Supplies</option>
                                <option className="text-base tracking-wide" value="17">Pet Supplies</option>
                                <option className="text-base tracking-wide" value="18">Office Supplies</option>
                                <option className="text-base tracking-wide" value="19">Footwear</option>
                                <option className="text-base tracking-wide" value="20">Musical Instruments</option>
                                <option className="text-base tracking-wide" value="21">Groceries</option>
                                <option className="text-base tracking-wide" value="22">Baby Products</option>
                                <option className="text-base tracking-wide" value="23">Handmade Crafts</option>
                                <option className="text-base tracking-wide" value="24">Bags & Accessories</option>
                            </select>
                        </div>
                        <div className='relative bg-gray-100 w-full'>
                            <input type="search" name="" className='w-full bg-gray-100 focus:bg-slate-50  pl-10 outline-none bg-transparent relative py-3 px-2  tracking-wider text-lg' placeholder='Search...' id="" />
                            <div className="flex items-center left-2 top-0 absolute justify-center h-full w-fit">
                                <SearchIcon className='text-3xl fill-gray-500 ' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='col-span-1 ml-auto items-end'>
                <div className='flex ping-wrapper items-center gap-x-2 text-primary cursor-pointer'>
                    <span className='ping-pong after:content-["1"]'>
                        <ShoppingCartIcon className='text-3xl' />
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