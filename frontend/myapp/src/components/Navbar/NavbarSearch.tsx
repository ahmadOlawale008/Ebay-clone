import React, { SelectHTMLAttributes, useEffect, useRef, useState } from 'react'
import {SearchIcon} from '../../assets/icons/icons'
import {ShoppingCartIcon} from '../../assets/icons/icons'
import EazeSalesLogo from '../../assets/icons/eazeSalesLogo/eazeSalesLogo'
import TextInput from '../Input/input'

const NavbarSearch = () => {
    const [menu, setMenu] = useState(1)
    const filterSelectRef = useRef<null | HTMLSelectElement>(null)
    const [selectedCategory, setSelectCategory] = useState<string | undefined>("")
    useEffect(() => {
        setSelectCategory(filterSelectRef.current?.options[menu - 1].innerHTML)
    }, [menu, filterSelectRef])
    return (
        <div className='grid items-center px-8 py-3 border-b border-gray-400/45 grid-cols-5'>
            <div className="nav-icon justify-start col-span-1">
                <a href="/" className='self-start'>
                    {<EazeSalesLogo className='w-24' />}
                </a>
            </div>
            <div className='col-span-3 '>
                <form className='h-fit rounded-md' method='get'>
                    <div className="flex border border-neutral-400 rounded-lg items-stretch flex-1">
                        <div onClick={() => { filterSelectRef.current?.click() }} className="relative  cursor-pointer border-neutral-200 border-r h-full m-auto z-[1]  py-3 px-1">
                            <div className="flex w-[110px] justify-between items-center gap-x-1">
                                <span className='text-xs font-semibold truncate text-nowrap text-slate-700'>
                                    {selectedCategory}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <select aria-label='Select product by category'  value={menu} tabIndex={1} ref={filterSelectRef} className='h-full w-full absolute cursor-pointer block left-0 opacity-0 bg-transparent  outline-none top-0' onChange={(e) => {
                                setMenu(Number(e.target.value))
                            }} name="categories-filter" id="">
                                <option className="text-xs tracking-wide" value="1">All categories</option>
                                <option className="text-xs tracking-wide" value="2">Electricity</option>
                                <option className="text-xs tracking-wide" value="3">Home appliances</option>
                                <option className="text-xs tracking-wide" value="4">Food stuffs</option>
                                <option className="text-xs tracking-wide" value="5">Electronics</option>
                                <option className="text-xs tracking-wide" value="6">Clothing</option>
                                <option className="text-xs tracking-wide" value="7">Books</option>
                                <option className="text-xs tracking-wide" value="8">Food stuffs</option>
                                <option className="text-xs tracking-wide" value="9">Home Appliances</option>
                                <option className="text-xs tracking-wide" value="10">Furniture</option>
                                <option className="text-xs tracking-wide" value="11">Health & Beauty</option>
                                <option className="text-xs tracking-wide" value="12">Toys</option>
                                <option className="text-xs tracking-wide" value="13">Sports Equipment</option>
                                <option className="text-xs tracking-wide" value="14">Automotive</option>
                                <option className="text-xs tracking-wide" value="15">Jewelry</option>
                                <option className="text-xs tracking-wide" value="16">Garden Supplies</option>
                                <option className="text-xs tracking-wide" value="17">Pet Supplies</option>
                                <option className="text-xs tracking-wide" value="18">Office Supplies</option>
                                <option className="text-xs tracking-wide" value="19">Footwear</option>
                                <option className="text-xs tracking-wide" value="20">Musical Instruments</option>
                                <option className="text-xs tracking-wide" value="21">Groceries</option>
                                <option className="text-xs tracking-wide" value="22">Baby Products</option>
                                <option className="text-xs tracking-wide" value="23">Handmade Crafts</option>
                                <option className="text-xs tracking-wide" value="24">Bags & Accessories</option>
                            </select>
                        </div>
                        <div className='relative w-full'>
                            <TextInput type="search" name="" placeholder='Search for anything' baseClassName='w-full pl-8 font-custom outline-none ring-none text-sm !border-b-0 bg-transparent relative py-2 px-1 ' icon={<div className='w-[52px] h-[32px] bg-neutral-700'><SearchIcon className='text-lg' /></div>} iconPosition='end' />
                        </div>

                    </div>
                </form>
            </div>
            <div className='col-span-1 ml-auto items-end'>
                <div className='flex ping-wrapper items-center gap-x-2 text-primary cursor-pointer'>
                    <span className='ping-pong after:text-[12px] after:content-["1"]'>
                        <ShoppingCartIcon className='text-2xl' />
                    </span>
                    <span className='font-medium text-[12px]'>
                        Cart
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NavbarSearch