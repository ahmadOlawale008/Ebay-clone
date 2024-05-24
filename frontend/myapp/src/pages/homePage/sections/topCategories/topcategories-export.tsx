import React, { LegacyRef, useEffect, useRef } from 'react'
import { motion, scroll } from "framer-motion"
import "./topcategories-styles.css"
const TopCategories = () => {
  const categoriesWrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (categoriesWrapperRef.current) {
      console.log(categoriesWrapperRef.current.getBoundingClientRect().width)
    }
  }, [categoriesWrapperRef])
  const topCategoriesProducts = Array.from({ length: 20 }, (_, prev) => prev + 1)
  
  return (
    <div>
      <div className="rounded-md px-3 py-5">
        <h3 className='text-2xl font-bold'>Top Categories</h3>
        <div className="mt-3">
          <motion.div
            ref={categoriesWrapperRef}
            className="flex cardWrap0a1 relative cursor-grab overflow-x-auto w-full space-x-3 flex-nowrap flex-row ">
            {topCategoriesProducts.map((item) => <div key={item} className="h-[400px] basis-3/12   shrink-0 bg-gray-200 rounded-lg">
            </div>)}
            <span className='absolute top-1/2 left-0 shadow-lg shadow-slate-100 cursor-pointer  bg-neutral-300 rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[1em] h-[1em] text-4xl ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </span>
            <span className="absolute top-1/2 right-0 shadow-lg shadow-slate-100 cursor-pointer  bg-neutral-300 rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[1em] h-[1em] text-4xl ">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TopCategories
